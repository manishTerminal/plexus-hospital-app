import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/footer-logo.png')}
          ></Image>
      </View>

      <Text
        style={{
          color: '#99AAAB',
          fontWeight: 600,
          fontSize: 18,
          marginTop: 16,
          marginLeft: 16,
        }}>
        Categories
      </Text>
      <View style={styles.scrollContainer}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('Booking')}>
          <View style={styles.tabContent}>
            <Image source={require('../../assets/images/medical-1.png')} />
            <Text style={styles.font}>Booking</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('Services')}>
          <View style={styles.tabContent}>
            <Image source={require('../../assets/images/public-health.png')} />
            <Text style={styles.font}>Services</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.contact}>
        <TouchableOpacity
          style={styles.tabTwo}
          onPress={() => navigation.navigate('ContactUs')}>
          <View style={styles.tabContentTwo}>
            <Image source={require('../../assets/images/contact-form.png')} />
            <Text style={styles.font}>Contact Us</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabTwo}
          onPress={() => navigation.navigate('AboutUs')}>
          <View style={styles.tabContentTwo}>
            <Image source={require('../../assets/images/community1.png')} />
            <Text style={styles.font}>About Us</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabTwo]}
          onPress={() => navigation.navigate('Feedback')}>
          <View style={styles.tabContentTwo}>
            <Image
              source={require('../../assets/images/customer-feedback.png')}
            />
            <Text style={styles.font}>Feedback</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          color: '#99AAAB',
          fontWeight: 600,
          fontSize: 18,
          marginVertical: 16,
          marginLeft: 16,
        }}>
        Popular Doctors
      </Text>

      <View>
        <ScrollView horizontal={true}>
        <TouchableOpacity onPress={()=>navigation.navigate("Doctordetails")}>
          <View
            style={{
              height: 120,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              padding: 10,
              margin:10,
              borderRadius:16,

            }}>
            <Image
            source={
                require("../../assets/images/amit.jpg")
            }
            style = {styles.docImage}
            ></Image>

            <View style={{marginHorizontal:10}}>
              <Text style={{color: '#403f3f', fontWeight: 600}}>
                Dr. Amit raj
              </Text>
              <Text style={{color: '#403f3f', fontWeight: 600}}>
                Cardiologist
              </Text>
              <Text style={{color: '#403f3f', fontWeight: 600}}>
                5 Yrs Experience
              </Text>
            </View>
          </View>
          </TouchableOpacity>
          <View
            style={{
              height: 120,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              padding: 10,
              margin:10,
              borderRadius:16
            }}>
            <Image source={require('../../assets/images/user.png')}></Image>

            <View style={{marginHorizontal:10}}>
              <Text style={{color: '#403f3f', fontWeight: 600}}>
                Dr. Rahul raj
              </Text>
              <Text style={{color: '#403f3f', fontWeight: 600}}>
                Cardiologist
              </Text>
              <Text style={{color: '#403f3f', fontWeight: 600}}>
                3 Yrs Experience
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 120,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              padding: 10,
              margin:10,
              borderRadius:16
            }}>
            <Image source={require('../../assets/images/user.png')}></Image>

            <View style={{marginHorizontal:10}}>
              <Text style={{color: '#403f3f', fontWeight: 600}}>
                Dr. Sahil Kumar
              </Text>
              <Text style={{color: '#403f3f', fontWeight: 600}}>
                Cardiologist
              </Text>
              <Text style={{color: '#403f3f', fontWeight: 600}}>
                1 Yrs Experience
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  car: {
    marginBottom: '10%',
  },
  docImage:{
    width: 100,
    height: 100,
    borderRadius: 200 / 2,
},
  safeArea: {
    flex: 1,
    backgroundColor: '#e4edeb',
  },
  container: {
    height: '20%',
    backgroundColor: '#88B7AE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contact: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  scrollContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tab: {
    // elevation: 1, // Adds shadow for Android (optional, for depth)
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 2}, // Shadow for iOS
    shadowOpacity: 0.1, // Shadow for iOS
    shadowRadius: 4,
    backgroundColor: '#fff',
    // width: "90%",
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    borderColor: '#DAE0E2',
  },
  tabTwo: {
    // elevation: 4,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  tabContent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabContentTwo: {
    justifyContent: 'space-evenly',
    // flexDirection: 'row',
  },
  font: {
    color: 'black',
  },
});

export default HomeScreen;
