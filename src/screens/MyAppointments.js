import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero if needed
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  useEffect(() => {
    const user = auth().currentUser;
    console.log("Current user:", user);
    if (user) {
      const fetchAppointments = async () => {
        try {
          const response = await firestore()
            .collection('Appointments')
            .where('userId', '==', user.uid)
            .get();
          const appointmentsArray = await Promise.all(response.docs.map(async doc => {
            const appointmentData = doc.data();
            console.log(appointmentData)
            // Fetch doctor name using doctorId
            const doctorSnapshot = await firestore().collection('Doctor').doc(appointmentData.doctorId).get();
            const doctorName = doctorSnapshot.data().name; // Assuming 'name' is the field storing the doctor's name
            console.log(doctorName)
            const bookingDate = appointmentData.bookingDate.toDate();
            const bookingTime = formatTime(bookingDate); // Format the time
            return {
              id: doc.id,
              ...appointmentData,
              bookingDate: bookingDate, // Convert Firestore Timestamp to JS Date
              doctorName: doctorName,
              bookingTime: bookingTime,
            };
          }));
          setAppointments(appointmentsArray);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchAppointments();
    } else {
      // Handle user not signed in or direct them to login
      console.log("No user is signed in.");
      setLoading(false);
    }
  }, []);

//   useEffect(() => {
//     const user = auth().currentUser;
//     console.log("Current user:", user);
//     if (user) {
//       const fetchAppointments = async () => {
//         try {
//           const response = await firestore()
//             .collection('Appointments')
//             .where('userId', '==', user.uid)
//             .get();
//           const appointmentsArray = response.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data(),
//             bookingDate: doc.data().bookingDate.toDate(), // Convert Firestore Timestamp to JS Date
//           }));
//           setAppointments(appointmentsArray);
//         } catch (error) {
//           console.error("Error fetching appointments:", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchAppointments();
//     } else {
//       // Handle user not signed in or direct them to login
//       console.log("No user is signed in.");
//       setLoading(false);
//     }
//   }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
        <Text style={styles.text}>Your bookings with Plexus Hospital :</Text>
      <FlatList
        data={appointments}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.appointmentCard}>
            <Text style={styles.text}>Patient Name: {item.patientName}</Text>
            <Text style={styles.text}>Doctor Name: {item.doctorName}</Text>
            <Text style={styles.text}>Booked Date: {item.bookingDate.toDateString()}</Text>
            <Text style={styles.text}>Booked Time: {item.bookingTime}</Text>
            {/* Add more appointment details here */}
          </View>
        )}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  appointmentCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
    color:"black"
  },
});

export default MyAppointments;
