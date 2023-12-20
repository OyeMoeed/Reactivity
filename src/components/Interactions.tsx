import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
const Interactions = ({Comment}) => {

  return (
    <View style={style.row}>
      <Icon name="heart" size={15} />
      <TouchableOpacity onPress={Comment}>
        <Ionicon name="chatbox-outline" size={15} />
      </TouchableOpacity>
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
