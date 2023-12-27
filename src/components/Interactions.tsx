import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
const Interactions = ({Comment, color, Like}) => {
  return (
    <View style={style.row}>
      <Icon name="heart" size={15} color={color} onPress={Like} />
      <TouchableOpacity onPress={Comment}>
        <Ionicon name="chatbox-outline" size={15} />
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 5,
  },
});

export default Interactions;
