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
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    marginHorizontal: 5,
    marginVertical: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
