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
    borderRadius: 15,
    padding: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    backgroundColor: '#D3D3D37B',
    marginHorizontal: 8,
    alignContent: 'center',
  },
});
