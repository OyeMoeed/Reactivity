import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Home from '../screens/Home/Home';
import Post from '../screens/Home/Post';
import Profile from '../screens/Home/Profile';
import Messages from '../screens/Home/Messages';
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
const AppStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
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
          ),
        }}
      />
      <Tab.Screen
        name="profileStack"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
