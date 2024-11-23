import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { allBiddingInfo, addParticipantAnswer, selectBiddingInfosArray } from '../../redux/slice/biddingInfo.js';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';

const BiddingInfoConnection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const criteria = useSelector(selectBiddingInfosArray);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log(criteria);
    
    const fetchData = async () => {
      try {
        const result = await dispatch(allBiddingInfo(id)).unwrap();
        console.log('Загруженные данные:', result);

        if (result.message === "Информация не найдена" || !result.data || result.data.length === 0) {
          setError(true); 
        } else {
          setError(false);
        }
      } catch (error) {
        console.error("Ошибка при загрузке информации:", error.message);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, dispatch]);

  const handleAnswerChange = (title, value) => {
    setAnswers({ ...answers, [title]: value });
  };

  const Next = () => {
    navigate(`/biddings/${id}`)
  }

  const handleSubmit = () => {
    const answersArray = Object.entries(answers).map(([title, answer]) => ({
      title,
      answer
    }));
    
    dispatch(addParticipantAnswer({ _id: id, answers: answersArray }));
    alert('Ответы успешно отправлены');
    navigate(`/biddings/${id}`);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h6">критерии отсутствуют.</Typography>
        <Button onClick={Next}>Далее</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Заполнение критериев торгов</Typography>
      {criteria.length > 0 ? (
        criteria.map((crit) => (
          <Box key={crit._id} sx={{ marginBottom: 2 }}>
            <Typography variant="h6">{crit.title}</Typography>
            <TextField
              fullWidth
              placeholder="Введите ваш ответ"
              value={answers[crit.title] || ''}
              onChange={(e) => handleAnswerChange(crit.title, e.target.value)}
              sx={{ marginTop: 1 }}
            />
          </Box>
        ))
      ) : (
        <Typography>Критерии отсутствуют.</Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={criteria.length === 0}
      >
        Отправить
      </Button>
    </Box>
  );
};

export default BiddingInfoConnection;
