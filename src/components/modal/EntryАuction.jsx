import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid, Box, Divider } from '@mui/material';
import { useDispatch } from 'react-redux';
import { connectionOrCreateParticipant } from '../../redux/slice/biddingUserSlice';
import { useNavigate } from 'react-router-dom';

export const ConnectionModal = ({ open, onClose, biddingId }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [viewerCode, setViewerCode] = useState('');
  const [participantCode, setParticipantCode] = useState('');
  const [password, setPassword] = useState('');
  const [coast, setCoast] = useState('');

  const handleViewerCodeChange = (event) => setViewerCode(event.target.value);
  const handleParticipantCodeChange = (event) => setParticipantCode(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleCoastChange = (event) => setCoast(event.target.value);

  const handleSubmit = () => {
    try {
      if (!biddingId) return;
  
      if (viewerCode) {
        dispatch(connectionOrCreateParticipant({ params: { surveillanceCode: viewerCode }, _id: biddingId }))
          .then(() => onClose());
      } else if (participantCode && password && coast) {
        dispatch(connectionOrCreateParticipant({
          params: { code: participantCode, password, coast },
          _id: biddingId,
        }))
          .then(() => {
            onClose(); 
            console.log(biddingId);
            navigate(`/biddings/info/${biddingId}`);
          });
      } else {
        alert("Пожалуйста, заполните все необходимые поля");
      }
    } catch (error) {
      console.log(error);
      alert('Ошибка при входе');
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Подключение</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ paddingRight: 2, paddingTop: 2 }}>
              <TextField
                fullWidth
                label="Код участника"
                variant="outlined"
                value={participantCode}
                onChange={handleParticipantCodeChange}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                label="Пароль"
                type="password"
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                label="Сумма ставки"
                variant="outlined"
                value={coast}
                onChange={handleCoastChange}
                sx={{ marginBottom: 2 }}
              />
            </Box>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={5}>
            <Box sx={{ paddingLeft: 2, paddingTop: 2 }}>
              <TextField
                fullWidth
                label="Код зрителя"
                variant="outlined"
                value={viewerCode}
                onChange={handleViewerCodeChange}
                sx={{ marginBottom: 2 }}
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Отмена
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Подключиться
        </Button>
      </DialogActions>
    </Dialog>
  );
};
