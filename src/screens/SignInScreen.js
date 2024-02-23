import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { PRIMARY_COLOR } from '../utils/Colors'
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

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
        .catch((error) => {
          Toast.show({
            type: 'error',
            text1: 'Login failed',
            text2: "Wrong username and password.",
          });
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

      <TouchableOpacity style={styles.loginBtn} onPress={() => userSignIn()}>
        <Text style={{ color: "white", fontWeight: 600 }}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerBtn} onPress={()=>navigation.navigate("Signup")}>
        <Text style={{ color:PRIMARY_COLOR, fontWeight: 600, }}>Register</Text>
      </TouchableOpacity>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#000000",
    backgroundColor:"#e4edeb"
  },
  inputField: {
    borderWidth: 1,
    borderColor:"#DAE0E2",
    width: "90%",
    color: "#000000",
    borderRadius: 8,
    marginBottom: 12,
    borderRadius:8
  },
  loginBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PRIMARY_COLOR,
    width: "90%",
    height: 40,
    borderRadius:8
  },
  registerBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "90%",
    height: 40,
    marginTop: 16,
    borderWidth:1,
    borderRadius:8
  },
  errorText: {
    color: 'red',
    marginBottom: 3,
  },
});
