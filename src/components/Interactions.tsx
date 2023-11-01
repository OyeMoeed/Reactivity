import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Interactions = () => {
  return (
    <View style={style.row}>
      <Text onPress={() => {}}>Likes</Text>
      <Text onPress={() => {}}>Comment</Text>
    </View>
  );
};

export default Interactions;
const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
});
