import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
const Interactions = () => {
  return (
    <View style={style.row}>
      <Icon name="heart" size={15} />
      <Ionicon name="chatbox-outline" size={15} />
    </View>
  );
};

export default Interactions;
const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 5,
  },
});
