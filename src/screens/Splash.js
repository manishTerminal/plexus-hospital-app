import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { BG_COLOR } from '../utils/Colors'
import { moderateVerticalScale} from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'

const Splash = () => {
    const navigation = useNavigation();
    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate("Signup")
        }, 1000);
    },[]);

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/logo.png")} style={styles.logo}></Image>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:BG_COLOR
    },
    logo:{
        marginBottom: moderateVerticalScale(20)
    }
})

export default Splash