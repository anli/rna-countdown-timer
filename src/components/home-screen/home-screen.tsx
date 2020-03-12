import {useNavigation} from '@react-navigation/native';
import {Body, Button} from '@ui';
import React from 'react';
import styled from 'styled-components/native';

const HomeScreen = () => {
  const {navigate} = useNavigation();

  const onCreate = () => {
    navigate('EventCreateScreen');
  };

  return (
    <ScreenBody>
      <CreateButton onPress={onCreate} mode="contained">
        Create
      </CreateButton>
    </ScreenBody>
  );
};

const ScreenBody = styled(Body)`
  justify-content: center;
  align-items: center;
`;
const CreateButton = styled(Button)`
  position: absolute;
`;

export default HomeScreen;
