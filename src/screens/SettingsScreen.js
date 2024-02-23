import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Divider from '../utils/Divider';
import { SECONDARY_COLOR } from '../utils/Colors';

const SettingsScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // Firebase logout logic
      await auth().signOut();
      // Navigate to SignIn screen after successful logout
      navigation.navigate('Signin');
    } catch (error) {
      console.error('Error during logout:', error.message);
      // Handle any logout errors as needed
    }
  };

  return (
    <View style={styles.container}>
      {/* <Button title="Logout" onPress={handleLogout} /> */}
      <View style={styles.user}>
        <Image  source={require("../../assets/images/user.png")}></Image>
      </View>
      <TouchableOpacity
      onPress={()=> navigation.navigate("MyAppointments")}>
        <Text style={styles.tab}>My Bookings</Text>
      </TouchableOpacity>
      <Divider/>
      <TouchableOpacity
      onPress={handleLogout}>
        <Text style={[styles.tab, styles.logout]}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#e4edeb",
    height:"100%"
  },
  logout:{
    color:SECONDARY_COLOR
    
  },
  tab:{
    color:"black",
    // marginTop: 16,
    backgroundColor:"#DAE0E2",
    paddingVertical:16,
    paddingLeft:10,
    elevation:2,
    fontSize:20
  },
  user:{
    marginLeft:16,
    marginVertical:16
  }
});

export default SettingsScreen;
