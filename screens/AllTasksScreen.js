import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView, ImageBackground } from 'react-native';
import AllTasks from '../compenents/ComponentsGroupScreen/AllTasks';
import { useSelector, useDispatch } from 'react-redux';
import { addAllTasks } from '../redux/actions';
import { useIsFocused } from '@react-navigation/native';

export default function AllTasksScreen({ navigation }) {
  let user = useSelector((store) => store.isAuth);
  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  useEffect(() => {
    getAllTasks();
  }, [isFocused]);

  let groupsStore = useSelector((store) => store.groups);
  let allTasksStore = useSelector((store) => store.allTasks);

  async function getAllTasks() {
    const response = await fetch('http://192.168.43.13:3100/allTasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ groupsStore }),
    });
    const allTasks = await response.json();

    dispatch(addAllTasks(allTasks));
  }

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <ImageBackground
        style={styles.background}
        source={require('../assets/TaskMaster.jpg')}
      >
        {allTasksStore !== undefined && (
          <View style={styles.scroll}>
            {allTasksStore.map((item) => {
              return (
                <AllTasks
                  name={item.taskName}
                  image={item.image}
                  completed={item.completed}
                  navigation={navigation}
                />
              );
            })}
          </View>
        )}
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '120%',
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  scroll: {
    height: '100%',
  },
});
