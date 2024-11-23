import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { allBiddingInfo } from '../../redux/slice/biddingInfo';
import { DetailsModal } from '../modal/DetailsModel';
import { ConnectionModal } from '../modal/EntryАuction';
import { useLocation, useNavigate } from 'react-router-dom';
import { allParticipants } from '../../redux/slice/biddingUserSlice';

export const Bidding = ({ _id, title, text, children }) => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const criteria = useSelector((state) => state.biddingInfo.items.criteria[_id] || []);  
  const participants = useSelector((state) => state.biddingUser.users[_id] || []); 
  const isArchivePage = location.pathname === '/archive-bidding';
  const buttonText = isArchivePage ? 'Детали' : 'Подключиться';

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(allBiddingInfo(_id)),
        dispatch(allParticipants({ _id })),
      ]);
    };
    fetchData();
  }, [dispatch, _id]);
  

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    if (isArchivePage) {
      navigate('/archive-bidding');
    }
  };

  const filteredCriteria = Array.isArray(criteria)
  ? criteria.filter((criterion) => criterion.biddingId === _id)
  : []; 

  const filteredParticipants = Array.isArray(participants)
    ? participants.filter((participant) => participant.biddingId === _id)
    : []

  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto', padding: '10px' }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>

        <Typography variant="body1" color="textSecondary">
          {text}
        </Typography>

        {children && (
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            {children}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button onClick={handleOpenModal} variant="contained">
          {buttonText}
        </Button>
        {isArchivePage ? (
          <DetailsModal
            open={openModal}
            onClose={handleCloseModal}
            title={title}
            description={text}
            filteredCriteria={filteredCriteria}  
            filteredParticipants={filteredParticipants}  
          />
        ) : (
          <ConnectionModal
            open={openModal}
            onClose={handleCloseModal}
            biddingId={_id}
          />
        )}
      </CardActions>
    </Card>
  );
}
