import {EventCreateScreen, HomeScreen, TimerScreen} from '@components';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';

const Stack = createStackNavigator();
const HomeStack = () => {
  return (
    <PaperProvider>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          options={{headerShown: false}}
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{headerShown: true, title: ''}}
          name="EventCreateScreen"
          component={EventCreateScreen}
        />
        <Stack.Screen
          options={{headerShown: true, title: ''}}
          name="TimerScreen"
          component={TimerScreen}
        />
      </Stack.Navigator>
    </PaperProvider>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};

export default App;
