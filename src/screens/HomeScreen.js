import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../utils/Colors';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={require("../../assets/images/footer-logo.png")} style={styles.logo}></Image>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate("Booking")}>
          <View style={styles.tabContent}>
            <Image source={require("../../assets/images/medical-1.png")} />
            <Text style={styles.font}>Booking</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate("Services")}>
          <View style={styles.tabContent}>
            <Image source={require("../../assets/images/public-health.png")} />
            <Text style={styles.font}>Services</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate("Contactus")}>
          <View style={styles.tabContent}>
            <Image source={require("../../assets/images/contact-form.png")} />
            <Text style={styles.font}>Contact Us</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <View style={styles.tabContent}>
            <Image source={require("../../assets/images/about-us.png")} />
            <Text style={styles.font}>About Us</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, styles.car]}>
          <View style={styles.tabContent}>
            <Image source={require("../../assets/images/customer-feedback.png")} />
            <Text style={styles.font}>Feedback</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logo:{
  },
  car:{
    marginBottom:"10%"
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#2B2B52"
  },
  container: {
    height: "20%",
    backgroundColor:"#2B2B52",
    justifyContent:"center",
    alignItems:"center"
  },
  scrollContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  tab: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    backgroundColor: "#fff",
    width: "90%",
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  tabContent: {
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  font: {
    color: "black",
  },
});

export default HomeScreen;
