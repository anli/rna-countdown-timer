import {EventForm} from '@components';
import {useCountdownData} from '@helpers';
import {useNavigation} from '@react-navigation/native';
import {Body} from '@ui';
import React from 'react';

const EventCreateScreen = () => {
  const {navigate} = useNavigation();

  const {create$} = useCountdownData();

  const onSubmit = async ({
    title,
    date,
    time,
  }: {
    title: string;
    date: string;
    time: string;
  }) => {
    await create$({title, date, time});
    navigate('TimerScreen', {title, date, time});
  };

  return (
    <Body>
      <EventForm onSubmit={onSubmit} />
    </Body>
  );
};

export default EventCreateScreen;
