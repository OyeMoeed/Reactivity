import React from 'react';
import Home from '../screens/Home/Home';
import Post from '../screens/Home/Post';
import Profile from '../screens/Home/Profile';
import Icon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Messages from '../screens/Home/Messages';
import ChatScreen from '../screens/Home/ChatScreen';
import {View} from 'react-native';
import SearchUsers from '../screens/Home/SearchUsers';
import {firebase} from '@react-native-firebase/auth';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const FeedStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="RN Social"
      component={Home}
      options={({route}) => ({
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
      })}
    />
    <Stack.Screen
      name="Messages"
      component={MessageStack}
      options={({route}) => ({
        headerBackTitleVisible: false,
        headerShown: false,
      })}
    />
    <Stack.Screen
      name="Search"
      component={SearchUsers}
      options={({route}) => ({
        headerBackTitleVisible: false,
        headerShown: false,
      })}
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
        headerShown: false,
        uid: route.params?.uid, // Set uid from route.params
      })}
    />
  </Stack.Navigator>
);

const MessageStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({route}) => ({
        headerBackTitleVisible: false,
        headerShown: false,
      })}
    />
    <Stack.Screen
      name="MessagesStack"
      component={Messages}
      options={({route}) => ({
        headerBackTitleVisible: false,
        headerShown: false,
      })}
    />
  </Stack.Navigator>
);

const ProfileStack = ({route}) => {
  const {uid} = route.params || {}; // Destructure uid from route.params or set to undefined

  return (
    <Stack.Navigator initialRouteName="ProfileScreen" initialParams={{uid}}>
      <Stack.Screen
        name="ProfileScreen"
        component={Profile}
        options={({navigation, route}) => ({
          headerShown: false,
        })}
      />
      {/* Add other screens if needed */}
    </Stack.Navigator>
  );
};

const AppStack = route => {
  const currentUserUID = firebase.auth().currentUser?.uid; // Get current user's UID

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={FeedStack}
        options={({route}) => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="AddPost"
        component={Post}
        options={({route}) => ({
          tabBarShowLabel: false,
          headerShown: false,

          tabBarIcon: ({color, size}) => (
            <Icon name="add-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Search"
        component={SearchUsers}
        options={({route}) => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="search-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        initialParams={{uid: currentUserUID}} // Pass the UID of the current user
        component={ProfileStack}
        options={({route}) => ({
          tabBarShowLabel: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
