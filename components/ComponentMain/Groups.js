import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { Image } from "react-native-elements";

export const Groups = ({ navigation }) => {
  return (
    <View style={styles.text}>
      <Text style={styles.accountName}>Groups</Text>
      <TouchableOpacity style={styles.add}>
        <Text style={styles.textAdd} onPress={() => navigation.navigate('AddGroup')}>Add new</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    borderRadius: 50,
  },
  accountName: {
    fontWeight: 'bold',
    color: '#fb5b5a',
    fontSize: 25,
    marginTop: 22,
    marginRight: 20,
  },
  roundButton1: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 17,
    borderRadius: 100,
    backgroundColor: 'lightblue',
  },
  picture: {},
  add: {
    width: '35%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  textAdd: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
});
