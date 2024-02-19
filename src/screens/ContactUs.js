import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ContactUs = () => {
   // Logic to determine whether to hide the tab
  const shouldShowTab = false; // Replace with your own logic

  if (!shouldShowTab) {
    // Return null if you want to hide the tab
    return null;
  }

  return (
    <View>
      <Text>Contactus Screen</Text>
    </View>
  );
}


export default ContactUs

const styles = StyleSheet.create({})