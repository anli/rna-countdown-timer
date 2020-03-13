import {RouteProp, useRoute} from '@react-navigation/native';
import {Body} from '@ui';
import LottieView from 'lottie-react-native';
import React from 'react';
import {Title} from 'react-native-paper';
import styled from 'styled-components/native';

const celebrationLottie = require('@assets/lottie/celebration.json');

type ParamsProps = {title: string};
type ScreenRouteProps = RouteProp<
  {EventEndedScreen: ParamsProps},
  'EventEndedScreen'
>;

const EventEndedScreen = () => {
  const {params} = useRoute<ScreenRouteProps>();
  const {title} = params;

  return (
    <EventEndedBody>
      <EventTitle>{title}</EventTitle>
      <Animation>
        <LottieView source={celebrationLottie} autoPlay loop />
      </Animation>
    </EventEndedBody>
  );
};

const Animation = styled.View`
  align-self: center;
  width: 264px;
  height: 464px;
  position: absolute;
  bottom: 0;
`;

const EventEndedBody = styled(Body)`
  justify-content: center;
`;

const EventTitle = styled(Title)`
  align-self: center;
`;

export default EventEndedScreen;
