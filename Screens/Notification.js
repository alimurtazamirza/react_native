import React, { useEffect } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import StatusBarComponent from "../components/widjets/StatusBarComponent";
import NotificationList from "../components/widjets/NotificationList";
import { apiChangeAsyncData } from "../redux/action/Notification";
import { Feather } from "@expo/vector-icons";
import UserApi from "../api/User";
import { useIsFocused } from "@react-navigation/native";
import Colors from "../constants/Colors";
import { useSelector, useDispatch } from "react-redux";

const Notification = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const notify = useSelector((state) => state.notify);
  const auth = useSelector((state) => state.auth.user);
  const DATA = notify.notifications;

  useEffect(() => {
    if (isFocused) {
      focusedClicked();
    }
  }, [isFocused]);

  const makeText = (option) => {
    if (option == "profile") {
      return "Has sent the friend request. Go to the user profile";
    } else if (option == "friend") {
      return "and you just bacame friends. Go to the user profile";
    } else if (option == "comment") {
      return "has commented on your Post.";
    } else {
      return "";
    }
  };

  const focusedClicked = async () => {
    const response = await UserApi.screenFocused("notification", auth.id);
    if (response.ok) {
      dispatch(apiChangeAsyncData(response.data));
    }
  };

  const navigate = (option, parms) => {
    navigation.navigate(option, parms);
  };
  const renderItem = ({ item }) => (
    <NotificationList
      name={item.name}
      imageUrl={item.dp}
      text={makeText(item.type)}
      date={item.created_at}
      navigate={navigate}
      type={item.type}
      url={item.url}
      to={item.to}
      from={item.from}
      active={!item.seen ? 1 : 1}
    />
  );
  return (
    <View style={styles.container}>
      <StatusBarComponent theme="dark" />
      {DATA.length < 1 ? (
        <View
          style={{
            height: "80%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Feather name="frown" size={80} color={Colors.accent} />
          <Text style={{ color: Colors.accent, fontSize: 30 }}>
            Nothing Found..!!
          </Text>
        </View>
      ) : (
        <View>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Notification;
