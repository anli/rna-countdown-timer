import moment from 'moment';
import {useEffect, useState} from 'react';
import {getDateTime} from '../';

interface UseTimerProps {
  day: number;
  hour: number;
  minute: number;
  second: number;
  hasEnded: boolean;
}

const INITIAL_DURATION = {
  day: 0,
  hour: 0,
  minute: 0,
  second: 0,
  hasEnded: false,
};

const useTimer = (
  date: string | undefined,
  time: string | undefined,
): UseTimerProps => {
  const [duration, setDuration] = useState(INITIAL_DURATION);

  useEffect(() => {
    setDuration(getDurationFromNow(date, time));

    const interval = setInterval(() => {
      const nextDur = getDurationFromNow(date, time);

      if (nextDur.hasEnded) {
        setDuration({...INITIAL_DURATION, hasEnded: true});
        clearInterval(interval);
        return;
      }

      setDuration(nextDur);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [date, time]);

  return duration;
};

const getDurationFromNow = (
  date: string | undefined,
  time: string | undefined,
) => {
  if (date) {
    const duration = moment.duration(
      moment(getDateTime(date, time)).diff(moment()),
    );

    const day = Math.floor(duration.as('days'));
    const hour = duration.get('hours');
    const minute = duration.get('minutes');
    const second = duration.get('seconds');

    const hasEnded = day <= 0 && hour <= 0 && minute <= 0 && second <= 0;

    return {
      day,
      hour,
      minute,
      second,
      hasEnded,
    };
  }

  return {
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
    hasEnded: false,
  };
};

export default useTimer;
