import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBidding } from '../../redux/slice/biddingSlice';
import { allBiddingInfo, allParticipantAnswers } from '../../redux/slice/biddingInfo';
import { allParticipants } from '../../redux/slice/biddingUserSlice';

const EndBidding = () => {
  const { id } = useParams();
  const dispatch = useDispatch(); 
  const navigate = useNavigate()
  const bidding = useSelector((state) => state.bidding.bidding);
  const participants = useSelector((state) => state.biddingUser.users);
  const biddingInfo = useSelector((state) => state.biddingInfo.items);
  const participantAnswers = useSelector((state) => state.biddingInfo.participantAnswers);

  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchBidding(id));
      dispatch(allBiddingInfo(id));
      dispatch(allParticipantAnswers(id));
      dispatch(allParticipants({_id: id}));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (bidding && participants && biddingInfo) {
      const criteria = Array.isArray(biddingInfo.criteria) ? biddingInfo.criteria : []; // Проверка criteria
      const data = {
        title: bidding.title,
        date: bidding.time,
        participants: participants.map((participant) => ({
          name: participant.nameOrganization,
          sum: participant.coast,
          criteria: criteria.map((criterion) => {
            const answer = participantAnswers.find(
              (ans) => ans.criteriaId === criterion._id && ans.participantId === participant._id
            );
            return {
              criterion: criterion.title,
              answer: answer ? answer.answer : '—',
            };
          }),
        })),
      };
      setReportData(data);
    }
  }, [bidding, participants, biddingInfo, participantAnswers]);  

  const handleDownloadReport = () => {
    if (reportData) {
      const content = `
        Торги: ${reportData.title}
        Дата: ${reportData.date}
        
        Участники:
        ${reportData.participants
          .map(
            (p) => `
        Название: ${p.name}
        Сумма: ${p.sum} руб.
        Критерии:
        ${p.criteria.map((c) => `  - ${c.criterion}: ${c.answer}`).join('\n')}
        `
          )
          .join('\n')}
      `;

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${bidding.title}_отчет.txt`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  if (!bidding || !participants || !biddingInfo) {
    return <Typography>Загрузка данных...</Typography>;
  }

  const handleGoHome = () => {
    navigate("/")
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Завершение торгов
      </Typography>
      <Typography variant="h6">
        Название торгов: {bidding.title}
      </Typography>
      <Typography variant="h6">
        Дата проведения: {bidding.time}
      </Typography>

      <Typography variant="h6" sx={{ marginTop: 3 }}>
        Участники:
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название компании</TableCell>
              <TableCell>Сумма</TableCell>
              <TableCell>Критерии</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participants.map((participant) => (
              <TableRow key={participant._id}>
                <TableCell>{participant.nameOrganization}</TableCell>
                <TableCell>{participant.coast} руб.</TableCell>
                <TableCell>
                  {biddingInfo.criteria && Array.isArray(biddingInfo.criteria) && biddingInfo.criteria.length > 0 ? (
                    biddingInfo.criteria.map((criterion) => {
                      const answer = participantAnswers.find(
                        (ans) => ans.criteriaId === criterion._id && ans.participantId === participant._id
                      );
                      return (
                        <Typography key={criterion._id}>
                          {criterion.title}: {answer ? answer.answer : '—'}
                        </Typography>
                      );
                    })
                  ) : (
                    <Typography>Критерии отсутствуют</Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ marginTop: 3 }}>
        <Button variant="contained" color="primary" onClick={handleDownloadReport}>
          Скачать файл
        </Button>
        <Button sx={{margin: 2}} variant="contained" color="primary" onClick={handleGoHome}>
            На главную
        </Button>
      </Box>
    </Box>
  );
};

export default EndBidding;
