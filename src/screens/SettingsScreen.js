import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

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
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SettingsScreen;
