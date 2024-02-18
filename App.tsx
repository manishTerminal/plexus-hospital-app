import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator';
import MyTabs from './src/navigation/MyTabs';
import auth from '@react-native-firebase/auth';

const App = () => {
  const [userSignedIn, setUserSignedIn] = useState(false);

  useEffect(() => {
    // Check if the user is signed in
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUserSignedIn(!!user); // !!user returns true if user is not null, false otherwise
    });

    // Clean up the listener when the component is unmounted
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      {userSignedIn ? <MyTabs /> : <MainNavigator />}
    </NavigationContainer>
  );
};

export default App;
