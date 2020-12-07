import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function ProfileScreen({ login, points, navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{login}</Text>
      <Text style={styles.title}>{points}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // textAlignVertical: 'center',
    padding: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    width: 350,
  },
  title: {
    fontSize: 20,
    padding: 10,
  },
});
