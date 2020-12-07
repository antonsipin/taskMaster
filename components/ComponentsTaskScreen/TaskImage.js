import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-native';
import DoubleClick from 'react-native-double-tap';

export default function TaskImage(props) {
  const login = useSelector((store) => store.isAuth);
  const data = useSelector((store) => store);
  const [isLiked, setLiked] = useState(false);

  let likeCurrent = false;
  const img = props.url;
  const taskName = props.taskName;

  async function checkLikes(arr) {
    if (arr.includes(login)) {
      setLiked(true);
    } else if (arr.includes(login)) {
      setLiked(false);
    }
  }

  useEffect(() => {
    checkLikes(props.count);
  }, []);

  async function addLike() {
    setLiked(true);

    const response = await fetch('http://192.168.43.13:3100/likes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskName, img, login }),
    });
    const posts = await response.json();

    props.addLike(posts);
  }

  return (
    <View>
      <DoubleClick
        doubleTap={() => {
          isLiked ? setLiked(true) : addLike();
        }}
      >
        <Image
          source={{
            uri: img,
          }}
          style={{ width: 350, height: 350 }}
        />
        {/* <Image
          style={styles2.img}
          source={
            isLiked
              ? require('./pics/heart.png')
              : require('./pics/heart-outline.png')
          }
        /> */}
      </DoubleClick>
    </View>
  );
}

const styles = StyleSheet.create({});

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 40,
    height: 40,
  },
});
