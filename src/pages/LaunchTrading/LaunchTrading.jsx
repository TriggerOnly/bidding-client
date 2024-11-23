import React, { useRef, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import './LaunchTrading.css';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slice/userSlice';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { StaticTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

const LaunchTrading = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');
  const [surveillanceСode, setSurveillanceСode] = useState('');
  const [connectionСode, setСonnectionСode] = useState('');
  const [startDate, setStartDate] = useState(dayjs()); 
  const [startTime, setStartTime] = useState(dayjs()); 
  

  const isEditing = Boolean(id);

  const generatesurveillanceСode = () => Math.random().toString(36).substring(2, 10).toUpperCase();
  const generateCode = () => Math.random().toString(36).substring(2, 10).toUpperCase();

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  useEffect(() => {
    setСonnectionСode(generateCode());
    setSurveillanceСode(generatesurveillanceСode());
  }, []);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
  
      const startDateTime = startDate
        .hour(startTime.hour())
        .minute(startTime.minute())
        .second(0);
  
      const formattedDateTime = startDateTime.format('DD.MM.YYYY HH:mm:ss');
  
      const fields = {
        title,
        text,
        password,
        surveillanceСode,
        code: connectionСode,
        time: formattedDateTime,
      };
  
      const response = await axios.post('/createBidding', fields);
  
      const biddingId = response.data?._id; // Получаем ID торгов
  
      console.log(response.data);
      console.log("biddingId", biddingId);
      

      navigate(`/create-criteria/${biddingId}`); // Переход к созданию критериев
    } catch (error) {
      console.warn("Ошибка:", error);
      alert('Не удалось создать торги');
    } finally {
      setIsLoading(false);
    }
  };
  

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
      toolbar: [
        'bold',
        'italic',
        'heading',
        '|',
        'quote',
        'unordered-list',
        'ordered-list',
        '|',
        'link',
        'preview',
        'side-by-side',
        'fullscreen',
      ],
    }),
    []
  );

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <TextField
        className="title"
        variant="standard"
        placeholder="Название торгов..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        className="password"
        variant="standard"
        placeholder="Пароль для входа на торги..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <SimpleMDE className="editor" value={text} onChange={onChange} options={options} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Дата начала торгов"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          minDate={dayjs()} 
          renderInput={(props) => <TextField {...props} fullWidth />}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticTimePicker orientation="landscape" />
        </LocalizationProvider>
      </LocalizationProvider>
      <h3>Код для подключения зрителем: {surveillanceСode}</h3>
      <h3>Для подключения участником потребуется ввести пароль, а также этот код: {connectionСode}</h3>
      <div className="buttons">
        <Button onClick={onSubmit} size="large" variant="contained" disabled={isLoading}>
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
}

export default LaunchTrading