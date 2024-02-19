import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AboutUs from '../screens/AboutUs';
import ContactUs from '../screens/ContactUs';
import Feedback from '../screens/Feedback';
import MyTabs from './MyTabs';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeTabs" component={MyTabs} options={{ headerShown: false }} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="Feedback" component={Feedback} />
    </Stack.Navigator>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})