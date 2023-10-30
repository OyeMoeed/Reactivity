import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';

const InputField = ({label, value, autoCapitalize, ...props}) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        {...props}
        style={style.inputs}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
};

export default InputField;

const style = StyleSheet.create({
  inputs: {
    width: 300,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
});
