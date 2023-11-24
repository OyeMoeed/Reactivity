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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const FeedStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="RN Social"
      component={Home}
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
      name="Messages"
      component={MessageStack}
      options={{headerBackTitleVisible: false, headerShown: false}}
    />

    <Stack.Screen
      name="HomeProfile"
      component={Profile}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const MessageStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({route}) => ({
        //title: route.params.name,
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name="MessagesStack"
      component={Messages}
      options={{headerBackTitleVisible: false, headerShown: false}}
    />
  </Stack.Navigator>
);

const ProfileStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="ProfileStack"
      component={Profile}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const AppStack = () => {
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
        options={{
          tabBarShowLabel: false,
          headerShown: false,

          tabBarIcon: ({color, size}) => (
            <Icon name="add-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchUsers}
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
        component={ProfileStack}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
