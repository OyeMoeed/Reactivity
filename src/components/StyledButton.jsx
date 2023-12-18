import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const StyledButton = ({label, onPress, ...props}) => {
  return (
    <View>
      <TouchableOpacity {...props} onPress={onPress} style={style.button}>
        <Text style={style.buttonText}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StyledButton;

const style = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 30,
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
