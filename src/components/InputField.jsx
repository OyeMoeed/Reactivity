// InputField.js
import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

const InputField = ({label, name, control, rules, ...inputProps}) => {
  return (
    <View>
      <Text>{label}</Text>
      <Controller
        control={control}
        render={({field}) => (
          <TextInput
            style={style.inputs}
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            {...inputProps} // Pass additional input props
          />
        )}
        name={name}
        rules={rules}
      />
    </View>
  );
};

const style = StyleSheet.create({
  inputs: {
    width: 300,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
});

export default InputField;
