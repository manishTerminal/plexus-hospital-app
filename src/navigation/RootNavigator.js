// RootNavigator.js
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from './AppNavigator';
import MainNavigator from './MainNavigator';
import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
const RootStack = createStackNavigator();

function RootNavigator() {RootNavigator
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
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {userSignedIn ? (
        <RootStack.Screen name="App" component={AppNavigator} />
      ) : (
        <RootStack.Screen name="Auth" component={MainNavigator} />
      )}
    </RootStack.Navigator>
  );
}

export default RootNavigator