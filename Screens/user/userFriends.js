import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height * 0.2;
const CARD_WIDTH = width * 0.91;

const Friends = (props) => {
  const AuthUser = useSelector((state) => state.auth.user);
  const user = props.userObj;

  return (
    <View>
      <ScrollView>
        {user.friends.map((friend, index) => {
          return (
            <TouchableWithoutFeedback key={index}>
              <View style={styles.card}>
                <Image
                  source={{ uri: friend.dp }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.textContent}>
                  <View style={styles.nameStyle}>
                    <Text numberOfLines={1} style={styles.cardtitle}>
                      {friend.name.toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.descriptStyle}>
                    <Text numberOfLines={2} style={styles.cardDescription}>
                      {friend.age + " years Old"}
                    </Text>
                    <Text numberOfLines={2} style={styles.cardDescription}>
                      {" | from " + friend.state == ""
                        ? friend.city
                        : friend.state}
                    </Text>
                    <Text numberOfLines={2} style={styles.cardDescription}>
                      {friend.country}
                    </Text>
                  </View>
                  <View style={{ flex: 2 }}>
                    <View style={styles.button}>
                      <TouchableOpacity
                        onPress={() => {
                          if (friend.friend_id == AuthUser.id) {
                            props.onNavigationChanges("Profile");
                          } else {
                            props.onNavigationChanges(
                              "UserFriend",
                              {
                                userID: friend.friend_id,
                              },
                              "push"
                            );
                          }
                        }}
                        style={[
                          styles.signIn,
                          {
                            borderColor: "#FF6347",
                            borderWidth: 1,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.textSign,
                            {
                              color: "#FF6347",
                            },
                          ]}
                        >
                          View profile
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nameStyle: {
    flex: 2,
    alignItems: "center",
    justifyContent: "space-around",
  },
  descriptStyle: {
    flex: 2,
    alignItems: "center",
    justifyContent: "space-around",
  },
  mapStyle: {
    width: width,
    height: height,
  },
  searchBox: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 5 : 5,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 60,
    paddingHorizontal: 15,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 2,
    height: 35,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  // endPadding: {
  //   paddingRight: width - CARD_WIDTH,
  // },
  card: {
    // padding: 10,
    flexDirection: "row",
    elevation: 5,
    borderRadius: 30,
    marginVertical: 8,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 2,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 16,
    // marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 14,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: "center",
    marginTop: 5,
  },
  signIn: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Friends;
