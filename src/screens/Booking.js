import { StyleSheet, Text, TextInput,TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { PRIMARY_COLOR } from '../utils/Colors'


const Booking = () => {

    const navigate = useNavigation()

  return (
    <View>
      <Text style={{color:"black", fontSize:20, fontWeight:600, marginLeft:16, marginTop:16, marginBottom:16}}>Book Appointment</Text>
      <View style={{ justifyContent: 'center',
    alignItems: 'center',}}>
        <TextInput 
        placeholder='Choose a doctor'
        placeholderTextColor='#616C6F'
        style={styles.inputField}
        ></TextInput>
        <TextInput 
        placeholder='Patient Name'
        placeholderTextColor='#616C6F'
        style={styles.inputField}
        ></TextInput>
        <TextInput 
        placeholder='Phone Number'
        placeholderTextColor='#616C6F'
        style={styles.inputField}
        ></TextInput>
        <TextInput 
        placeholder='Email'
        placeholderTextColor='#616C6F'
        style={styles.inputField}
        ></TextInput>
        <TextInput 
        placeholder='dd/mm/yyyy'
        placeholderTextColor='#616C6F'
        style={styles.inputField}
        ></TextInput>
        <TextInput 
        placeholder='--:--'
        placeholderTextColor='#616C6F'
        style={styles.inputField}
        ></TextInput>

        <TouchableOpacity style={styles.registerBtn}>
        <Text style={{ color: "white", fontWeight: 400 }}>Book Now</Text>
      </TouchableOpacity>
        
      </View>
    </View>
  )
}

export default Booking

const styles = StyleSheet.create({
    inputField:{
        borderWidth: 1,
    width: "90%",
    color: "#000000",
    borderRadius: 8,
    marginBottom: 16,
    },
    registerBtn: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: PRIMARY_COLOR,
        width: "90%",
        height: 40,
      }
})