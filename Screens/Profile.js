import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import StatusBarComponent from '../components/widjets/StatusBarComponent';

const Profile = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>This is the profile screen!</Text>
            <Button title="navigate to next" onPress={()=>{navigation.navigate('Search')}}/>
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

export default Profile;