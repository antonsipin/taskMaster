import React, { useEffect } from 'react';
import { CheckBox } from 'react-native-elements';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

export default function GroupTasks({ completed, title, navigation }) {
  const getData = useSelector((store) => store);
  const user = useSelector((store) => store.isAuth);
  const dispatch = useDispatch();

  let isChecked = false;
  if (completed && completed.includes(user)) {
    isChecked = true;
  }

  return (
      
    <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Task', { taskName: title })}
          style={[styles.item]}
        >
          <Text style={styles.title}>{title}</Text>
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
