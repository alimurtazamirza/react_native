import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import StatusBarComponent from "../components/widjets/StatusBarComponent";
import RequestList from "../components/widjets/RequestList";
import { Feather } from "@expo/vector-icons";
import { apiChangeAsyncData } from "../redux/action/Notification";
import { useIsFocused } from "@react-navigation/native";
import UserApi from "../api/User";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../constants/Colors";

const Request = ({ navigation }) => {
  const notify = useSelector((state) => state.notify);
  const auth = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const DATA = notify.requests;

  const renderItem = ({ item }) => (
    <RequestList name={item.name} from={item.from} imageUrl={item.dp} />
  );

  useEffect(() => {
    if (isFocused) {
      focusedClicked();
    }
  }, [isFocused]);
  const focusedClicked = async () => {
    const response = await UserApi.screenFocused("requests", auth.id);
    if (response.ok) {
      dispatch(apiChangeAsyncData(response.data));
    }
  };
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
          {DATA.length}
        </Text>
      </View>
      <View>
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
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
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
