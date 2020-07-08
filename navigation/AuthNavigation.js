import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SignInScreen from "../Screens/SignInScreen";
import SignUpScreen from "../Screens/SignUpScreen";


const Stack = createStackNavigator();



function App() {
    return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
          <Stack.Screen name="SignIn"
              component={SignInScreen}
          />
          <Stack.Screen name="SignUp"
              component={SignUpScreen}
          />
      </Stack.Navigator>
      </NavigationContainer>
    );
  }

export default App;
