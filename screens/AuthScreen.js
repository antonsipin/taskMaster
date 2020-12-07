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
import { isAuthAC } from '../redux/actions';
import { addGroupsMainAC } from '../redux/actions';

export default function AuthScreen({ navigation }) {
  const [error, setError] = useState(null);
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

  const dispatch = useDispatch();

  const authHandler = async () => {
    setError(null);

    let response = await fetch('http://192.168.43.13:3100/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, pass }),
    });

    const data = await response;

    if (data.status === 401) setError('Invalid password or login!');
    if (data.status === 400) setError('Please fill all the forms');
    if (data.status === 200) {
      dispatch(isAuthAC(login));
      navigation.navigate('Main');
    }
    setLogin('');
    setPass('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/auth.jpg')}
          style={styles.image}
        >
          <Text style={styles.logo}>Task Master</Text>
          {error && <Text style={styles.error}>{error}</Text>}
          <View style={styles.inputView}>
            <TextInput
              autoCorrect={false}
              secureTextEntry={false}
              style={{ height: 40, width: 120 }}
              placeholder='Login...'
              value={login}
              onChangeText={(login) => setLogin(login)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              autoCorrect={false}
              secureTextEntry={true}
              style={{ height: 60, width: 120 }}
              placeholder='Password...'
              value={pass}
              onChangeText={(pass) => setPass(pass)}
            />
          </View>
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn} onPress={authHandler}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text
              style={styles.signText}
              onPress={() => navigation.navigate('SignUp')}
            >
              Sign up
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
  error: {
    color: 'red',
    marginBottom: 10,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
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
  forgot: {
    fontSize: 11,
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
  signText: {
    color: 'black',
  },
  image: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
