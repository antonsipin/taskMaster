import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { AccountName } from '../compenents/ComponentMain/AccountName';
import { Groups } from '../compenents/ComponentMain/Groups';
import GroupPicture from '../compenents/ComponentMain/GroupPicture';
import GroupContainer from '../compenents/ComponentMain/GroupContainer';
import { addGroupsMainAC } from '../redux/actions';

export default function AddGroupScreen({ navigation }) {
  const dispatch = useDispatch();
  const [newGroupName, onChangeText] = React.useState('');
  const login = useSelector((store) => store.isAuth);
  const redux = useSelector((store) => store);
  console.log('redux AddGroupScreen before>>>>', redux);

  async function saveNewGroup() {
    navigation.navigate('Main')
    
    const response = await fetch('http://192.168.43.13:3100/newGroup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, newGroupName }),
    });

    const groups = await response.json();
    console.log('groups front>>>', groups);
    dispatch(addGroupsMainAC(groups));
    onChangeText('');
  }

  return (
    <ImageBackground
      source={require('../assets/main.jpg')}
      style={styles.image}
    >
      <ScrollView
      contentContainerStyle={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
      >
        {<ActivityIndicator />}
        { (
          <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
      >
            <SafeAreaView>
              {/* <View style={styles.account}>
                <AccountName navigation={navigation} />
              </View> */}

              <View style={styles.groups}>
              <GroupContainer>
              <View style={styles.items}>
              <Text style={styles.accountName}>Groups</Text>
             
              <View>
             
              </View>
              </View>
              </GroupContainer>
              <TextInput
                    style={styles.input}
                    placeholder='Enter new group here'
                    onChangeText={(text) => onChangeText(text)}
                />
                <TouchableOpacity style={styles.add}>
                  { newGroupName !== '' ?
                    <Text style={styles.textAdd} onPress={() => saveNewGroup() 
                    }>Save group</Text> :
                    <Text style={styles.textAdd} onPress={() => newGroupName !== '' ? (saveNewGroup()) : (
                      'Please fill a group name before press!'
                    )}>Fill group, than press</Text>
                  }    
              </TouchableOpacity>
              </View>
              
              </SafeAreaView>
          </ScrollView>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
  },
  
  add: {
    width: '28%',
    backgroundColor: '#fb5b5a',
    borderRadius: 15,
    height: 50,
    width: 220,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    margin: 55,
    marginBottom: 100,
    marginTop: 100,
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    borderRadius: 50,
  },
  textErr: {
    color: 'red',
    fontWeight: 'bold',
    borderRadius: 10,
    fontSize: 18,
  },
  accountName: {
    fontWeight: 'bold',
    color: '#fb5b5a',
    fontSize: 25,
    marginTop: 30,
    // marginRight: 20,
    marginLeft: 110,
    // alignItems: 'center',
    // justifyContent: 'center',
    margin: 55,
  },
  account: {
    flex: 1,
    borderRadius: 30,
    margin: 20,
    borderWidth: 0,
    backgroundColor: '#fff',
  },
  textAdd: {
    color: 'white',
    fontWeight: 'bold',
    borderRadius: 25,
    fontSize: 20,
  },
  groups: {
    flex: 1,
    borderRadius: 30,
    margin: 5,
    height: 500,
    width: 310,
    borderWidth: 0,
    backgroundColor: '#fff',
  },
  items: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  input: {
    height: 60,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 55,
    fontSize: 20
  },
});
