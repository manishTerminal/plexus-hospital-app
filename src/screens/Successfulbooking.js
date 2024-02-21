import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { PRIMARY_COLOR } from '../utils/Colors';

const SuccessfulBooking = ({ route }) => {
  const { doctorName,patientName, bookingDate, bookingTime } = route.params;

  return (
    <View style={styles.container}>
        <Image source={require("../../assets/images/success.png")}></Image>
      <Text style={styles.header}>Booking Successful!</Text>
      <Text style={styles.info}>Doctor: {doctorName}</Text>
      <Text style={styles.info}>Patient name: {patientName}</Text>
      <Text style={styles.info}>Date: {bookingDate}</Text>
      <Text style={styles.info}>Time: {bookingTime}</Text>
    </View>
  );
};

export default SuccessfulBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color:"black"
  },
  info:{
    color:"black"
  }
});
