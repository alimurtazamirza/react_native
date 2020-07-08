
import * as React from 'react';
import {View, Alert} from 'react-native';
import { NavigationContainer,getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Blog from "../Screens/Blog";
import Search from "../Screens/Search";
import Notification from "../Screens/Notification";
import Profile from "../Screens/Profile";
import Request from "../Screens/Request";
import Chat from "../Screens/Chat";
import Colors from "../constants/Colors";
import { Ionicons,MaterialCommunityIcons,Entypo} from '@expo/vector-icons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();



const ScreenVar = ({navigation})=> {
  let returnVar = {
      headerStyle: {
          backgroundColor: Colors.primary
      },
      headerTitleStyle:{
          fontFamily: "open-sans-bold"
      },
      headerRight: () => (
        <View style={{flexDirection: "row",
        justifyContent: "space-evenly",
        width: 60}}>
          <MaterialCommunityIcons name="account-search" size={32} color="white" onPress={()=>{navigation.push('Search')}} />
        </View>
      ),
      headerTintColor: "white"
      }
      return returnVar;
} ;

function BlogScreen({navigation}) {
  return (
    <Stack.Navigator screenOptions={ScreenVar}>
        <Stack.Screen name="Blog"
            component={Blog}
        />
    </Stack.Navigator>
  );
}
function NotificationScreen() {
  return (
    <Stack.Navigator screenOptions={ScreenVar}>
        <Stack.Screen name="Notification"
            component={Notification}
        />
    </Stack.Navigator>
  );
}
function ProfileScreen() {
  return (
    <Stack.Navigator screenOptions={ScreenVar}>
        <Stack.Screen name="Profile"
            component={Profile}
        />
    </Stack.Navigator>
  );
}

function RequestScreen() {
  return (
    <Stack.Navigator screenOptions={ScreenVar}>
        <Stack.Screen name="Request"
            component={Request}
        />
    </Stack.Navigator>
  );
}
function TabNavigationScreen() {
  return (
    <Tab.Navigator initialRouteName="Blog"
        activeColor="white"
        inactiveColor="#eaa0a2"
        barStyle={{ backgroundColor: Colors.primary }}
      >
      <Tab.Screen name="Blog" component={BlogScreen} options={{
          tabBarLabel: 'Blog',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-home" size={26} color={color}/>
          ),
        }}/>
      <Tab.Screen name="Notification" component={NotificationScreen} options={{
          tabBarLabel: 'Notification',
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-notifications" size={26} color={color}/>
          ),
        }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="shield-account-outline" size={24} color={color} />
          ),
        }}/>
      <Tab.Screen name="Requests" component={RequestScreen} options={{
          tabBarLabel: 'Requests',
          tabBarIcon: ({ color }) => (
            <Entypo name="add-user" size={26} color={color} />
          ),
        }}/>
      <Tab.Screen name="Message" component={ChatScreen} options={{
          tabBarLabel: 'Message',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-chatbubbles" size={26} color={color}/>
          ),
        }}/>
    </Tab.Navigator>
  );
}
function ChatScreen() {
  return (
    <Stack.Navigator screenOptions={ScreenVar}>
        <Stack.Screen name="Chat"
            component={Chat}
        />
    </Stack.Navigator>
  );
}


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
          headerStyle: {
              backgroundColor: Colors.primary
          },
          headerTitleStyle:{
              fontFamily: "open-sans-bold"
          },
          headerTintColor: "white"
          }}>
        <Stack.Screen name="Tab" component={Blog} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;