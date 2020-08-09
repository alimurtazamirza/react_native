import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import StatusBarComponent from "../components/widjets/StatusBarComponent";
import NotificationList from "../components/widjets/NotificationList";
import { Divider, Avatar, List } from "react-native-paper";

import Colors from "../constants/Colors";

const Notification = ({ navigation }) => {
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      name: "Muhammad ali",
      active: 1,
      text: "Wants to be friends with you and someone else",
      date: new Date(),
      imageUrl: "https://placebeard.it/660x360",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      name: "Ahmad",
      text: "Liked your post",
      date: new Date(),
      imageUrl: "https://placebeard.it/670x360",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      name: "Helo User",
      text: "Wants to be friends with you",
      date: new Date(),
      imageUrl: "https://placebeard.it/630x360",
    },
    {
      id: "bd7dfcbea-c1b1-46c2-aed5-3ad53abb28ba",
      name: "Third user",
      active: 1,
      text: "Has sent you a message",
      date: new Date(),
      imageUrl: "https://placebeard.it/650x360",
    },
    {
      id: "3ac68afc-cfds605-48d3-a4f8-fbd91aa97f63",
      name: "Second Item",
      text: "Has sent you a message",
      date: new Date(),
      imageUrl: "https://placebeard.it/660x360",
    },
    {
      id: "5869dsfa0f-3dda1-471f-bd96-145571e29d72",
      name: "checker",
      text: "Liked your post",
      date: new Date(),
      imageUrl: "https://placebeard.it/670x360",
    },
    {
      id: "bd7acbea-c1bfddf1-46c2-aed5-3dad53abb28ba",
      name: "Hello 2",
      active: 1,
      text: "Wants to be friends with you",
      date: new Date(),
      imageUrl: "https://placebeard.it/640x360",
    },
    {
      id: "3ac68afc-c6df05-d48d3-a4f8-fbd91aa97f63",
      name: "Muhammad ali",
      active: 1,
      text: "Liked your post",
      date: new Date(),
      imageUrl: "https://placebeard.it/640x360",
    },
    {
      id: "5869df4a0f-3da1-471f-bd96-145571e29d72",
      name: "Murtaza",
      active: 1,
      text: "Wants to be friends with you",
      date: new Date(),
      imageUrl: "https://placebeard.it/620x360",
    },
  ];
  const renderItem = ({ item }) => (
    <NotificationList
      name={item.name}
      imageUrl={item.imageUrl}
      text={item.text}
      date={item.date}
      active={item.active}
    />
  );
  return (
    <View style={styles.container}>
      <StatusBarComponent theme="dark" />
      <View>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
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
