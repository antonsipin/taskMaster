import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const AccountName = ({ navigation }) => {
  const user = useSelector((store) => store.isAuth);

  let avatar = require(`../../assets/def_ava.jpg`);

  if (user == 'Anton') {
    avatar = require(`../../assets/Anton.jpg`);
  } else if (user == 'Aleksei') {
    avatar = require(`../../assets/Aleksei.jpg`);
  }
  // user === 'Aleksei' ? `../../assets/Aleksei.jpg` : `../../assets/Anton.jpg`;

  let str = user;

  let matches = str.match(/\b(\w)/g);
  return (
    <View style={styles.text}>
      <Image style={styles.avatar} source={avatar} />

      <Text style={styles.accountName}>{user}</Text>
      <MaterialCommunityIcons
        name='logout'
        color={'#fb5b5a'}
        size={30}
        onPress={() => navigation.navigate('Auth')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginLeft: 30,
    marginRight: 30,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    height: 120,
  },
  accountName: {
    marginLeft: 30,
    fontSize: 25,
    fontWeight: 'bold',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});
