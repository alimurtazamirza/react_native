import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StatusBarComponent from '../components/widjets/StatusBarComponent';

const Chat = () => {
    return (
        <View style={styles.container}>
            <Text>This is the Chat screen!</Text>
            <StatusBarComponent />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Chat;