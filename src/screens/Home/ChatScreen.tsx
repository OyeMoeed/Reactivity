import {firebase} from '@react-native-firebase/auth';
import React, {useState, useCallback, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';

export default function ChatScreen({route}) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('Chats')
      .doc(firebase.auth().currentUser?.uid + route.params.uid)
      .collection('Messages')
      .orderBy('createdAt', 'desc')

      .onSnapshot(querySnapshot => {
        const allMessages = querySnapshot.docs.map(item => {
          return {...item.data(), _id: item.id}; // Add _id property
        });
        setMessages(allMessages);
      });
    return () => unsubscribe();
  }, [route.params.uid]);

  // Function to handle sending messages
  const onSend = useCallback(
    (newMessages = []) => {
      const NewMsg = newMessages[0];
      const messageData = {
        ...NewMsg,
        user: {
          _id: firebase.auth().currentUser?.uid,
        },
        sentTo: route.params.uid,
        createdAt: new Date().getTime(),
      };

      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messageData),
      );

      firebase
        .firestore()
        .collection('Chats')
        .doc(`${firebase.auth().currentUser?.uid}${route.params.uid}`)
        .collection('Messages')
        .add(messageData);

      firebase
        .firestore()
        .collection('Chats')
        .doc(`${route.params.uid}${firebase.auth().currentUser?.uid}`)
        .collection('Messages')
        .add(messageData);
    },
    [route.params.uid],
  );

  return (
    <View style={styles.flex}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: firebase.auth().currentUser?.uid,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  // Your other styles
});
