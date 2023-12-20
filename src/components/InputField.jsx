import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

const InputField = ({label, name, control, rules, ...inputProps}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        render={({field}) => (
          <TextInput
            style={styles.input}
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

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#2e64e5',
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    fontSize: 16,
    borderColor: '#2e64e5',
  },
});

export default InputField;
