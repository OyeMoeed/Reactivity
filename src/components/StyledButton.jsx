import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const StyledButton = ({label, onPress, ...props}) => {
  return (
    <View>
      <TouchableOpacity {...props} onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 10,
    alignSelf: 'center',
    backgroundColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
