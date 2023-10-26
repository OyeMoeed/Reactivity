import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const SocialButtons = ({label, backgroundColor, ...props}) => {
  return (
    <View style={style.socialButtonView}>
      <TouchableOpacity {...props} style={[style.button, {backgroundColor}]}>
        <Text style={style.buttonText}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SocialButtons;

const style = StyleSheet.create({
  socialButtonView: {
    marginVertical: 5,
  },

  button: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    display: 'flex',
    alignSelf: 'center',
  },
});
