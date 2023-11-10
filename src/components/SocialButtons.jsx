import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const SocialButtons = ({label, backgroundColor, ...props}) => {
  return (
    <View style={style.socialButtonView}>
      <TouchableOpacity {...props} style={style.Googlebutton}>
        <Text style={style.buttonText}>Sign Up With Google</Text>
      </TouchableOpacity>
      <TouchableOpacity {...props} style={style.FaceBookbutton}>
        <Text style={style.buttonText}>Sign Up With Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SocialButtons;

const style = StyleSheet.create({
  socialButtonView: {
    marginVertical: 5,
  },

  Googlebutton: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 40,
    alignSelf: 'center',
    backgroundColor: '#4285F4',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    display: 'flex',
    alignSelf: 'center',
  },
  FaceBookbutton: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 40,
    alignSelf: 'center',
    backgroundColor: '#898F9C',
    marginBottom: 15,
  },
});
