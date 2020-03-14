import {useNavigation} from '@react-navigation/native';
import {Body, FAB} from '@ui';
import React from 'react';
import styled from 'styled-components/native';

const HomeScreen = () => {
  const {navigate} = useNavigation();

  const onCreate = () => {
    navigate('EventCreateScreen');
  };

  return (
    <ScreenBody>
      <FAB icon="plus" onPress={onCreate} />
    </ScreenBody>
  );
};

const ScreenBody = styled(Body)``;

export default HomeScreen;
