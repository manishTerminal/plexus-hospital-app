import React from 'react';
import { View, StyleSheet } from 'react-native';

const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    // marginVertical: 10, // Adjust as needed
    // width:"90%",
    // marginHorizontal:16
  },
});

export default Divider;
