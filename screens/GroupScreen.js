import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';

import GroupTasks from '../compenents/ComponentsGroupScreen/GroupTasks';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { addTasks } from '../redux/actions';
import BottomTabs from '../navigation/BottomTab';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput } from 'react-native';

export default function GroupScreen({ navigation }) {
  const [value, onChangeText] = React.useState('');
  const [tougle, SetTougle] = React.useState(false);

  let group = useSelector((store) => store.groupName);
  const dispatch = useDispatch();

  let tasksStore = useSelector((store) => store.tasks);

  const isFocused = useIsFocused();

  useEffect(() => {
    getTasks();
  }, [isFocused]);

  async function getTasks() {
    const response = await fetch(`http://192.168.43.13:3100/groupTasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ group }),
    });
    const tasks = await response.json();

    dispatch(addTasks(tasks));
  }

  async function saveNewTask() {
    const response = await fetch('http://192.168.43.13:3100/newTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ group, value }),
    });

    const tasks = await response.json();

    dispatch(addTasks(tasks));
    SetTougle(false);
    onChangeText('');
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => SetTougle(false)}>
      <ImageBackground
        style={styles.background}
        source={require('../assets/TaskMaster.jpg')}
      >
        <ScrollView style={styles.container}>
          {tasksStore === undefined && <ActivityIndicator />}
          {tasksStore !== undefined && (
            <View>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('Leaderboard')}
                >
                  <Text style={styles.textLeaderboard}>Leaderboard</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.add}
                  onPress={() => (tougle ? SetTougle(false) : SetTougle(true))}
                >
                  <Text style={styles.roundButton1} style={styles.textAdd}>
                    Add new
                  </Text>
                </TouchableOpacity>
              </View>

              {tougle !== false && (
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder='Enter new task here'
                    onChangeText={(text) => onChangeText(text)}
                    value={value}
                  />

                  <TouchableOpacity
                    style={styles.add}
                    onPress={() => saveNewTask()}
                  >
                    <Text style={styles.roundButton1} style={styles.textAdd}>
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {tasksStore.tasks.map((item) => {
                return (
                  <GroupTasks
                    completed={item.completed}
                    title={item.taskName}
                    navigation={navigation}
                  />
                );
              })}
            </View>
          )}
        </ScrollView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    height: 1000,
    width: '100%',
    alignSelf: 'stretch',
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 60,
    borderRadius: 50,
    fontSize: 25,
    width: 100,
  },
  accountName: {
    fontSize: 25,
    marginTop: 22,
    marginRight: 20,
  },
  roundButton1: {
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 17,
    borderRadius: 100,
    backgroundColor: 'lightblue',
  },
  picture: {},
  button: {
    width: '45%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  textLeaderboard: {
    color: 'white',
    fontWeight: 'bold',
    width: 120,
    paddingLeft: 15,
    fontSize: 18
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  add: {
    width: '38%',
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
    fontSize: 18
  },
  input: {
    height: 60,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
});
