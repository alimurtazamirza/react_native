import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import StatusBarComponent from '../components/widjets/StatusBarComponent';

const Search = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>This is the Search screen!</Text>
            <Button title="navigate to next" onPress={()=>{navigation.navigate('Chat')}}/>
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

export default Search;