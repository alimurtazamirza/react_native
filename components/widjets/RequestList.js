import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Divider, Avatar } from "react-native-paper";
import GradientButton from "./GradientButton";
import OutlinedButton from "./OutlinedButton";
import { useSelector, useDispatch } from "react-redux";
import { apiChangeAsyncData } from "../../redux/action/Notification";
import UserApi from "../../api/User";
import Colors from "../../constants/Colors";


const { width, height } = Dimensions.get("window");

function RequestList(props) {
  const dispatch = useDispatch();
  const AuthUser = useSelector((state) => state.auth.user);
  const [requesting, setRequesting] = useState(false);
  const [requesting2, setRequesting2] = useState(false);
  const locale = useSelector((state) => state.translation);


  const requestBtn = async (option) => {
    if (option == "accept") {
      setRequesting(true);
      const response = await UserApi.acceptRequest({
        id: props.from,
        user_id: AuthUser.id,
      });
      if (response.ok) {
        if (response.data.status == 1) {
          LoadDataFirst("1");
        }
      }
      setRequesting(false);
    } else if (option == "cancel") {
      setRequesting2(true);
      const response = await UserApi.rejectRequest({
        id: props.from,
        user_id: AuthUser.id,
      });
      if (response.ok) {
        if (response.data.status == 1) {
          LoadDataFirst("2");
        }
      }
      setRequesting2(false);
    } else {
    }
  };

  const LoadDataFirst = async (option) => {
    let response;
    if (option == "1") {
      setRequesting(true);
      response = await UserApi.dataFirst(AuthUser.id);
      setRequesting(false);
    } else {
      setRequesting2(true);
      response = await UserApi.dataFirst(AuthUser.id);
      setRequesting2(false);
    }
    if (response.ok) {
      dispatch(apiChangeAsyncData(response.data));
    }
  };
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginVertical: 12,
        }}
      >
        <Avatar.Image
          size={80}
          source={{ uri: props.imageUrl }}
          style={styles.autherAvatar}
        />
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontFamily: "open-sans-bold", fontSize: 16 }}>
            {props.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <View
              style={{
                width: width * 0.35,
                paddingRight: 2,
                marginVertical: 5,
              }}
            >
              <GradientButton
                onClick={() => {
                  requestBtn("accept");
                }}
                Requesting={requesting}
                text={locale.confirm}
                gradient={["#ef8575", Colors.accent]}
                height={40}
              />
            </View>
            <View style={{ width: width * 0.35, paddingRight: 5 }}>
              <OutlinedButton
                onClick={() => {
                  requestBtn("cancel");
                }}
                Requesting={requesting2}
                text={locale.remove}
                height={40}
              />
            </View>
          </View>
        </View>
      </View>
      {/* <Divider style={{ height: 1, marginVertical: 0 }} /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  autherAvatar: {
    backgroundColor: Colors.background,
    marginHorizontal: 10,
  },
});

export default RequestList;
