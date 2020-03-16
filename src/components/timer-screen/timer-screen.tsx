import {getDateTime} from '@helpers';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Body} from '@ui';
import moment from 'moment';
import React, {useCallback} from 'react';
import {Caption, Subheading} from 'react-native-paper';
import styled from 'styled-components/native';
import useTimer from './hooks';

type ParamsProps = {date: string; time: string; title: string};
type ScreenRouteProps = RouteProp<{TimerScreen: ParamsProps}, 'TimerScreen'>;

const TimerScreen = () => {
  const {params} = useRoute<ScreenRouteProps>();
  const {title, time, date} = params;
  const {navigate} = useNavigation();
  const dateTimeLabel = moment(getDateTime(date, time)).format(
    'MMM, D YYYY - h:mmA',
  );

  const onEnded = useCallback(() => {
    navigate('EventEndedScreen', {title});
  }, [title, navigate]);

  const {day, hour, minute, second} = useTimer(date, time, onEnded);

  return (
    <TimerBody>
      <TitleText>{title}</TitleText>
      <TimerValues>
        <TimerValue>
          <ValueText>{day}</ValueText>
          <LabelText>days</LabelText>
        </TimerValue>
        <TimerValue>
          <ValueText>{hour}</ValueText>
          <LabelText>hours</LabelText>
        </TimerValue>
        <TimerValue>
          <ValueText>{minute}</ValueText>
          <LabelText>minutes</LabelText>
        </TimerValue>
        <TimerValue>
          <ValueText>{second}</ValueText>
          <LabelText>seconds</LabelText>
        </TimerValue>
      </TimerValues>
      <DateTimeText>{dateTimeLabel}</DateTimeText>
    </TimerBody>
  );
};

const DateTimeText = styled(Subheading)`
  margin-top: 12px;
  align-self: center;
`;

const TimerValues = styled.View`
  margin-top: 12px;
  flex-direction: row;
  justify-content: space-evenly;
`;

const TimerValue = styled.View``;

const ValueText = styled(Subheading)`
  align-self: center;
`;

const LabelText = styled(Caption)`
  align-self: center;
`;

const TimerBody = styled(Body)`
  justify-content: center;
`;

const TitleText = styled(Subheading)`
  align-self: center;
`;

export default TimerScreen;
