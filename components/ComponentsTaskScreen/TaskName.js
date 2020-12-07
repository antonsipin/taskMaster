import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from "react-native-elements";

export default function TaskName(props) {
  return (
    <View style={styles.text}>

      <Avatar activeOpacity={0.5} imageProps={{}} rounded size="large" source={{ uri: "" }} title="TN" />
      <Text style={styles.accountName}>{props.taskName}</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 50,
  },
  accountName: {
    fontSize: 25,
    marginTop: 22,
    marginRight: 20,
  }
});
