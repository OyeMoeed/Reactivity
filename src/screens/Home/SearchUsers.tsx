import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import HomeContainer from '../../container/HomeContainer';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchUsers = () => {
  return (
    <HomeContainer>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#888"
          numberOfLines={1}
        />
        <Icon
          name="search-outline"
          size={20}
          color="#333"
          style={styles.searchIcon}
        />
      </View>
    </HomeContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#d3d3d35b',
    borderColor: '#ccc',
    borderRadius: 15,
    marginHorizontal: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 40,
    color: '#333',
  },
});

export default SearchUsers;
