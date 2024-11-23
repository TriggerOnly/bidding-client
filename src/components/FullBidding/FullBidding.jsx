import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBidding } from "../../redux/slice/biddingSlice";
import { allBiddingInfo, allParticipantAnswers } from "../../redux/slice/biddingInfo";
import { allParticipants, selectParticipantsArray } from "../../redux/slice/biddingUserSlice";
import Timer from "../Timer/Timer";

export const FullBidding = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentParticipantIndex, setCurrentParticipantIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bidding = useSelector((state) => state.bidding.bidding || {});
  const biddingInfo = useSelector((state) => state.biddingInfo.items || {});
  const participantAnswers = useSelector((state) => state.biddingInfo.participantAnswers || []);
  const participants = useSelector(selectParticipantsArray);
  const token = localStorage.getItem("token");
  const [updatedSum, setUpdatedSum] = useState({});

  useEffect(() => {
    if (!token) {
      navigate("/Register");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(fetchBidding(id)),
        dispatch(allBiddingInfo(id)),
        dispatch(allParticipantAnswers(id)),
        dispatch(allParticipants({ _id: id })),
      ]);
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    if (!participants.length) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          handleTimeout();
          return 30;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentParticipantIndex, participants.length]);

  const handleTimeout = () => {
    setCurrentParticipantIndex((prevIndex) => (prevIndex + 1) % participants.length);
  };

  const handleClose = () => navigate("/");
  const handleEndBidding = async () => {
    navigate(`/biddings/end/${id}`);
  };

  const handleSumChange = (participantId, newSum) => {
    setUpdatedSum((prev) => ({
      ...prev,
      [participantId]: newSum,
    }));
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!bidding || !Array.isArray(participants)) {
    console.log("bidding", bidding);
    console.log("participants", participants);
    
    return (
      <Typography variant="h6" color="error">
        Ошибка: данные торгов или участников не найдены.
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Timer />
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <Typography variant="h6" sx={{ marginRight: 2 }}>
          Время на ход: {formatTime(timeLeft)}
        </Typography>
      </Box>
      <Paper sx={{ padding: 3, marginBottom: 4 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          {bidding.title}
        </Typography>
        <Typography>{bidding.text || "Описание отсутствует."}</Typography>
      </Paper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Критерии</TableCell>
              {participants.map((participant) => (
                <TableCell key={participant._id} align="center">
                  {participant.nameOrganization}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {biddingInfo.criteria && biddingInfo.criteria.length > 0 ? (
              biddingInfo.criteria.map((criterion) => (
                <TableRow key={criterion._id}>
                  <TableCell>{criterion.title}</TableCell>
                  {participants.map((participant) => {
                    const answer = participantAnswers.find(
                      (ans) =>
                        ans.criteriaId === criterion._id &&
                        ans.participantId === participant._id
                    );
                    return (
                      <TableCell key={participant._id + criterion._id} align="center">
                        {answer ? answer.answer : "—"}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={participants.length + 1} align="center">
                  Критерии отсутствуют
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell>Сумма</TableCell>
              {participants.map((participant) => {
                const sum = updatedSum[participant._id] || participant.coast;
                return (
                  <TableCell key={participant._id} align="center">
                    {sum} руб.
                    {currentParticipantIndex === participants.indexOf(participant) && (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          const newSum = prompt("Введите новую сумму:", sum);
                          if (newSum && !isNaN(newSum)) {
                            handleSumChange(participant._id, newSum);
                          }
                        }}
                        sx={{ marginLeft: 1 }}
                      >
                        Изменить сумму
                      </Button>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ marginTop: 2 }}>
        <Button variant="outlined" color="error" onClick={handleClose} sx={{ marginRight: 1 }}>
          Закрыть
        </Button>
        <Button variant="contained" color="primary" onClick={handleEndBidding}>
          Завершить торги
        </Button>
      </Box>
    </Box>
  );
};
