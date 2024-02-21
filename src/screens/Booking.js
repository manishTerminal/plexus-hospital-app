import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Platform, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { PRIMARY_COLOR } from '../utils/Colors';

const BookingScreen = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bookingDate, setBookingDate] = useState(new Date());
  const [dateDisplay, setDateDisplay] = useState('Choose Date'); // Display for the date
  const [timeDisplay, setTimeDisplay] = useState('Choose Time'); // Display for the time
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      const querySnapshot = await firestore().collection('Doctor').get();
      const docsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setDoctors(docsArray);
    };
    fetchDoctors();
  }, []);

  const handleBookNow = async () => {
    try {
      await firestore().collection('Appointments').add({
        doctorId: selectedDoctor,
        patientName,
        phoneNumber,
        bookingDate: firestore.Timestamp.fromDate(bookingDate),
      });
      Alert.alert('Success', 'Appointment booked successfully');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'There was an issue booking the appointment');
    }
  };

  const onDateChange = (event, selectedValue) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedValue && event.type === 'set') {
      setBookingDate(selectedValue);
      setDateDisplay(selectedValue.toLocaleDateString());
    }
    setShowDatePicker(false); // Hide date picker after selection
  };

  const onTimeChange = (event, selectedValue) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedValue && event.type === 'set') {
      setBookingDate((prevState) => new Date(
        prevState.setHours(selectedValue.getHours(), selectedValue.getMinutes())
      ));
      setTimeDisplay(selectedValue.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    }
    setShowTimePicker(false); // Hide time picker after selection
  };

  return (
    <View style={styles.container}>
      <Text>Select a Doctor:</Text>
      <Picker
        selectedValue={selectedDoctor}
        onValueChange={(itemValue) => setSelectedDoctor(itemValue)}
        style={styles.picker}>
        {doctors.map((doctor) => (
          <Picker.Item key={doctor.id} label={doctor.name} value={doctor.id} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        value={patientName}
        onChangeText={setPatientName}
        placeholder="Patient Name"
      />
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Phone Number"
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        value={dateDisplay}
        onFocus={() => setShowDatePicker(true)}
        showSoftInputOnFocus={false}
      />
      {showDatePicker && (
        <DateTimePicker
          value={bookingDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <TextInput
        style={styles.input}
        value={timeDisplay}
        onFocus={() => setShowTimePicker(true)}
        showSoftInputOnFocus={false}
      />
      {showTimePicker && (
        <DateTimePicker
          value={bookingDate}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onTimeChange}
        />
      )}

      <Button title="Book Now" onPress={handleBookNow} color={PRIMARY_COLOR} />
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: PRIMARY_COLOR,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  picker: {
    width: '100%',
    marginBottom: 20,
  },
});
