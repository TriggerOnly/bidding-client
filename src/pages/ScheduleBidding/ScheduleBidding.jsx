import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Bidding } from '../../components/Bidding/Bidding.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBiddings } from '../../redux/slice/biddingSlice';
import { ConnectionModal } from '../../components/modal/EntryАuction.jsx';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

const ScheduleBidding = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.bidding);
  const [selectedBiddingId, setSelectedBiddingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scheduledItems, setScheduledItems] = useState([]);

  useEffect(() => {
    if (status === 'loading') {
      dispatch(fetchBiddings());
    }
  }, [dispatch, status]);

  const openConnectionModal = (biddingId) => {
    setSelectedBiddingId(biddingId);
    setIsModalOpen(true);
  };

  const closeConnectionModal = () => {
    setIsModalOpen(false);
    setSelectedBiddingId(null);
  };

  dayjs.extend(customParseFormat);

  useEffect(() => {
    if (items && items.length > 0) {
      const filteredItems = items.filter((bidding) => {
        const biddingTime = dayjs(bidding.time, 'DD.MM.YYYY HH:mm:ss');
        
        if (!biddingTime.isValid()) {
          console.warn(`Invalid time format: ${bidding.time}`);
          return false;
        }
  
        return biddingTime.isAfter(dayjs());
      });
      setScheduledItems(filteredItems);
    }
  }, [items]);
  

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error loading data</div>;
  }

  return (
    <Grid container justifyContent="center" sx={{ width: '100%' }}>
      <Grid item xs={12} md={8} sx={{ width: '80%' }}>
        {scheduledItems && scheduledItems.length > 0 ? (
          scheduledItems.map((obj) => (
            <div key={obj._id} onClick={() => openConnectionModal(obj._id)}>
              <Bidding _id={obj._id} title={obj.title} text={obj.text} />
            </div>
          ))
        ) : (
          <div>No upcoming biddings available</div>
        )}
        <ConnectionModal 
          open={isModalOpen} 
          onClose={closeConnectionModal} 
          biddingId={selectedBiddingId} 
        />
      </Grid>
    </Grid>
  );
};

export default ScheduleBidding;
