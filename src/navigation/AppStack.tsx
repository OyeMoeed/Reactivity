import React from 'react';
<<<<<<< HEAD
import {View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
=======
>>>>>>> HomeScreen
import Home from '../screens/Home/Home';
import Post from '../screens/Home/Post';
import Profile from '../screens/Home/Profile';
import Messages from '../screens/Home/Messages';
<<<<<<< HEAD
import Chat from '../screens/Home/Chat';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const FeedStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Reactivity"
        component={Home}
        options={{
          headerTitleAlign: 'center',
          headerStyle: {
            shadowColor: '#fff',

            elevation: 0,
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Messages')}
              style={{
                marginRight: 30,
                marginTop: 12,
              }}>
              <FontAwesome name="send-o" size={15} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        component={Messages}
        name="Messages"
        options={{
          headerBackTitleVisible: false,
          headerBackImage: ({color, size}) => (
            <View style={{paddingLeft: 20}}>
              <MaterialIcons name="arrow-back-ios" color={color} size={size} />
            </View>
          ),
        }}
      />
      <Stack.Screen
        component={Chat}
        name="Chat"
        options={({route}) => ({
          title: route.params.userName,
          headerBackTitleVisible: false,
          tabBarStyle: {display: route.state && route.state.index === 0},

          headerBackImage: ({color, size}) => (
            <View style={{paddingLeft: 20}}>
              <MaterialIcons name="arrow-back-ios" color={color} size={size} />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const PostStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Post" component={Post} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};
=======
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createMaterialBottomTabNavigator();
>>>>>>> HomeScreen
const AppStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
<<<<<<< HEAD
        name="Home"
        component={FeedStack}
        options={({route}) => ({
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="envelope-o" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="POST"
        component={PostStack}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Octicons name="plus" color={color} size={size} />
=======
        component={Home}
        name="HOME"
        options={{
          tabBarIcon: () => <Icon name="home" size={20} />,
        }}
      />
      <Tab.Screen
        component={Messages}
        name="MESSAGES"
        options={{
          tabBarIcon: () => (
            <Icon
              name="message"
              size={20}
              style={{
                fontFamily: 'MaterialIcons',
                backgroundColor: 'transparent',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        component={Post}
        name="POST"
        options={{
          tabBarIcon: () => (
            <Icon
              name="add"
              size={20}
              style={{
                fontFamily: 'MaterialIcons',
                backgroundColor: 'transparent',
              }}
            />
>>>>>>> HomeScreen
          ),
        }}
      />
      <Tab.Screen
<<<<<<< HEAD
        name="profileStack"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
=======
        component={Profile}
        name="PROFILE"
        options={{
          tabBarIcon: () => <Icon name="person" size={20} />,
>>>>>>> HomeScreen
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
