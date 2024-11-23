import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { allBiddingInfo, fetchBiddingInfo } from '../../redux/slice/biddingInfo';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

const CreateCriteria = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newCriteria, setNewCriteria] = useState('');
  const { items, status } = useSelector((state) => state.biddingInfo);
  const biddingInfo = useSelector((state) => state.biddingInfo.items);

  useEffect(() => {
    console.log("items:", items); // Логируем все данные, чтобы проверить их структуру
  }, [items]);

  useEffect(() => {
    if (id) {
      dispatch(fetchBiddingInfo({ id })); // Передаем id как объект
      dispatch(allBiddingInfo(id));
    }
  }, [id, dispatch]);  

  const onAddCriteria = async () => {
    try {
      const criteria = { title: newCriteria };
      await dispatch(fetchBiddingInfo({ id, criteria })).unwrap();
      setNewCriteria(''); 
      console.log(biddingInfo);
      
      dispatch(allBiddingInfo(id))
    } catch (error) {
      console.warn('Ошибка при добавлении критерия:', error);
      alert('Не удалось добавить критерий');
    }
  };

  return (
    <Paper style={{ padding: 20 }}>
      <h2>Добавить критерии для торгов</h2>
      <TextField
        label="Название критерия"
        value={newCriteria}
        onChange={(e) => setNewCriteria(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onAddCriteria}
        disabled={status === 'loading'}
      >
        Добавить
      </Button>
      <div style={{ marginTop: 20 }}>
        <h3>Текущие критерии:</h3>
        <ul>
          {(items?.criteria || []).map((criterion, index) => (
            <li key={index}>{criterion.title}</li>
          ))}
        </ul>
      </div>
      <Button
        variant="outlined"
        style={{ marginTop: 20 }}
        onClick={() => navigate('/current-trading')}
      >
        Завершить
      </Button>
    </Paper>
  );
};

export default CreateCriteria;
