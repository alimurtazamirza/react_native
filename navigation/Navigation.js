import * as React from "react";
import { View, Alert, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Blog from "../Screens/Blog";
import Search from "../Screens/Search";
import Notification from "../Screens/Notification";
import Profile from "../Screens/Profile";
import Request from "../Screens/Request";
import Chat from "../Screens/Chat";
import BlogDetail from "../Screens/blogs/BlogDetail";
import Setting from "../Screens/profile/Setting";
import PersonalSetting from "../Screens/profile/PersonalSetting";
import AccountSetting from "../Screens/profile/AccountSetting";
import ChatDetail from "../Screens/ChatDetail";
import Colors from "../constants/Colors";
import * as SecureStore from "expo-secure-store";
import { Ionicons, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
// const Tab = createMaterialBottomTabNavigator();
const ScreenVar = ({ navigation }) => {
  let returnVar = {
    headerStyle: {
      backgroundColor: "white",
    },
    headerTitleStyle: {
      fontFamily: "open-sans-bold",
    },
    headerTintColor: Colors.accent,
    // headerStyle: {
    //   elevation: 0,
    //   shadowOpacity: 0,
    //   borderBottomWidth: 0,
    // },
  };
  return returnVar;
};
const ScreenVarTwo = ({ navigation }) => {
  let returnVarTwo = {
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
      backgroundColor: Colors.primary,
    },
    headerTitleStyle: {
      fontFamily: "open-sans-bold",
    },
    headerTintColor: "white",
  };
  return returnVarTwo;
};

function BlogScreen({ navigation }) {
  return (
    <Stack.Navigator screenOptions={ScreenVar}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen
        name="Blog"
        component={Blog}
        options={{
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: 60,
              }}
            >
              <MaterialCommunityIcons
                name="account-search"
                size={32}
                color={Colors.accent}
                onPress={() => {
                  navigation.navigate("Search");
                }}
              />
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="BlogDetail"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTintColor: "white",
          title: "",
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: 60,
              }}
            >
              <Ionicons
                name="ios-heart-empty"
                size={28}
                color="white"
                onPress={() => {}}
              />
            </View>
          ),
        }}
        component={BlogDetail}
      />
    </Stack.Navigator>
  );
}
function NotificationScreen() {
  return (
    <Stack.Navigator screenOptions={ScreenVar}>
      <Stack.Screen name="Notification" component={Notification} />
    </Stack.Navigator>
  );
}
function ProfileScreen() {
  return (
    <Stack.Navigator screenOptions={ScreenVar}>
      <Stack.Screen
        name="Profile"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTintColor: "black",
          title: "",
        }}
        component={Profile}
      />
      <Stack.Screen
        name="SettingScreen"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTintColor: "white",
          title: "",
        }}
        component={Setting}
      />
      <Stack.Screen
        name="PersonalScreen"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTintColor: "white",
          title: "Personal Information",
        }}
        component={PersonalSetting}
      />
      <Stack.Screen
        name="AccountScreen"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTintColor: "white",
          title: "Account Setting",
        }}
        component={AccountSetting}
      />
    </Stack.Navigator>
  );
}

function RequestScreen() {
  return (
    <Stack.Navigator screenOptions={ScreenVar}>
      <Stack.Screen name="Request" component={Request} />
    </Stack.Navigator>
  );
}
function ChatScreen() {
  return (
    <Stack.Navigator screenOptions={ScreenVar}>
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="ChatDetailScreen" component={ChatDetail} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Blog"
        tabBarOptions={{
          activeTintColor: "white",
          inactiveTintColor: "#b4b4b4",
          activeBackgroundColor: Colors.primary,
          inactiveBackgroundColor: Colors.primary,
          activeTabStyle: Colors.accent,
          keyboardHidesTabBar: true,
        }}
      >
        <Tab.Screen
          name="Blog"
          component={BlogScreen}
          options={{
            tabBarLabel: "Blog",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name="ios-home"
                size={focused == true ? 30 : 26}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            tabBarLabel: "Notification",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name="md-notifications"
                size={focused == true ? 30 : 26}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ focused, color }) => (
              <MaterialCommunityIcons
                name="shield-account-outline"
                size={focused == true ? 30 : 26}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Requests"
          component={RequestScreen}
          options={{
            tabBarLabel: "Requests",
            tabBarIcon: ({ focused, color }) => (
              <Entypo
                name="add-user"
                size={focused == true ? 30 : 26}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Message"
          component={ChatScreen}
          options={{
            tabBarLabel: "Message",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name="ios-chatbubbles"
                size={focused == true ? 30 : 26}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
