import React from 'react';
import './Header.css';
import { Tab, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, logout } from '../../redux/slice/userSlice';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Вы хотите выйти из аккаунта?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
      window.location.reload();
    }
  };

  return (
    <div className="root">
      <Container maxWidth="lg">
        <div className="inner">
          <Link to="/" >
            <Tab label="Главная" />
          </Link>
          <div className="buttons">
            {isAuth ? (
              <>
                <Link to="/launch-trading">
                  <Button variant="contained">Создать торги</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
