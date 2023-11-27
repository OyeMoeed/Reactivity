import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ProfileContainer from '../../container/ProfileContainer';
import Icon from 'react-native-vector-icons/Ionicons';
import {firebase} from '@react-native-firebase/auth';

const SearchUsers = ({navigation}) => {
  const [searchInput, setSearchInput] = useState('');
  const [users, setUsers] = useState([]);

  // Fetch users from Firebase
  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await firebase
        .firestore()
        .collection('Users')
        .where('name', '>=', searchInput.trim())
        .where('name', '<=', searchInput.trim() + '\uf8ff')
        .get();

      const userData = snapshot.docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return {id, ...data};
      });
      setUsers(userData);
    };

    fetchUsers();
  }, [searchInput]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.userContainer}
        onPress={() => {
          if (item.id) {
            console.log('Navigating to Profile with uid:', item.id);
            navigation.navigate('HomeProfile', {uid: item.id});
          } else {
            console.log('Item ID is undefined:', item);
          }
        }}>
        <Text style={styles.userName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ProfileContainer>
      <View style={styles.searchContainer}>
        <Icon
          name="search-outline"
          size={20}
          color="#333"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search users"
          placeholderTextColor="#999"
          onChangeText={text => setSearchInput(text)}
          value={searchInput}
        />
      </View>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
      />
    </ProfileContainer>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#d3d3d35b',
    borderColor: '#ccc',
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  userContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginVertical: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  userName: {
    fontSize: 16,
    color: '#333',
  },
  flatListContent: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
});

export default SearchUsers;
