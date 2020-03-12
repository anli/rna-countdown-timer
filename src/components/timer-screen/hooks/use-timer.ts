import {getDateTime} from '@helpers';
import moment from 'moment';
import {useEffect, useState} from 'react';

interface UseTimerProps {
  day: number;
  hour: number;
  minute: number;
  second: number;
}

const INITIAL_DURATION = {
  day: 0,
  hour: 0,
  minute: 0,
  second: 0,
};

const useTimer = (
  date: string | undefined,
  time: string | undefined,
  onEnded?: () => void,
): UseTimerProps => {
  const [duration, setDuration] = useState(INITIAL_DURATION);

  useEffect(() => {
    setDuration(getDurationFromNow(date, time));

    const interval = setInterval(() => {
      const nextDur = getDurationFromNow(date, time);

      const hasEnded =
        nextDur.day <= 0 &&
        nextDur.hour <= 0 &&
        nextDur.minute <= 0 &&
        nextDur.second <= 0;

      if (hasEnded) {
        setDuration(INITIAL_DURATION);
        onEnded && onEnded();
        clearInterval(interval);
        return;
      }

      setDuration(nextDur);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [date, time, onEnded]);

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
    return {
      day: duration.get('days'),
      hour: duration.get('hours'),
      minute: duration.get('minute'),
      second: duration.get('seconds'),
    };
  }

  return {
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  };
};

export default useTimer;
