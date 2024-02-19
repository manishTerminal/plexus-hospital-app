import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Services from '../screens/Services';
import Booking from '../screens/Booking';
import { Image } from 'react-native';


const Tab = createBottomTabNavigator();

const MyTabs = () => {

  return (
    <Tab.Navigator
      
      screenOptions={({ route }) => ({
        // headerShown:false
        tabBarIcon: ({ color, size }) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = require('../../assets/images/home.png');
          } else if (route.name === 'Booking') {
            iconSource = require('../../assets/images/booking.png');
          } else if (route.name === 'Services') {
            iconSource = require('../../assets/images/services.png');
          } else if (route.name === 'Profile') {
            iconSource = require('../../assets/images/profile.png');
          }

          return <Image source={iconSource} style={{ width: size, height: size, tintColor: color }} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#691C81',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 12,
        },
        style: {
          height: 60,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Booking" component={Booking} />
      <Tab.Screen name="Services" component={Services} />
      <Tab.Screen name="Profile" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default MyTabs;
