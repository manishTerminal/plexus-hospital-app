import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Platform,
  Button,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../utils/Colors';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';

const BookingScreen = ({navigation}) => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('placeholder');
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bookingDate, setBookingDate] = useState(new Date());
  const [dateDisplay, setDateDisplay] = useState('dd/mm/yyyy'); // Display for the date
  const [timeDisplay, setTimeDisplay] = useState('--:-- am/pm'); // Display for the time
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [doctorError, setDoctorError] = useState('');
  const [patientNameError, setPatientNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [bookingDateError, setBookingDateError] = useState('');

  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);

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
    let isValid = true;

    // Reset error messages
    setDoctorError('');
    setPatientNameError('');
    setPhoneNumberError('');
    setBookingDateError('');

    // Validate selected doctor
    if (!selectedDoctor || selectedDoctor === 'placeholder') {
      setDoctorError('Please select a doctor.');
      isValid = false;
    }

    // Validate patient name
    if (!patientName.trim()) {
      setPatientNameError('Please enter the patient name.');
      isValid = false;
    }

    // Validate phone number
    if (!phoneNumber.trim()) {
      setPhoneNumberError('Please enter a phone number.');
      isValid = false;
    }


    if (!isValid) return; // Stop the booking process if validation fail

    const user = auth().currentUser;
    if (!user) {
      Alert.alert('Error', 'You must be logged in to book an appointment.');
      return;
    }

    if (selectedDoctor === 'placeholder') {
      Alert.alert('Error', 'Please select a doctor.');
      return;
    }
    try {
      await firestore()
        .collection('Appointments')
        .add({
          doctorId: selectedDoctor,
          patientName,
          phoneNumber,
          bookingDate: firestore.Timestamp.fromDate(bookingDate),
          userId: user.uid,
        });
      // Alert.alert('Success', 'Appointment booked successfully');

      setSelectedDoctor(''); // Reset to placeholder value
      setPatientName('');
      setPhoneNumber('');
      setBookingDate(new Date()); // Reset to current date or you can set a specific default date
      setDateDisplay('dd/mm/yyyy'); // Reset the display for date
      setTimeDisplay('--:-- am/pm'); // Reset the display for time
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'There was an issue booking the appointment');
    }

    // Assuming booking is successful and you have the necessary booking info
    const doctorName = doctors.find(doc => doc.id === selectedDoctor)?.name;
    const formattedDate = bookingDate.toLocaleDateString();
    const formattedTime = bookingDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    // Navigate to SuccessfulBooking screen with booking details
    navigation.navigate('SuccessfulBooking', {
      doctorName: doctorName,
      patientName: patientName,
      bookingDate: formattedDate,
      bookingTime: formattedTime,
    });
  };

  const onDateChange = (event, selectedValue) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedValue && event.type === 'set') {
      setBookingDate(selectedValue);
      setDateDisplay(selectedValue.toLocaleDateString());

      dateInputRef.current?.blur();
    } else {
      setShowDatePicker(false); // Hide date picker after selection
    }
    setTimeout(() => setShowDatePicker(false), 200);
  };

  const onTimeChange = (event, selectedValue) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedValue && event.type === 'set') {
      setBookingDate(
        prevState =>
          new Date(
            prevState.setHours(
              selectedValue.getHours(),
              selectedValue.getMinutes(),
            ),
          ),
      );
      setTimeDisplay(
        selectedValue.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      );
      timeInputRef.current?.blur();
    } else {
      setShowTimePicker(false); // Hide time picker after selection
    }
    setTimeout(() => setShowTimePicker(false), 200);
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Doctors list</Text>
      <LinearGradient
        colors={['#44b678', '#44b678']} // Gradient colors
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}} // Gradient direction
        style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedDoctor}
          onValueChange={itemValue => {
            if (itemValue !== 'placeholder') {
              setSelectedDoctor(itemValue);
              setDoctorError('');
            }
          }}
          style={styles.picker}>
          <Picker.Item label="Choose a Doctor" value="placeholder" />
          {doctors.map(doctor => (
            <Picker.Item
              key={doctor.id}
              label={doctor.name}
              value={doctor.id}
            />
          ))}
        </Picker>
      </LinearGradient>
      {doctorError ? <Text style={styles.errorText}>{doctorError}</Text> : null}
      {/* </View> */}

      <Text style={styles.title}>Patient name</Text>
      <TextInput
        style={styles.input}
        value={patientName}
        onChangeText={text => {
          setPatientName(text);
          setPatientNameError(''); // Clear error on change
        }}
        placeholderTextColor="#7B8788"
        placeholder="Enter patient name"
      />
      {patientNameError ? (
        <Text style={styles.errorText}>{patientNameError}</Text>
      ) : null}

      <Text style={styles.title}>Phone number</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={text => {
          setPhoneNumber(text);
          setPhoneNumberError(''); // Clear error on change
        }}
        placeholder="Enter phone number"
        placeholderTextColor="#7B8788"
        keyboardType="phone-pad"
      />
      {phoneNumberError ? (
        <Text style={styles.errorText}>{phoneNumberError}</Text>
      ) : null}

      <Text style={styles.title}>Booking date</Text>
      <View style={styles.dateInputContainer}>
        <TextInput
          ref={dateInputRef}
          style={[styles.input, {flex: 1}]}
          value={dateDisplay}
          onFocus={() => setShowDatePicker(true)}
          showSoftInputOnFocus={false}
        />
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={bookingDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      {bookingDateError ? (
        <Text style={styles.errorText}>{bookingDateError}</Text>
      ) : null}

      <Text style={styles.title}>Booking time</Text>
      <TextInput
        ref={timeInputRef}
        style={styles.input}
        value={timeDisplay}
        onFocus={() => setShowTimePicker(true)}
        showSoftInputOnFocus={false}
      />
      {showTimePicker && (
        <DateTimePicker
          value={bookingDate}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={onTimeChange}
        />
      )}

      <TouchableOpacity style={styles.registerBtn} onPress={handleBookNow}>
        <Text style={{ color: "white", fontWeight: 600 }}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:"#e4edeb"
  },
  errorText: {
    color: 'red', // Change as needed
    // Additional styling for error text
  },
  registerBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
    height: 40,
    borderRadius:0
  },
  dateInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  clearDateButton: {
    marginLeft: 10,
    color: SECONDARY_COLOR, // Use your app's color scheme
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DAE0E2',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: '#7B8788',
    backgroundColor: 'white',
  },
  picker: {
    width: '100%',
    marginBottom: 16,
    borderWidth: 2,
    color: 'Black',
    height: 30,
  },
  pickerContainer: {
    // borderWidth: 1,
    borderColor: 'white', // Bright border for the glossy effect
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#EFEFEF', // Light background for the glossy effect
    overflow: 'hidden', // Ensure the picker's content doesn't overflow the rounded borders
    elevation: 4, // Adds shadow for Android (optional, for depth)
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 2}, // Shadow for iOS
    shadowOpacity: 0.1, // Shadow for iOS
    shadowRadius: 4, // Shadow for iOS
  },
  title:{
    color:"#2C3335",
    fontSize:16,
    marginBottom:4
  }
});
