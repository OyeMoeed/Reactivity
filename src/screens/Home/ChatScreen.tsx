import {View, FlatList, Sty} from 'react-native';
import React from 'react';
import Messages from './Messages';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const MessageData = [
  {
    id: '1',
    name: 'Jenny Doe',
    userImg: require('../../assets/avatar.png'),
    postTime: '4 mins ago',
    post: 'Cras tempus ultrices elit, eu luctus lacus maximus nec. Donec maximus est nec neque tempor, a condimentum mauris ultricies. Curabitur justo dolor, dignissim semper sagittis at, feugiat in quam. Mauris sodales leo vitae est commodo, et consequat lacus euismod. Sed eleifend consectetur est, ac eleifend eros lobortis et. In pellentesque sagittis lorem, sit amet pellentesque ex commodo et. Vivamus sodales libero eu efficitur tincidunt. Praesent et dolor quis ex consequat tempus id ut urna. Etiam quis est mi. Integer ornare, arcu vel sagittis eleifend, nulla odio accumsan sem, sed pharetra dui sem id quam. Aliquam erat volutpat. Pellentesque maximus nisl massa, in varius velit semper eget. Vestibulum sapien eros, vulputate eu posuere sit amet, viverra sed diam. Proin sit amet urna et ex suscipit volutpat vitae ac ligula.',
  },
  {
    id: '2',
    name: 'John Doe',
    userImg: require('../../assets/avatar.png'),
    postTime: '2 hours ago',
    post: 'Cras tempus ultrices elit, eu luctus lacus maximus nec. Donec maximus est nec neque tempor, a condimentum mauris ultricies. Curabitur justo dolor, dignissim semper sagittis at, feugiat in quam. Mauris sodales leo vitae est commodo, et consequat lacus euismod. Sed eleifend consectetur est, ac eleifend eros lobortis et. In pellentesque sagittis lorem, sit amet pellentesque ex commodo et. Vivamus sodales libero eu efficitur tincidunt. Praesent et dolor quis ex consequat tempus id ut urna. Etiam quis est mi. Integer ornare, arcu vel sagittis eleifend, nulla odio accumsan sem, sed pharetra dui sem id quam. Aliquam erat volutpat. Pellentesque maximus nisl massa, in varius velit semper eget. Vestibulum sapien eros, vulputate eu posuere sit amet, viverra sed diam. Proin sit amet urna et ex suscipit volutpat vitae ac ligula.',
  },
  {
    id: '3',
    name: 'Ken William',
    userImg: require('../../assets/avatar.png'),
    postTime: '1 hours ago',
    post: 'Cras tempus ultrices elit, eu luctus lacus maximus nec. Donec maximus est nec neque tempor, a condimentum mauris ultricies. Curabitur justo dolor, dignissim semper sagittis at, feugiat in quam. Mauris sodales leo vitae est commodo, et consequat lacus euismod. Sed eleifend consectetur est, ac eleifend eros lobortis et. In pellentesque sagittis lorem, sit amet pellentesque ex commodo et. Vivamus sodales libero eu efficitur tincidunt. Praesent et dolor quis ex consequat tempus id ut urna. Etiam quis est mi. Integer ornare, arcu vel sagittis eleifend, nulla odio accumsan sem, sed pharetra dui sem id quam. Aliquam erat volutpat. Pellentesque maximus nisl massa, in varius velit semper eget. Vestibulum sapien eros, vulputate eu posuere sit amet, viverra sed diam. Proin sit amet urna et ex suscipit volutpat vitae ac ligula.',
  },
  {
    id: '4',
    name: 'Selina Paul',
    userImg: require('../../assets/avatar.png'),
    postTime: '1 day ago',
    post: 'Cras tempus ultrices elit, eu luctus lacus maximus nec. Donec maximus est nec neque tempor, a condimentum mauris ultricies. Curabitur justo dolor, dignissim semper sagittis at, feugiat in quam. Mauris sodales leo vitae est commodo, et consequat lacus euismod. Sed eleifend consectetur est, ac eleifend eros lobortis et. In pellentesque sagittis lorem, sit amet pellentesque ex commodo et. Vivamus sodales libero eu efficitur tincidunt. Praesent et dolor quis ex consequat tempus id ut urna. Etiam quis est mi. Integer ornare, arcu vel sagittis eleifend, nulla odio accumsan sem, sed pharetra dui sem id quam. Aliquam erat volutpat. Pellentesque maximus nisl massa, in varius velit semper eget. Vestibulum sapien eros, vulputate eu posuere sit amet, viverra sed diam. Proin sit amet urna et ex suscipit volutpat vitae ac ligula.',
  },
  {
    id: '5',
    name: 'Christy Alex',
    userImg: require('../../assets/avatar.png'),
    postTime: '2 days ago',
    post: 'Cras tempus ultrices elit, eu luctus lacus maximus nec. Donec maximus est nec neque tempor, a condimentum mauris ultricies. Curabitur justo dolor, dignissim semper sagittis at, feugiat in quam. Mauris sodales leo vitae est commodo, et consequat lacus euismod. Sed eleifend consectetur est, ac eleifend eros lobortis et. In pellentesque sagittis lorem, sit amet pellentesque ex commodo et. Vivamus sodales libero eu efficitur tincidunt. Praesent et dolor quis ex consequat tempus id ut urna. Etiam quis est mi. Integer ornare, arcu vel sagittis eleifend, nulla odio accumsan sem, sed pharetra dui sem id quam. Aliquam erat volutpat. Pellentesque maximus nisl massa, in varius velit semper eget. Vestibulum sapien eros, vulputate eu posuere sit amet, viverra sed diam. Proin sit amet urna et ex suscipit volutpat vitae ac ligula.',
  },
  {
    id: '6',
    name: 'Christy Alex',
    userImg: require('../../assets/avatar.png'),
    postTime: '2 days ago',
    post: 'Cras tempus ultrices elit, eu luctus lacus maximus nec. Donec maximus est nec neque tempor, a condimentum mauris ultricies. Curabitur justo dolor, dignissim semper sagittis at, feugiat in quam. Mauris sodales leo vitae est commodo, et consequat lacus euismod. Sed eleifend consectetur est, ac eleifend eros lobortis et. In pellentesque sagittis lorem, sit amet pellentesque ex commodo et. Vivamus sodales libero eu efficitur tincidunt. Praesent et dolor quis ex consequat tempus id ut urna. Etiam quis est mi. Integer ornare, arcu vel sagittis eleifend, nulla odio accumsan sem, sed pharetra dui sem id quam. Aliquam erat volutpat. Pellentesque maximus nisl massa, in varius velit semper eget. Vestibulum sapien eros, vulputate eu posuere sit amet, viverra sed diam. Proin sit amet urna et ex suscipit volutpat vitae ac ligula.',
  },
];

const ChatScreen = () => {
  const navigation = useNavigation(); // Add navigation hook

  return (
    <View style={styles.flex}>
      <FlatList
        data={MessageData}
        renderItem={({item}) => (
          <Messages item={item} navigation={navigation} />
        )} // Pass navigation prop
        keyExtractor={item => item.id}
      />
      {/* Your other components */}
    </View>
  );
};

const styles = {
  flex: {
    flex: 1,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
};

export default ChatScreen;

export default ChatScreen;
const style = {
  flex: {
    flex: 1,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
};
