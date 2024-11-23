import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useForm} from 'react-hook-form'
import { Navigate } from "react-router-dom";
    
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin, selectIsAuth } from "../../redux/slice/userSlice";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()

  const {
    register, 
    handleSubmit, 
    formState: {errors, isValid}
  } = useForm({
    defaultValues: {
      email: '',  
      password: ''
    },
    mode: 'onChange'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchLogin(values))
    
    if(!data.payload) {
      return alert('Не удалось авторизоваться')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  if(isAuth) {
    return <Navigate to='/'/>
  }

  return (
    <Paper className="main">
      <Typography className="title" variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className="field"
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', {required: 'Укажите почту'})}
          fullWidth
        />
        <TextField 
          className="field"
          label="Пароль" fullWidth
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message} 
          {...register('password', {required: 'Укажите пароль'})}
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
