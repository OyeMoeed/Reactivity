import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
const Interactions = ({Comment, color, Like}) => {
  return (
    <View style={style.row}>
      <TouchableOpacity onPress={Like}>
        <View>
          <Icon name="heart" size={20} color={color} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={Comment}>
        <View>
          <Ionicon name="chatbox-outline" size={20} />
        </View>
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
