import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { signUp } from '../redux/actions';

const image = {
  uri: '',
};

export default function SignUpScreen({ navigation: { goBack } }) {
  const dispatch = useDispatch();

  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

  async function signupHandler() {
    const request = await fetch('http://192.168.43.13:3100/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, pass }),
    });

    const response = await request.json();
    if (response.status === 'ok') {
      dispatch(signUp(login, pass));
      navigation.navigate('Main');
    }
    setLogin('');
    setPass('');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/auth.jpg')}
          style={styles.image}
        >
          <Text style={styles.title}>Sign Up</Text>
          <View style={styles.inputView}>
            <TextInput
              autoCorrect={false}
              secureTextEntry={false}
              style={{ height: 40, width: 120 }}
              placeholder='Login'
              value={login}
              onChangeText={(login) => setLogin(login)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              autoCorrect={false}
              secureTextEntry={false}
              style={{ height: 60, width: 120 }}
              placeholder='Password'
              value={pass}
              onChangeText={(pass) => setPass(pass)}
            />
          </View>
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginText} onPress={signupHandler}>
              CREATE ACCOUNT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text onPress={() => goBack()} style={styles.text}>
              Already have an account? Sign in.
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  loginText: {
    color: 'white',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  image: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
