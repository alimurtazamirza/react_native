import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { AuthContext } from '../components/context';
import StatusBarComponent from '../components/widjets/StatusBarComponent';

const Blog = ({navigation}) => {

  const { signOut } = React.useContext(AuthContext);
    return (
        <View style={styles.container}>
            <Text>This is the blog screen!</Text>
            <Button title="SignOUt" onPress={()=>{signOut()}}/>
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

export default Blog;