import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';

const AuthContainer = ({children}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Reactivity</Text>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    maxWidth: 400,
    paddingHorizontal: 30,
    paddingVertical: 30,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust the alpha value (0.8 for 80% opacity)
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    position: 'relative',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2e64e5',
  },
});

export default AuthContainer;
