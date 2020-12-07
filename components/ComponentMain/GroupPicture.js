import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { getGroupNameAC } from '../../redux/actions';

export default function GroupPicture({ name, image, navigation }) {
  const dataFromRedux = useSelector((store) => store);
  const dispatch = useDispatch();

  function getGroupName() {
    dispatch(getGroupNameAC(name));
    navigation.navigate('Group', { name });
  }
  console.log('image', image);
  return (
    <View style={styles.item}>
      <Image
        style={styles.picture}
        onPress={() => getGroupName()}
        source={{
          uri: image
        }}
      />
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  picture: {
    width: 130,
    height: 130,
    borderRadius: 10,
    zIndex: 1,
    paddingRight: 5,
  },
  text: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    color: '#fb5b5a',
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 18,
  },
  item: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
  },
});
