import React from 'react';

import SignUpScreen from '../screens/SignUpScreen';
import Splash from '../screens/Splash';


import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen';
import HomeScreen from '../screens/HomeScreen';

const STACK = createStackNavigator();

const MainNavigator = () => {
  return (
    
      <STACK.Navigator>
        <STACK.Screen name="Splash" component={Splash} options={{headerShown:false}}></STACK.Screen>
        <STACK.Screen name="Signup" component={SignUpScreen} options={{headerShown:false}}></STACK.Screen>
        <STACK.Screen name="Signin" component={SignInScreen} options={{headerShown:false}}></STACK.Screen>
        <STACK.Screen name="Home" component={HomeScreen} options={{headerShown:false}}></STACK.Screen>

      </STACK.Navigator>
  
  );
};

export default MainNavigator;
