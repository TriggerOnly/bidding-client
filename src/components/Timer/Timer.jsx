import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from "../../axios"
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Timer = () => {
    const bidding = useSelector((state) => state.bidding.bidding);
    const [timeLeft, setTimeLeft] = useState(15 * 60);
    const navigate = useNavigate()
    const { id } = useParams();

    const parseCustomDate = (dateString) => {
      const [day, month, yearAndTime] = dateString.split(".");
      const [year, time] = yearAndTime.split(" ");
      return new Date(`${year}-${month}-${day}T${time}`);
    };    

    useEffect(() => {
    if (bidding?.time) {
      const biddingStartTime = parseCustomDate(bidding.time).getTime();
      const endTime = biddingStartTime + 15 * 60 * 1000;
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const remainingTime = Math.max((endTime - now) / 1000, 0);
        setTimeLeft(remainingTime);

        if (remainingTime <= 0) {
          clearInterval(interval)
          navigate(`/biddings/end/${id}`)
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [bidding?.time]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      };

    const handleClose = () => navigate("/");
    const handleEndBidding = async () => {
      navigate(`/biddings/end/${id}`);
    }

    return (
        <div>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                <Typography variant="h6">
                    Время до завершения: {formatTime(timeLeft)}
                </Typography>
                <Box>
                    <Button variant="outlined" color="error" onClick={handleClose} sx={{ marginRight: 1 }}>
                        Закрыть
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleEndBidding}>
                        Завершить торги
                    </Button>
                </Box>
            </Box>
        </div>
    );
};

export default Timer;