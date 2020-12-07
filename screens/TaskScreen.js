import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import TaskName from '../compenents/ComponentsTaskScreen/TaskName';
import TaskImage from '../compenents/ComponentsTaskScreen/TaskImage';
import TaskDescription from '../compenents/ComponentsTaskScreen/TaskDescription';
import { addPostsAC, addEmptyPostAC } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

export default function TaskScreen({ route, navigation }) {
  const user = useSelector((store) => store.isAuth);

  const isFocused = useIsFocused();

  useEffect(() => {
    getPosts();
  }, [isFocused]);

  const { taskName } = route.params;
  const dispatch = useDispatch();
  const postsRedux = useSelector((store) => store.posts);

  async function getPosts() {
    const response = await fetch('http://192.168.43.13:3100/taskName', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskName }),
    });
    const posts = await response.json();

    if (posts.error) {
      dispatch(addEmptyPostAC());
    } else {
      dispatch(addPostsAC(posts));
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  async function addLike(posts) {
    if (posts.error) {
      dispatch(addEmptyPostAC());
    } else {
      dispatch(addPostsAC(posts));
    }
  }

  return (
    <ScrollView>
      <ImageBackground
        style={styles.background}
        source={require('../assets/TaskMaster.jpg')}
      >
        <TouchableOpacity style={styles.buttonAdd}>
          <Text
            style={styles.button}
            onPress={() =>
              navigation.navigate('AddImage', {
                taskName: taskName,
                navigation: navigation,
              })
            }
          >
            ADD
          </Text>
        </TouchableOpacity>

        {postsRedux !== undefined && postsRedux.length !== 0 && (
          <View>
            {postsRedux.map((el) => {
              let isLiked = el.likesCount.includes(user);

              let avatar = require(`../assets/def_ava.jpg`);
              if (el.login == 'Anton') {
                avatar = require(`../assets/Anton.jpg`);
              } else if (el.login == 'Aleksei') {
                avatar = require(`../assets/Aleksei.jpg`);
              }
              return (
                <View style={styles.container}>
                  <View style={styles.login}>
                    <Image style={styles.avatar} source={avatar} />
                    <Text style={styles.accountName}>{el.login}</Text>
                  </View>
                  <TaskImage
                    url={el.image}
                    taskName={taskName}
                    addLike={addLike}
                    count={el.likesCount}
                  />
                  <View style={styles.likesContainer}>
                    <Text style={styles.likes}>
                      Likes: {el.likesCount.length}
                    </Text>

                    <Image
                      style={styles.img}
                      source={
                        isLiked
                          ? require('../compenents/ComponentsTaskScreen/pics/heart.png')
                          : require('../compenents/ComponentsTaskScreen/pics/heart-outline.png')
                      }
                    />
                  </View>
                </View>
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
    alignItems: 'center',
    width: '100%',
    height: '120%',
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  container: {
    borderWidth: 0,
    borderColor: 'white',
    backgroundColor: 'white',
    borderRightWidth: 10,
    borderLeftWidth: 10,
    padding: 5,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  login: {
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 18,
    borderColor: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    flexDirection: 'row',
  },
  likes: {
    borderWidth: 18,
    borderColor: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  accountName: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  buttonAdd: {
    marginLeft: 10,
    width: '28%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  button: {
    color: 'white',
    fontWeight: 'bold',
  },
  img: {
    width: 35,
    height: 35,
    marginRight: 20,
  },
  likesContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
});
