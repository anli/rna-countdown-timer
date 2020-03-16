import React from 'react';
import 'react-native';
import renderer, {act} from 'react-test-renderer';
import App from './';

it('renders correctly', async () => {
  await act(async () => {
    await renderer.create(<App />);
  });
});
