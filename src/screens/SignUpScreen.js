import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {BUTTON_COLOR, PRIMARY_COLOR} from '../utils/Colors';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const validateInput = () => {
    let isValid = true;

    // Validate email
    if (email.trim() === '') {
      setEmailError('Email is required');
      isValid = false;
    } else {
      setEmailError(null);
    }

    // Validate password
    if (password.trim() === '') {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError(null);
    }

    return isValid;
  };

  const createUser = async () => {
    if (validateInput()) {
      try {
        const userCredential = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        const user = userCredential.user;

        // Create or update the user document in Firestore
        await firestore().collection('Users').doc(user.uid).set({
          email: email, // Store the email in the user document
          // Add any other user details here
        });

        Alert.alert('User account created & signed in!');

        // Optionally, navigate to another screen here or reset the form fields
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          Toast.show({
            type: 'error',
            text1: 'Registration failed',
            text2: "Email is already in use.",
          });
        } else if (error.code === 'auth/invalid-email') {
          Toast.show({
            type: 'error',
            text1: 'Registration failed',
            text2: "The Email address is invalid",
          });
        } else {
          // General error handler
          Alert.alert(error.message);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={{marginBottom: 40}}></Image>

      <TextInput
        style={styles.inputField}
        placeholder="Enter E-mail"
        placeholderTextColor="#616C6F"
        value={email}
        onChangeText={txt => {
          setEmail(txt);
          setEmailError(null);
        }}
      />
      {emailError && <Text style={styles.errorText}>{emailError}</Text>}

      <TextInput
        style={styles.inputField}
        placeholder="Enter Password"
        placeholderTextColor="#616C6F"
        value={password}
        onChangeText={txt => {
          setPassword(txt);
          setPasswordError(null);
        }}
        secureTextEntry={true}
      />
      {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

      <TouchableOpacity style={styles.registerBtn} onPress={() => createUser()}>
        <Text style={{color: 'white', fontWeight: 600}}>Register</Text>
      </TouchableOpacity>

      {/* sign in btn */}
      <View style={styles.signText}>
        <Text style={{color: '#7B8788', marginTop: 8}}>
          Already have an account?
        </Text>
        <TouchableOpacity
          style={styles.signBtn}
          onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.signBtn}> Sign In</Text>
        </TouchableOpacity>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000000',
    backgroundColor:"#e4edeb"
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#DAE0E2',
    width: '90%',
    color: '#000000',
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
  },

  registerBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
    width: '90%',
    height: 40,
    borderRadius: 8,
  },
  signBtn: {
    color: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    marginBottom: 3,
  },
});
