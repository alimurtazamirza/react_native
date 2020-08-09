import React from "react";
import { StyleSheet, View } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Divider, IconButton, Avatar, List, Text } from "react-native-paper";
import Colors from "../../constants/Colors";
import moment from "moment";

function RequestList(props) {
  let date = moment(props.date).format("LLL");
  return (
    <View>
      <View
        style={{
          padddingVertical: 8,
          backgroundColor: props.active == 1 ? "#edf2f6" : "#fff",
        }}
      >
        <List.Item
          title={props.name}
          description={props.text + "\n" + date}
          descriptionNumberOfLines={3}
          onPress={() => {}}
          titleStyle={{
            fontSize: 16,
            fontFamily: "open-sans-bold",
            color: Colors.accent,
          }}
          descriptionStyle={{
            fontSize: 14,
            color: "black",
            fontFamily: "open-sans",
          }}
          left={() => (
            <Avatar.Image
              size={60}
              source={{ uri: props.imageUrl }}
              style={styles.autherAvatar}
            />
          )}
          right={() => (
            <Feather
              name="chevron-right"
              size={30}
              color={Colors.primary}
              style={{
                marginHorizontal: 10,
                marginTop: 15,
                right: 0,
              }}
            />
          )}
        />
      </View>
      {/* <Divider style={{ height: 1, marginVertical: 0 }} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  autherAvatar: {
    backgroundColor: Colors.background,
    marginHorizontal: 10,
    marginHorizontal: 10,
  },
});

export default RequestList;
