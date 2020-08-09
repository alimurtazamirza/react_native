import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Divider, Avatar } from "react-native-paper";
import GradientButton from "./GradientButton";
import OutlinedButton from "./OutlinedButton";
import Colors from "../../constants/Colors";

const { width, height } = Dimensions.get("window");

function RequestList(props) {
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
                onClick={() => {}}
                Requesting={false}
                text="Confirm"
                gradient={["#ef8575", Colors.accent]}
                height={40}
              />
            </View>
            <View style={{ width: width * 0.35, paddingRight: 5 }}>
              <OutlinedButton
                onClick={() => {}}
                Requesting={false}
                text="Remove"
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
