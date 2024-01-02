import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Card from './Card';
import HomeContainer from '../container/HomeContainer';

const ChatCard = ({children, onPress}) => {
  return (
    <HomeContainer>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.card}>
          <View>{children}</View>
        </View>
      </TouchableOpacity>
    </HomeContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    minWidth: '100%',
    padding: 7,
    borderRadius: 20,
    marginVertical: 10,
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

export default ChatCard;
