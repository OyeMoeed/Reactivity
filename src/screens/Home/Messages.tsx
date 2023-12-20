import React from 'react';
import HomeContainer from '../../container/HomeContainer';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserInfotab from '../../components/UserInfotab';
import ChatCard from '../../components/ChatCard';
import avatar from '../../assets/avatar.png';
import {Text, Touchable} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const Messages = ({item, route}) => {
  const navigation = useNavigation();
  return (
    <HomeContainer>
      <ChatCard>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Chat', {
              title: item.name,
            })
          }>
          <UserInfotab>{item.name}</UserInfotab>
          <Text numberOfLines={1}>{item.post}</Text>
          <Text style={{paddingTop: 10, fontSize: 12, color: '#777777'}}>
            {item.postTime}
          </Text>
        </TouchableOpacity>
      </ChatCard>
    </HomeContainer>
  );
};

export default Messages;
