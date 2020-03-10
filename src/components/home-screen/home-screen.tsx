import {EventForm} from '@components';
import React from 'react';
import styled from 'styled-components/native';

const HomeScreen = () => {
  return (
    <Body>
      <EventForm onSubmit={values => console.log({values})} />
    </Body>
  );
};

export default HomeScreen;

const Body = styled.View`
  padding: 12px 12px 12px 12px;
  height: 100%;
  background-color: white;
`;
