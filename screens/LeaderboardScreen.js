import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addBoard } from '../redux/actions';
import Leaderboard from '../compenents/ComponentLeaderboard/Leaderboard';

export default function LeaderboardScreen({ navigation }) {
  const dispatch = useDispatch();

  let group = useSelector((store) => store.groupName);

  let chartStore = useSelector((store) => store.chart);

  async function getBoard() {
    const response = await fetch('http://192.168.43.13:3100/leaderboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ group }),
    });
    const chart = await response.json();

    dispatch(addBoard(chart));
  }

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/TaskMaster.jpg')}
    >
      <ScrollView style={styles.container}>
        {chartStore !== undefined && (
          <View>
            {chartStore.map((item) => {
              return (
                <Leaderboard
                  login={item.login}
                  points={item.points}
                  navigation={navigation}
                />
              );
            })}
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '120%',
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
});
