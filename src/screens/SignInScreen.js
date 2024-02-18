import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { PRIMARY_COLOR } from '../utils/Colors'
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
  const navigation = useNavigation()
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

  const userSignIn = async () => {
    if (validateInput()) {
      // Proceed with user sign-in
      await auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.navigate("Home");
        })
        .catch(() => {
          Alert.alert("Wrong username and password.");
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
        secureTextEntry={true}
      />
      {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

      <TouchableOpacity style={styles.registerBtn} onPress={() => userSignIn()}>
        <Text style={{ color: "white", fontWeight: 400 }}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#000000"
  },
  inputField: {
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
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});
