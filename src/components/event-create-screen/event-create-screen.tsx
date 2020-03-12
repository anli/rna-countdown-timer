import {EventForm} from '@components';
import {useNavigation} from '@react-navigation/native';
import {Body} from '@ui';
import React from 'react';

const EventCreateScreen = () => {
  const {navigate} = useNavigation();
  const onSubmit = ({
    title,
    date,
    time,
  }: {
    title: string;
    date: string;
    time: string;
  }) => {
    navigate('TimerScreen', {title, date, time});
  };

  return (
    <Body>
      <EventForm onSubmit={onSubmit} />
    </Body>
  );
};

export default EventCreateScreen;
