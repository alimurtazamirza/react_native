import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { FAB } from "react-native-paper";
import StatusBarComponent from "../components/widjets/StatusBarComponent";
import { Divider, Searchbar, List, Avatar } from "react-native-paper";
import KeyboardDismiss from "../components/widjets/KeyboardDismiss";
import Colors from "../constants/Colors";

const Chat = (props) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <KeyboardDismiss>
      <View style={styles.container}>
        <FAB
          style={styles.fab}
          large
          icon="pen-plus"
          color="white"
          onPress={() => console.log("Pressed")}
        />
        <View>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={{ marginTop: 5 }}
          />

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <List.Section>
              <List.Item
                title="User Four"
                descriptionNumberOfLines={2}
                description="hye there whats you doing?"
                onPress={() => {
                  props.navigation.navigate("ChatDetailScreen", {
                    itemId: 84,
                    title: "User Four",
                  });
                }}
                titleStyle={{
                  fontSize: 16,
                  fontFamily: "open-sans-bold",
                  color: Colors.accent,
                }}
                descriptionStyle={{
                  fontSize: 14,
                  color: Colors.primary,
                  fontFamily: "open-sans",
                }}
                left={() => (
                  <Avatar.Image
                    size={60}
                    source={{ uri: "https://picsum.photos/700" }}
                    style={styles.autherAvatar}
                  />
                )}
                right={() => (
                  <View style={{ marginRight: 3, marginTop: 13 }}>
                    <Text>8/09/2020</Text>
                  </View>
                )}
              />
              {/* <Divider style={{ height: 1, marginHorizontal: 20 }} /> */}
              <List.Item
                title="Hello user"
                descriptionNumberOfLines={2}
                description="Item description and this is not the end it will move forward and we will see what we have to do"
                onPress={() => {
                  props.navigation.navigate("ChatDetailScreen", {
                    itemId: 86,
                    title: "Hello user",
                  });
                }}
                titleStyle={{
                  fontSize: 16,
                  fontFamily: "open-sans-bold",
                  color: Colors.accent,
                }}
                descriptionStyle={{
                  fontSize: 14,
                  color: Colors.primary,
                  fontFamily: "open-sans",
                }}
                left={() => (
                  <Avatar.Image
                    size={60}
                    source={{ uri: "https://picsum.photos/700" }}
                    style={styles.autherAvatar}
                  />
                )}
                right={() => (
                  <View style={{ marginRight: 3, marginTop: 13 }}>
                    <Text>8/09/2020</Text>
                  </View>
                )}
              />
              {/* <Divider style={{ height: 1, marginHorizontal: 20 }} /> */}
              <List.Item
                title="Ali murtaza"
                description="Hello does my message was recieved??"
                descriptionNumberOfLines={2}
                onPress={() => {
                  props.navigation.navigate("ChatDetailScreen", {
                    itemId: 83,
                    title: "Ali Murtaza",
                  });
                }}
                titleStyle={{
                  fontSize: 16,
                  fontFamily: "open-sans-bold",
                  color: Colors.accent,
                }}
                descriptionStyle={{
                  fontSize: 14,
                  color: Colors.primary,
                  fontFamily: "open-sans",
                }}
                left={() => (
                  <Avatar.Image
                    size={60}
                    source={{ uri: "https://picsum.photos/700" }}
                    style={styles.autherAvatar}
                  />
                )}
                right={() => (
                  <View style={{ marginRight: 3, marginTop: 13 }}>
                    <Text>8/09/2020</Text>
                  </View>
                )}
              />
              {/* <Divider style={{ height: 1, marginHorizontal: 20 }} /> */}
            </List.Section>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </KeyboardDismiss>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  autherAvatar: {
    backgroundColor: Colors.background,
    marginHorizontal: 10,
  },
  fab: {
    position: "absolute",
    backgroundColor: Colors.accent,
    margin: 16,
    right: 0,
    bottom: 40,
  },
});

export default Chat;
