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
import RequestList from "../components/widjets/RequestList";

import Colors from "../constants/Colors";

const Request = ({ navigation }) => {
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      name: "Muhammad Ali",
      imageUrl: "https://placebeard.it/640x360",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      name: "ali Murtaza",
      imageUrl: "https://placebeard.it/620x360",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      name: "Ahmad",
      imageUrl: "https://placebeard.it/630x360",
    },
    {
      id: "bd7dfcbea-c1b1-46c2-aed5-3ad53abb28ba",
      name: "Amjad",
      imageUrl: "https://placebeard.it/660x360",
    },
    {
      id: "3ac68afc-cfds605-48d3-a4f8-fbd91aa97f63",
      name: "Tasaver",
      imageUrl: "https://placebeard.it/670x360",
    },
    {
      id: "5869dsfa0f-3dda1-471f-bd96-145571e29d72",
      name: "Fahad",
      imageUrl: "https://placebeard.it/680x360",
    },
    {
      id: "bd7acbea-c1bfddf1-46c2-aed5-3dad53abb28ba",
      name: "Jabran",
      imageUrl: "https://placebeard.it/690x360",
    },
    {
      id: "3ac68afc-c6df05-d48d3-a4f8-fbd91aa97f63",
      name: "Hello 1",
      imageUrl: "https://placebeard.it/60x360",
    },
    {
      id: "5869df4a0f-3da1-471f-bd96-145571e29d72",
      name: "checker",
      imageUrl: "https://placebeard.it/520x360",
    },
  ];
  const renderItem = ({ item }) => (
    <RequestList name={item.name} imageUrl={item.imageUrl} />
  );
  return (
    <View style={styles.container}>
      <StatusBarComponent theme="dark" />
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            fontFamily: "open-sans-bold",
            fontSize: 25,
            paddingLeft: 13,
            paddingVertical: 15,
          }}
        >
          Friend Requests
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-bold",
            fontSize: 25,
            paddingLeft: 7,
            paddingTop: 15,
            color: "red",
          }}
        >
          18
        </Text>
      </View>
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

export default Request;
