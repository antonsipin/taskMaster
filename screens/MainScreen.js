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
} from 'react-native';
import { AccountName } from '../compenents/ComponentMain/AccountName';
import { Groups } from '../compenents/ComponentMain/Groups';
import GroupPicture from '../compenents/ComponentMain/GroupPicture';
import GroupContainer from '../compenents/ComponentMain/GroupContainer';
import { addGroupsMainAC } from '../redux/actions';

export default function MainScreen({ navigation }) {
  const user = useSelector((store) => store.isAuth);
  const dispatch = useDispatch();

  let groupsStore = useSelector((store) => store.groups);
  console.log('groupsStore mainScreen --------', groupsStore);

  async function getGroups() {
    const response = await fetch('http://192.168.43.13:3100/account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    });
    const groups = await response.json();
    dispatch(addGroupsMainAC(groups));
  }

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <ImageBackground
      source={require('../assets/main.jpg')}
      style={styles.image}
    >
      <ScrollView style={styles.container}>
        {groupsStore === undefined && <ActivityIndicator />}
        {groupsStore !== undefined && (
          <ScrollView style={styles.container}>
            <SafeAreaView>
              <View style={styles.account}>
                <AccountName navigation={navigation} />
              </View>

              <View style={styles.groups}>
                <Groups navigation={navigation} />
                <GroupContainer>
                  <View style={styles.items}>
                    {groupsStore.map((el) => {
                      return (
                        <GroupPicture
                          name={el.groupName}
                          image={el.image}
                          navigation={navigation}
                        />
                      );
                    })}
                  </View>
                </GroupContainer>
              </View>
            </SafeAreaView>
          </ScrollView>
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  account: {
    flex: 1,
    borderRadius: 30,
    margin: 20,
    borderWidth: 0,
    backgroundColor: '#fff',
  },
  groups: {
    flex: 1,
    borderRadius: 30,
    margin: 5,
    // height: 450,
    borderWidth: 0,
    backgroundColor: '#fff',
  },
  items: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'center',
    width: 350,
    paddingRight: 5,
    paddingLeft: 5,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
});
