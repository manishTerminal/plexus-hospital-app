import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { BUTTON_COLOR, PRIMARY_COLOR } from '../utils/Colors'
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const validateInput = () => {
    let isValid = true;

    // Validate email
    if (email.trim() === "") {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError(null);
    }

    // Validate password
    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError(null);
    }

    return isValid;
  };

  const createUser = async () => {
    if (validateInput()) {
      // Proceed with user creation
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          Alert.alert('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('That email address is already in use!');
          } else if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid!');
          } else {
            Alert.alert(error.message);
          }
        });
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/logo.png")} style={{ marginBottom: 40 }}></Image>

      <TextInput
        style={styles.inputField}
        placeholder='Enter E-mail'
        placeholderTextColor='#616C6F'
        value={email}
        onChangeText={(txt) => {
          setEmail(txt);
          setEmailError(null); // Clear error when typing
        }}
      />
      {emailError && <Text style={styles.errorText}>{emailError}</Text>}

      <TextInput
        style={styles.inputField}
        placeholder='Enter Password'
        placeholderTextColor='#616C6F'
        value={password}
        onChangeText={(txt) => {
          setPassword(txt);
          setPasswordError(null); // Clear error when typing
        }}
      />
      {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

      <TouchableOpacity style={styles.registerBtn} onPress={() => createUser()}>
        <Text style={{ color: "white", fontWeight: 400 }}>Register</Text>
      </TouchableOpacity>

      {/* sign in btn */}
      <Text style={{ color: "black", fontWeight: 400 }}>Already have an account?
        <TouchableOpacity style={styles.signBtn} onPress={() => navigation.navigate("Signin")}>
          <Text style={styles.signBtn}> Sign In</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#000000"
  },
    inputField: {
      borderWidth: 1,
      borderColor: '#000', // Lighter border color
      width: "90%",
      color: "#000000",
      borderRadius: 8,
      marginBottom: 16,
      padding: 10, // Add some padding
      backgroundColor: '#FFFFFF', // Optional: Change background color
      fontSize: 16, // Increase font size for better readability
    },
  
  registerBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PRIMARY_COLOR,
    width: "90%",
    height: 40,
  },
  signBtn: {
    color: "blue",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    textDecorationLine: "underline",
    fontSize: 14
  },
  errorText: {
    color: 'red',
    marginTop: 1,
  },
});
