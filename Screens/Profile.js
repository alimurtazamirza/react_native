import React from "react";
import {
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import GradientButton from "../components/widjets/GradientButton";
import StatusBarComponent from "../components/widjets/StatusBarComponent";
import {
  Headline,
  Subheading,
  Divider,
  Title,
  Avatar,
  Caption,
  IconButton,
  Text,
  ToggleButton,
  List,
} from "react-native-paper";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

import Switch from "./profile/Switch";
import Colors from "../constants/Colors";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Profile = ({ navigation }) => {
  const [value, setValue] = React.useState("About");
  const toggleButtonChanger = (value) => {
    if (value) {
      setValue(value);
    }
  };
  const navigationScreen = () => {
    bs.current.snapTo(1);
    navigation.navigate("SettingScreen");
  };
  const renderContent = () => (
    <View style={styles.panel}>
      <List.Section>
        <TouchableOpacity
          onPress={() => {
            navigationScreen();
          }}
        >
          <List.Item
            title="Setting"
            description="Change you account setting."
            titleStyle={{ fontSize: 16, fontFamily: "open-sans-bold" }}
            left={() => (
              <Feather
                name="edit"
                size={30}
                style={{ marginHorizontal: 10, marginVertical: 7 }}
                color="black"
              />
            )}
          />
        </TouchableOpacity>
        <Divider style={{ height: 1, marginHorizontal: 20 }} />
        <TouchableOpacity>
          <List.Item
            title="Block User"
            description="This user won't be able to bother you."
            titleStyle={{ fontSize: 16, fontFamily: "open-sans-bold" }}
            left={() => (
              <Feather
                name="user-x"
                size={30}
                color="black"
                style={{ marginHorizontal: 10, marginVertical: 7 }}
              />
            )}
          />
        </TouchableOpacity>
      </List.Section>
    </View>
  );
  const renderHeader = () => (
    <View style={styles.headerSheet}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );
  let bs = React.createRef();
  let fall = new Animated.Value(1);
  return (
    <View style={styles.container}>
      <StatusBarComponent theme="dark" backgound="transparent" />
      <BottomSheet
        ref={bs}
        snapPoints={[windowHeight / 3.5, 0]}
        initialSnap={1}
        callbackNode={fall}
        enabledContentGestureInteraction={true}
        enabledContentTapInteraction={false}
        renderContent={renderContent}
        renderHeader={renderHeader}
      />
      <ScrollView>
        <View
          // animation="flipInX"
          style={styles.header}
        >
          <View style={styles.container}>
            <ImageBackground
              source={{ uri: "https://picsum.photos/700" }}
              style={styles.image}
            ></ImageBackground>
          </View>
        </View>
        <View style={styles.footer}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: -80,
            }}
          >
            <View
              style={{ borderWidth: 7, borderRadius: 100, borderColor: "#fff" }}
            >
              <Avatar.Image
                size={windowWidth / 2.3}
                source={{ uri: "https://placebeard.it/640x360" }}
                style={{ backgroundColor: Colors.background }}
              />
            </View>
            <Headline
              style={{
                fontFamily: "open-sans-bold",
                fontSize: 34,
                paddingTop: 15,
              }}
            >
              Muhammad Ali
            </Headline>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingBottom: 10,
              }}
            >
              <Subheading
                style={{ fontFamily: "open-sans", paddingHorizontal: 2 }}
              >
                {" 26 years Old "}|{" Fance, Paris"}
              </Subheading>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <IconButton
                icon="facebook"
                color="#0b84ed"
                size={30}
                onPress={() => console.log("Pressed")}
                style={{
                  backgroundColor: "#e3e5ed",
                  borderRadius: 15,
                  marginHorizontal: 10,
                }}
              />
              <IconButton
                icon="instagram"
                color="#C13584"
                size={30}
                onPress={() => console.log("Pressed")}
                style={{
                  backgroundColor: "#f9eaeb",
                  borderRadius: 15,
                  marginHorizontal: 10,
                }}
              />
              <IconButton
                icon="twitter"
                color="#1DA1F2"
                size={30}
                onPress={() => console.log("Pressed")}
                style={{
                  backgroundColor: "#e3e5ed",
                  borderRadius: 15,
                  marginHorizontal: 10,
                }}
              />
              <IconButton
                icon="youtube"
                color="#FF0000"
                size={30}
                onPress={() => console.log("Pressed")}
                style={{
                  backgroundColor: "#f9eaeb",
                  borderRadius: 15,
                  marginHorizontal: 10,
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              paddingVertical: 10,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Title
                style={{
                  paddingHorizontal: 10,
                  fontFamily: "open-sans-bold",
                  color: Colors.primary,
                  paddingTop: 20,
                  fontSize: 35,
                }}
              >
                10
              </Title>
              <Caption style={{ fontFamily: "open-sans", fontSize: 20 }}>
                Posts
              </Caption>
            </View>
            <View style={{ alignItems: "center" }}>
              <Title
                style={{
                  paddingHorizontal: 10,
                  fontFamily: "open-sans-bold",
                  color: Colors.primary,
                  paddingTop: 20,
                  fontSize: 35,
                }}
              >
                35
              </Title>
              <Caption style={{ fontFamily: "open-sans", fontSize: 20 }}>
                Friends
              </Caption>
            </View>
            <View style={{ alignItems: "center" }}>
              <Title
                style={{
                  paddingHorizontal: 10,
                  fontFamily: "open-sans-bold",
                  color: Colors.primary,
                  paddingTop: 20,
                  fontSize: 35,
                }}
              >
                80
              </Title>
              <Caption style={{ fontFamily: "open-sans", fontSize: 20 }}>
                Likes
              </Caption>
            </View>
            <View style={{ alignItems: "center" }}>
              <IconButton
                icon="dots-horizontal"
                color="#000"
                size={30}
                onPress={() => bs.current.snapTo(0)}
                style={{
                  backgroundColor: "#e3e5ed",
                  borderRadius: 15,
                  marginTop: 20,
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <View style={{ flex: 1, paddingHorizontal: 5 }}>
              <GradientButton
                onClick={() => {}}
                Requesting={false}
                text="Add Friend"
                gradient={["#ef8575", Colors.accent]}
              />
            </View>
            <View style={{ flex: 1, paddingHorizontal: 5 }}>
              <TouchableOpacity
                onPress={() => {}}
                style={[
                  styles.signIn,
                  {
                    borderColor: Colors.accent,
                    borderWidth: 1,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: Colors.accent,
                    },
                  ]}
                >
                  Message
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginVertical: 20,
            }}
          >
            <ToggleButton.Row
              onValueChange={(value) => toggleButtonChanger(value)}
              value={value}
            >
              <ToggleButton
                icon="information"
                value="About"
                style={{ width: windowWidth / 4.4 }}
                color={Colors.accent}
              />
              <ToggleButton
                icon="image-multiple"
                value="Images"
                style={{ width: windowWidth / 4.4 }}
                color={Colors.accent}
              />
              <ToggleButton
                icon="newspaper"
                value="Post"
                style={{ width: windowWidth / 4.4 }}
                color={Colors.accent}
              />
              <ToggleButton
                icon="account-multiple"
                value="Friends"
                style={{ width: windowWidth / 4.4 }}
                color={Colors.accent}
              />
            </ToggleButton.Row>
          </View>
          <View style={{ marginVertical: 20 }}>
            <Switch currentState={value} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  toggleButton: {
    backgroundColor: "green",
  },
  input: {
    width: "100%",
    height: 40,
    color: "black",
  },
  header: {
    height: windowHeight / 3,
  },
  panel: {
    paddingVertical: 20,
    backgroundColor: "#fff",
    paddingTop: 0,
    height: "100%",
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  headerSheet: {
    backgroundColor: "#fff",
    shadowColor: "#333333",
    // shadowOffset: {width: -1, height: -3},
    // shadowRadius: 2,
    // shadowOpacity: 1,
    paddingTop: 10,
    marginBottom: -10,
    borderColor: "#ddd",
    borderBottomColor: "#fff",
    borderBottomWidth: 3,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderTopWidth: 3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  footer: {
    flex: Platform.OS === "ios" ? 5 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 15,
    paddingBottom: 20,
    paddingTop: 3,
    marginTop: -10,
    // borderWidth:1,
    // borderTopWidth:2,
    // borderLeftColor:"#e74c3c",
    // borderRightColor:"#e74c3c",
    // borderTopColor:"#e74c3c"
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  image: {
    backgroundColor: "#ccc",
    flex: 1,
    resizeMode: "cover",
    backgroundColor: Colors.background,
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },
});

export default Profile;
