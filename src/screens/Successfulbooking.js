import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { PRIMARY_COLOR } from '../utils/Colors';
import { useNavigation } from '@react-navigation/native';

const SuccessfulBooking = ({ route }) => {
  const { doctorName,patientName, bookingDate, bookingTime } = route.params;
  const navigation =useNavigation();

  return (
    <View style={styles.container}>
        <Image source={require("../../assets/images/success.png")}></Image>
      <Text style={styles.header}>Booking Successful!</Text>
      <Text style={styles.info}>Doctor: {doctorName}</Text>
      <Text style={styles.info}>Patient name: {patientName}</Text>
      <Text style={styles.info}>Date: {bookingDate}</Text>
      <Text style={styles.info}>Time: {bookingTime}</Text>

      <TouchableOpacity style={styles.homeBtn} onPress={()=> navigation.navigate("Home")}>
        <Text style={{color:"#000",}}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SuccessfulBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#e4edeb"
  },
  homeBtn:{
    marginTop:16,
    paddingVertical:10,
    paddingHorizontal:16,
    backgroundColor:'#fff'
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
