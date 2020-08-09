import React from "react";
import {
  View,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Divider,
  IconButton,
  Subheading,
  Paragraph,
  Title,
  Avatar,
  Caption,
  List,
} from "react-native-paper";

import StatusBarComponent from "../../components/widjets/StatusBarComponent";
import Colors from "../../constants/Colors";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const BlogDetail = (props) => {
  // const title = props.route.params.title;
  React.useEffect(() => {
    const parent = props.navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false,
    });
    return () =>
      parent.setOptions({
        tabBarVisible: true,
      });
  }, []);

  const [data, setData] = React.useState({
    username: "",
    password: "",
    confirm_password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });
  const [isRequesting, setIsRequesting] = React.useState(false);

  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBarComponent theme="dark" backgound="transparent" />
      <View
        // animation="flipInX"
        style={styles.header}
      >
        <View style={styles.container}>
          <ImageBackground
            source={{ uri: "https://picsum.photos/700" }}
            style={styles.image}
          >
            <IconButton
              icon="camera"
              color="black"
              size={25}
              onPress={() => console.log("Pressed")}
              style={{
                backgroundColor: "#e3e5ed",
                position: "absolute",
                position: "absolute",
                right: 10,
                bottom: 35,
              }}
            />
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  borderWidth: 3,
                  borderRadius: 100,
                  borderColor: "#fff",
                }}
              >
                <Avatar.Image
                  size={windowWidth / 3}
                  source={{ uri: "https://placebeard.it/640x360" }}
                  style={{ backgroundColor: Colors.background }}
                />
                <View>
                  <IconButton
                    icon="account-edit"
                    color="black"
                    size={25}
                    onPress={() => console.log("Pressed")}
                    style={{
                      position: "absolute",
                      right: windowWidth / 3 / 3.5,
                      bottom: -20,
                      backgroundColor: "#e3e5ed",
                    }}
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
      <View
        // animation="flipInY"
        style={styles.footer}
      >
        <ScrollView>
          <View>
            <List.Section>
              <List.Item
                title="Personal Information"
                onPress={() => {
                  props.navigation.navigate("PersonalScreen");
                }}
                titleStyle={{ fontSize: 16, fontFamily: "open-sans-bold" }}
                left={() => (
                  <IconButton
                    icon="square-edit-outline"
                    color="#0b84ed"
                    size={30}
                    onPress={() => console.log("Pressed")}
                    style={{
                      backgroundColor: "#e3e5ed",
                      borderRadius: 15,
                      marginHorizontal: 10,
                    }}
                  />
                )}
                right={() => (
                  <Feather
                    name="chevron-right"
                    size={30}
                    color="black"
                    style={{ marginHorizontal: 10, marginTop: 15 }}
                  />
                )}
              />
              {/* <Divider style={{height:1,marginHorizontal:20}}/> */}
              <List.Item
                title="Account Setting"
                onPress={() => {
                  props.navigation.navigate("AccountScreen");
                }}
                titleStyle={{ fontSize: 16, fontFamily: "open-sans-bold" }}
                left={() => (
                  <IconButton
                    icon="settings"
                    color="#C13584"
                    size={30}
                    onPress={() => console.log("Pressed")}
                    style={{
                      backgroundColor: "#f9eaeb",
                      borderRadius: 15,
                      marginHorizontal: 10,
                    }}
                  />
                )}
                right={() => (
                  <Feather
                    name="chevron-right"
                    size={30}
                    color="black"
                    style={{ marginHorizontal: 10, marginTop: 15 }}
                  />
                )}
              />
              <List.Item
                title="Change Password"
                onPress={() => {}}
                titleStyle={{ fontSize: 16, fontFamily: "open-sans-bold" }}
                left={() => (
                  <IconButton
                    icon="textbox-password"
                    color="#1DA1F2"
                    size={30}
                    onPress={() => console.log("Pressed")}
                    style={{
                      backgroundColor: "#dbecf9",
                      borderRadius: 15,
                      marginHorizontal: 10,
                    }}
                  />
                )}
                right={() => (
                  <Feather
                    name="chevron-right"
                    size={30}
                    color="black"
                    style={{ marginHorizontal: 10, marginTop: 15 }}
                  />
                )}
              />
              <List.Item
                title="Hobbies and Interests"
                onPress={() => {}}
                titleStyle={{ fontSize: 16, fontFamily: "open-sans-bold" }}
                left={() => (
                  <IconButton
                    icon="google-fit"
                    color="#FF0000"
                    size={30}
                    onPress={() => console.log("Pressed")}
                    style={{
                      backgroundColor: "#f7dcdc",
                      borderRadius: 15,
                      marginHorizontal: 10,
                    }}
                  />
                )}
                right={() => (
                  <Feather
                    name="chevron-right"
                    size={30}
                    color="black"
                    style={{ marginHorizontal: 10, marginTop: 15 }}
                  />
                )}
              />
              <List.Item
                title="Photos"
                onPress={() => {}}
                titleStyle={{ fontSize: 16, fontFamily: "open-sans-bold" }}
                left={() => (
                  <IconButton
                    icon="image-filter"
                    color="#dbad23"
                    size={30}
                    onPress={() => console.log("Pressed")}
                    style={{
                      backgroundColor: "#f4eedc",
                      borderRadius: 15,
                      marginHorizontal: 10,
                    }}
                  />
                )}
                right={() => (
                  <Feather
                    name="chevron-right"
                    size={30}
                    color="black"
                    style={{ marginHorizontal: 10, marginTop: 15 }}
                  />
                )}
              />
              <List.Item
                title="Education / Employment"
                onPress={() => {}}
                titleStyle={{ fontSize: 16, fontFamily: "open-sans-bold" }}
                left={() => (
                  <IconButton
                    icon="account-card-details"
                    color="#e74c3c"
                    size={30}
                    onPress={() => console.log("Pressed")}
                    style={{
                      backgroundColor: "#f7e0de",
                      borderRadius: 15,
                      marginHorizontal: 10,
                    }}
                  />
                )}
                right={() => (
                  <Feather
                    name="chevron-right"
                    size={30}
                    color="black"
                    style={{ marginHorizontal: 10, marginTop: 15 }}
                  />
                )}
              />
            </List.Section>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  autherAvatar: {
    backgroundColor: Colors.background,
  },
  commentAvatar: {
    backgroundColor: Colors.background,
  },
  input: {
    width: "100%",
    height: 40,
    color: "black",
  },
  header: {
    flex: 3.5,
  },
  footer: {
    flex: Platform.OS === "ios" ? 6 : 6,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // paddingHorizontal: 15,
    paddingBottom: 20,
    paddingTop: 3,
    marginTop: -25,
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
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: Colors.background,
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

export default BlogDetail;
