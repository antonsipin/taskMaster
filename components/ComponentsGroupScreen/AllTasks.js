import React from 'react';
import { CheckBox, Avatar } from 'react-native-elements';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

export default function AllTasks({ name, image, completed, navigation }) {
  const user = useSelector((store) => store.isAuth);
  let isChecked = false;
  if (completed && completed.includes(user)) {
    isChecked = true;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Task', { taskName: name })}
        style={[styles.item]}
      >
        <Avatar
          activeOpacity={0.5}
          imageProps={image}
          rounded
          size='medium'
          source={{ uri: image }}
          title='G'
        />
        <Text style={styles.title}>{name}</Text>
        <CheckBox
          checked={isChecked}
          onIconPress={() => console.log('onIconPress()')}
          size={30}
          uncheckedColor='#F00'
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  item: {
    textAlignVertical: 'center',
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
    fontSize: 12,
    padding: 10,
  },
});
