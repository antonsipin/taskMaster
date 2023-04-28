import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

async function askForPermissions() {
  const { status } = await Permissions.askAsync(
    Permissions.CAMERA,
    Permissions.CAMERA_ROLL
  );
  if (status !== 'granted') {
    Alert.alert('Error', 'You might want to enable permission for camera use.');
    return false;
  }
  return true;
}

export default function AddImageScreen({ route, navigation: { goBack } }) {
  const [image, setImage] = useState(null);
  const { taskName } = route.params;
  const user = useSelector((store) => store.isAuth);
  const groupName = useSelector((store) => store.groupName);

  const takePhoto = async () => {
    const hasPermission = await askForPermissions();

    if (!hasPermission) {
      return;
    }

    const img = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: true,
      aspect: [4, 5],
    });

    setImage(img.uri);
  };

  const addPicture = async () => {
    await fetch('/addImg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskName, user, imgUrl: image, groupName }),
    });

    goBack();
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/TaskMaster.jpg')}
    >
      <View style={styles.wrapper}>
        {!image && (
          <TouchableOpacity style={styles.buttonAdd}>
            <Text style={styles.button} onPress={takePhoto}>
              Take a Picture
            </Text>
          </TouchableOpacity>
        )}

        {image && <Image style={styles.image} source={{ uri: image }} />}

        {image && (
          <TouchableOpacity style={styles.buttonAdd}>
            <Text style={styles.button} onPress={addPicture}>
              Add
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 10,

    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    paddingTop: 100,
    height: 1000,
    width: '100%',
    alignSelf: 'stretch',
  },
  buttonAdd: {
    width: '28%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  button: {
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
