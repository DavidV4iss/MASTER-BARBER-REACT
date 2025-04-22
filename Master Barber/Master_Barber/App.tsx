import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DefaultNavigator from './src/navigation/DefaultNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <DefaultNavigator />
    </NavigationContainer>
  );
};

export default App;