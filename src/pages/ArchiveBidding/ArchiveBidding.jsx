import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Bidding } from '../../components/Bidding/Bidding.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBiddings } from '../../redux/slice/biddingSlice';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);

const AchiveBidding = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.bidding);
  const [archivedBiddings, setArchivedBiddings] = useState([]);

  useEffect(() => {
    if (status === 'loading') {
      dispatch(fetchBiddings());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (items && items.length > 0) {
      const filteredItems = items.filter((bidding) => {
        const biddingTime = dayjs(bidding.time, 'DD.MM.YYYY HH:mm:ss');
        const currentTime = dayjs();
        const fifteenMinutesAgo = currentTime.subtract(15, 'minute');

        if (biddingTime.isValid()) {
          return biddingTime.isSameOrBefore(fifteenMinutesAgo);
        } else {
          console.warn(`Invalid time format: ${bidding.time}`);
          return false;
        }
      });
      setArchivedBiddings(filteredItems);
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
        {archivedBiddings && archivedBiddings.length > 0 ? (
          archivedBiddings.map((obj) => (
            <div key={obj._id}>
              <Bidding
                _id={obj._id}
                title={obj.title}
                text={obj.text}
                showDetailsButton
              />
            </div>
          ))
        ) : (
          <div>No archived biddings available</div>
        )}
      </Grid>
    </Grid>
  );
};


export default AchiveBidding;
