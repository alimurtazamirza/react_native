import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Divider, Searchbar, List, Avatar } from "react-native-paper";
import KeyboardDismiss from "../components/widjets/KeyboardDismiss";
import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { apiChangeAsyncData } from "../redux/action/Notification";
import Badge from "../navigation/Badge";
import UserApi from "../api/User";
import Colors from "../constants/Colors";
import moment from "moment";

const Chat = (props) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = React.useState("");
  const isFocused = useIsFocused();
  const notify = useSelector((state) => state.notify);
  const auth = useSelector((state) => state.auth.user);
  const locale = useSelector((state) => state.translation);
  const onChangeSearch = (query) => {
    setSearchQuery(query);
    filterLists();
  };

  useEffect(() => {
    if (isFocused) {
      focusedClicked();
    }
  }, [isFocused, notify.massages]);

  const focusedClicked = async () => {
    const response = await UserApi.screenFocused("massages", auth.id);
    if (response.ok) {
      dispatch(apiChangeAsyncData(response.data));
    }
  };

  const filterLists = () => {
    notify.massages.filter((msg) => msg.name == searchQuery);
  };
  const filteredContacts = notify.massages.filter((contacts) =>
    contacts.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <KeyboardDismiss>
      <View style={styles.container}>
        <View>
          <Searchbar
            placeholder={locale.Search}
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={{ marginTop: 5 }}
          />
          {filteredContacts.length < 1 ? (
            <View
              style={{
                height: "80%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather name="frown" size={80} color={Colors.accent} />
              <Text style={{ color: Colors.accent, fontSize: 30 }}>
                {locale.nothing_found}
              </Text>
            </View>
          ) : (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <List.Section>
                {filteredContacts.map((item, index) => {
                  let otherUser;
                  let splitArray = item.header.split("_");
                  if (splitArray[0] == auth.id) {
                    otherUser = splitArray[1];
                  } else {
                    otherUser = splitArray[0];
                  }
                  return (
                    <View key={index}>
                      <List.Item
                        title={item.name}
                        descriptionNumberOfLines={2}
                        description={item.message}
                        onPress={() => {
                          props.navigation.navigate("ChatDetailScreen", {
                            itemId: otherUser,
                            title: item.name,
                            header: item.header,
                            dp: item.dp,
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
                          <View>
                            <Avatar.Image
                              size={60}
                              source={{ uri: item.dp }}
                              style={styles.autherAvatar}
                            />
                            <Badge number={item.chatMassages} />
                          </View>
                        )}
                        right={() => (
                          <View style={{ marginRight: 3, marginTop: 13 }}>
                            <Text>
                              {moment(item.created_at).format("DD MMM, YYYY")}
                            </Text>
                          </View>
                        )}
                      />
                      <Divider style={{ height: 1, marginHorizontal: 20 }} />
                    </View>
                  );
                })}
              </List.Section>
            </TouchableWithoutFeedback>
          )}
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
