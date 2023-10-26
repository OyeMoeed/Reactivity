import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const StyledButton = ({label, ...props}) => {
  return (
    <View>
      <TouchableOpacity {...props} style={style.button}>
        <Text style={style.buttonText}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StyledButton;

const style = StyleSheet.create({
  button: {
    width: '50%',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignSelf: 'center',
    backgroundColor: '#4285F4',
  },
  buttonText: {
    color: 'white',
    display: 'flex',
    alignSelf: 'center',
  },
});
