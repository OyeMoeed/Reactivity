import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {firebase} from '@react-native-firebase/auth';
import {AuthContext} from '../firebase/AuthProvider';
import {useNavigation} from '@react-navigation/native';

import Post from '../screens/Home/Post';
import Profile from '../screens/Home/Profile';
import Messages from '../screens/Home/Messages';
import ChatScreen from '../screens/Home/ChatScreen';
import SearchUsers from '../screens/Home/SearchUsers';
import UserProfile from '../screens/Home/UserProfile';
import PostScreen from '../screens/Home/PostScreen';
import CommentScreen from '../screens/Home/CommentScreen';
import UploadProfilePictureScreen from '../screens/Home/UploadProfilePicture';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const FeedStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Reactivity"
        component={PostScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#2e64e5',
            fontSize: 18,
          },
          headerStyle: {
            shadowColor: '#fff',
            elevation: 0,
          },
          headerRight: () => (
            <View style={{marginRight: 10}}>
              <Icon
                name="paper-plane-outline"
                size={22}
                color="#2e64e5"
                onPress={() => navigation.navigate('Messages')}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({route}) => ({
          title: route.params?.name || 'Chat', // Set the title dynamically
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen
        name="Messages"
        component={Messages}
        options={{
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Comments"
        component={CommentScreen}
        options={{
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="HomeProfile"
        component={Profile}
        options={({route}) => ({
          title: 'Profile',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: '#fff',
            elevation: 0,
          },
          headerBackTitleVisible: false,
          uid: route.params?.uid,
          headerRight: () => (
            <View style={{marginRight: 10}}>
              <Icon
                name="chatbox-outline"
                size={22}
                color="#2e64e5"
                onPress={() =>
                  navigation.navigate('Chat', {uid: route.params?.uid})
                }
              />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const SearchStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchUsers}
        options={{
          headerBackTitleVisible: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HomeProfile"
        component={Profile}
        options={({route}) => ({
          title: 'Profile',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: '#fff',
            elevation: 0,
          },
          headerBackTitleVisible: false,
          uid: route.params?.uid,
          headerRight: () => (
            <View style={{marginRight: 10}}>
              <Icon
                name="chatbox-outline"
                size={22}
                color="#2e64e5"
                onPress={() =>
                  navigation.navigate('Chat', {uid: route.params?.uid})
                }
              />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = ({route}) => {
  const {uid} = route.params || {};

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={UserProfile}
        options={{
          headerBackTitleVisible: false,
          headerShown: false,
        }}
      />
      <Stack.Screen name="Upload" component={UploadProfilePictureScreen} />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  const currentUserUID = firebase.auth().currentUser?.uid;
  const {signout} = useContext(AuthContext);
  const [signoutLoading, setSignoutLoading] = useState(false);

  const handleSignout = async () => {
    try {
      setSignoutLoading(true);
      // Your signout logic here
      await signout();
    } catch (error) {
      console.error('Error during signout:', error);
    } finally {
      setTimeout(() => {
        setSignoutLoading(false);
      }, 2000); // Show activity indicator for 1 second
    }
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={FeedStack}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          headerStyle: {
            backgroundColor: 'transparent',
          },
          tabBarIcon: ({color, size}) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddPost"
        component={Post}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="add-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchStack"
        component={SearchStack}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="search-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        initialParams={{uid: currentUserUID}}
        component={ProfileStack}
        options={{
          tabBarShowLabel: false,
          headerTitle: '',
          tabBarIcon: ({color, size}) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
          headerRight: () => (
            <View style={{marginRight: 10}}>
              {signoutLoading ? (
                <ActivityIndicator size="small" color="#2e64e5" />
              ) : (
                <Icon
                  name="log-out-outline"
                  size={22}
                  color="#2e64e5"
                  onPress={handleSignout}
                />
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
