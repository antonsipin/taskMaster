import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function TaskDescription() {

  return (
  <View style={styles.text}>
    <Text style={styles.accountName}>Description</Text>
  </View>
  
  )
}

const styles = StyleSheet.create({
  accountName: {
    fontSize: 25,
    marginTop: 22,
    marginRight: 20,
  }
});
