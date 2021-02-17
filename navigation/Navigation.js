import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useSelector, useDispatch } from "react-redux";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import Blog from "../Screens/Blog";
import Search from "../Screens/Search";
import Notification from "../Screens/Notification";
import Profile from "../Screens/Profile";
import User from "../Screens/user/User";
import Request from "../Screens/Request";
import Chat from "../Screens/Chat";
import Badge from "./Badge";
import BlogDetail from "../Screens/blogs/BlogDetail";
import BlogNotifications from "../Screens/blogs/BlogNotifications";
import createBlogScreen from "../Screens/blogs/CreateBlog";
import CreateSubscription from "../Screens/profile/CreateSubscription";
import Setting from "../Screens/profile/Setting";
import PersonalSetting from "../Screens/profile/PersonalSetting";
import AccountSetting from "../Screens/profile/AccountSetting";
import PhotosSetting from "../Screens/profile/PhotosSetting";
import ChangePasswordSetting from "../Screens/profile/ChangePasswordSetting";
import PackageSetting from "../Screens/profile/PackageSetting";
import HobbiesSetting from "../Screens/profile/HobbiesSetting";
import ChatDetail from "../Screens/ChatDetail";
import Colors from "../constants/Colors";
import { Ionicons, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { apiChangeAsyncData } from "../redux/action/Notification";
// import navigation from "../navigation/rootNavigation";
import UserApi from "../api/User";

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
  const locale = useSelector((state) => state.translation);
  return (
    <Stack.Navigator screenOptions={ScreenVar}>
      <Stack.Screen name="Search" component={Search} options={{ title: locale.nav_search }} />
      <Stack.Screen
        name="User"
        options={{
          headerShown: false,
          headerTransparent: false,
          headerTintColor: "black",
          title: "",
        }}
        initialParams={{ userID: 0 }}
        component={User}
      />
      <Stack.Screen
        name="UserFriend"
        options={{
          headerShown: false,
          headerTransparent: false,
          headerTintColor: "black",
          title: "",
        }}
        initialParams={{ userID: 0 }}
        component={User}
      />
      <Stack.Screen
        name="BlogDetail"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTintColor: "white",
          title: "",
        }}
        component={BlogDetail}
      />
      <Stack.Screen name="userChatDetailScreen" component={ChatDetail} />
    </Stack.Navigator>
  );
}
function NotificationScreen() {
  const locale = useSelector((state) => state.translation);

  return (
    <Stack.Navigator screenOptions={ScreenVar}>
      <Stack.Screen name="Notification" component={Notification} options={{ title: locale.nav_notification }}   />
      <Stack.Screen
        name="userNotify"
        options={{
          headerShown: false,
          headerTransparent: false,
          headerTintColor: "black",
          title: "",
        }}
        initialParams={{ userID: 0 }}
        component={User}
      />
      <Stack.Screen
        name="postNotify"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTintColor: "white",
          title: "",
        }}
        component={BlogNotifications}
      />
      <Stack.Screen name="userChatDetailScreen" component={ChatDetail} />
    </Stack.Navigator>
  );
}
function ProfileScreen() {
  const locale = useSelector((state) => state.translation);

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
        // initialParams={{ userID: 0 }}
        component={Profile}
      />
      <Stack.Screen
        name="Blog"
        component={Blog}
        options={{ title: locale.nav_blogs, headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="UserFriend"
        options={{
          headerShown: false,
          headerTransparent: false,
          headerTintColor: "black",
          title: "",
        }}
        initialParams={{ userID: 0 }}
        component={User}
      />
      <Stack.Screen
        name="createBlog"
        component={createBlogScreen}
        options={{ title: locale.nav_create_blog, headerTitleAlign: "center" }}
      />

      <Stack.Screen
        name="BlogDetail"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTintColor: "white",
          title: "",
        }}
        component={BlogDetail}
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
          title: locale.nav_persconal,
        }}
        component={PersonalSetting}
      />
      <Stack.Screen
        name="AccountScreen"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTintColor: "white",
          title: locale.nav_account,
        }}
        component={AccountSetting}
      />
      <Stack.Screen
        name="PhotosScreen"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTintColor: "white",
          title: locale.nav_photos,
        }}
        component={PhotosSetting}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTintColor: "white",
          title: locale.nav_password,
        }}
        component={ChangePasswordSetting}
      />
      <Stack.Screen
        name="ChangePackageScreen"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTintColor: "white",
          title: locale.nav_package,
        }}
        component={PackageSetting}
      />
      <Stack.Screen
        name="CreateSubscription"
        component={CreateSubscription}
        options={{ title: locale.nav_create_blog, headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="HobbiesScreen"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTintColor: "white",
          title: locale.nav_hobbies,
        }}
        component={HobbiesSetting}
      />
    </Stack.Navigator>
  );
}

function RequestScreen() {
  const locale = useSelector((state) => state.translation);

  return (
    <Stack.Navigator screenOptions={ScreenVar}>
      <Stack.Screen name="Request" component={Request} options={{ title:locale.nav_requests}}/>
    </Stack.Navigator>
  );
}
function ChatScreen() {
  const locale = useSelector((state) => state.translation);

  return (
    <Stack.Navigator screenOptions={ScreenVar}>
      <Stack.Screen name="Chat" component={Chat} options={{title:locale.nav_chat}}/>
      <Stack.Screen name="ChatDetailScreen" component={ChatDetail} />
    </Stack.Navigator>
  );
}

function App() {
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.auth);
  const notify = useSelector((state) => state.notify);
  const locale = useSelector((state) => state.translation);
  React.useEffect(() => {
    const interval = setInterval(getAsync, 30000);
    // registerForPushNotifications();
    // Notifications.addNotificationReceivedListener((notifications) =>
    //   navigation.navigate("Message")
    // );
    return () => {
      clearInterval(interval);
    };
  }, []);

  const registerForPushNotifications = async () => {
    try {
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (!permission.granted) return;

      const token = await Notifications.getExpoPushTokenAsync();
      const response = await UserApi.updatePushToken({
        user_id: Auth.user.id,
        token: token.data,
      });
    } catch (error) {
      console.log("error getting push notificaiton", error);
    }
  };

  const getAsync = async () => {
    const response = await UserApi.checkAsyncData(Auth.user.id);
    if (response.ok) {
      if (
        (response.data.status != 0 && response.data.massages_count != 0) ||
        response.data.notifications_count != 0 ||
        response.data.request_count != 0
      ) {
        dispatch(apiChangeAsyncData(response.data));
      }
    }
  };
  if(!notify.package){
    return  (
      <NavigationContainer>
      <Stack.Navigator screenOptions={ScreenVar}>
    <Stack.Screen
            name="ChangePackageScreen"
            options={{
              headerShown: true,
              headerTransparent: true,
              headerTintColor: "white",
              title: locale.nav_package,
            }}
            component={PackageSetting}
          />
          <Stack.Screen
            name="CreateSubscription"
            component={CreateSubscription}
            options={{ title: locale.nav_create_blog, headerTitleAlign: "center" }}
          />
    </Stack.Navigator>
    </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Profile"
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
              <>
                <Ionicons
                  name="md-notifications"
                  size={focused == true ? 30 : 26}
                  color={color}
                />
                <Badge number={notify.notifications_count} />
              </>
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
                name="shield-account"
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
              <>
                <Ionicons
                  name="md-person-add"
                  size={focused == true ? 30 : 26}
                  color={color}
                />
                <Badge number={notify.request_count} />
              </>
            ),
          }}
        />
        <Tab.Screen
          name="Message"
          component={ChatScreen}
          options={{
            tabBarLabel: "Message",
            tabBarIcon: ({ focused, color }) => (
              <>
                <Ionicons
                  name="ios-chatbubbles"
                  size={focused == true ? 30 : 26}
                  color={color}
                />
                <Badge number={notify.massages_count} />
              </>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
