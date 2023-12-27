import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Card = ({children, ...props}) => {
  return (
    <View style={style.card} {...props}>
      {children}
    </View>
  );
};

export default Card;

const style = StyleSheet.create({
  card: {
    backgroundColor: '#F5F5F5',
    marginVertical: 10,
    paddingVertical: 15,
  },
});
