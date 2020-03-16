import {useCountdownData, useTimer} from '@helpers';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Body, FAB} from '@ui';
import moment from 'moment';
import React from 'react';
import {FlatList} from 'react-native';
import {IconButton, List} from 'react-native-paper';
import styled from 'styled-components/native';

interface DataProps {
  id: string;
  title: string;
  time: string | undefined;
  date: string;
  dateTimeLabel: string;
  hasEnded: boolean;
}

const HomeScreen = () => {
  const {navigate} = useNavigation();
  const {values, delete$, load$} = useCountdownData();

  const data: DataProps[] = values
    .map(value => ({
      ...value,
      dateTimeLabel: getDateTimeLabel(value.date, value.time),
      hasEnded: getHasEnded(value.date, value.time),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  useFocusEffect(
    React.useCallback(() => {
      const loadData$ = async () => {
        await load$();
      };
      loadData$();
    }, [load$]),
  );

  const onCreate = () => {
    navigate('EventCreateScreen');
  };

  const onView = (item: DataProps) => {
    const {title, time, date, hasEnded} = item;
    if (hasEnded) {
      return navigate('EventEndedScreen', {title});
    }
    return navigate('TimerScreen', {title, time, date});
  };

  const onDelete = async ({id}: {id: string}) => {
    await delete$({id});
    await load$();
  };

  return (
    <ScreenBody>
      <CountdownList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({item}: {item: DataProps}) => {
          return (
            <CountdownItem item={item} onDelete={onDelete} onView={onView} />
          );
        }}
        keyExtractor={(item: DataProps) => item.id}
      />
      <FAB icon="plus" onPress={onCreate} />
    </ScreenBody>
  );
};

const ScreenBody = styled(Body)``;

const CountdownList = styled(FlatList)``;

export default HomeScreen;

const CountdownItem = ({item, onDelete, onView}: any) => {
  const {title, dateTimeLabel, date, time} = item;
  const {day, hour, minute, second} = useTimer(date, time);

  return (
    <List.Item
      right={() => (
        <>
          <IconButton
            icon="delete"
            onPress={() => {
              onDelete(item);
            }}
          />
        </>
      )}
      onPress={() => onView(item)}
      title={title}
      description={`${dateTimeLabel}\n${day} days ${hour} hours ${minute} mins ${second} seconds`}
    />
  );
};

const getDateTimeLabel = (date: string, time: string | undefined) => {
  const dateTimeString = time ? `${date}T${time}` : date;
  return moment(dateTimeString).format('MMM D, YYYY h:mmA');
};

const getHasEnded = (date: string, time: string | undefined) => {
  const dateTimeString = time ? `${date}T${time}` : date;
  return moment(dateTimeString).isBefore();
};
