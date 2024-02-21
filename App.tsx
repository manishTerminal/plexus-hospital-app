import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator';
import MyTabs from './src/navigation/MyTabs';
import auth from '@react-native-firebase/auth';
import RootNavigator from './src/navigation/RootNavigator';
import { BookingProvider } from './src/recoil/BookingContext';

const App = () => {
  

  return (
    <BookingProvider>
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
    </BookingProvider>

    
  
  );
};

export default App;
