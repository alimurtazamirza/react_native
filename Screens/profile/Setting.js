import React, { useEffect, useState } from "react";
import {
  View,
  Platform,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { IconButton, Avatar, List } from "react-native-paper";

import StatusBarComponent from "../../components/widjets/StatusBarComponent";
import Colors from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import PhotosApi from "../../api/Photos";
import UploadScreen from "../../components/widjets/UploadScreen";
import { apiProfileChange } from "../../redux/action/Auth";
import Storage from "../../redux/Storage";
import { useSelector, useDispatch } from "react-redux";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const BlogDetail = (props) => {
  const dispatch = useDispatch();
  const [upload, setUpload] = useState(false);
  const [progress, setProgress] = useState(0);
  const { profileImages, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const parent = props.navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false,
    });
    requestPermission();
    return () =>
      parent.setOptions({
        tabBarVisible: true,
      });
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the Gallery");
  };

  const onchangeImage = async (type, uri) => {
    setProgress(0);
    setUpload(true);

    const response = await PhotosApi.addProfilePhoto(
      { user_id: user.id, image: uri, type: type },
      (progress) => setProgress(progress)
    );

    // console.log(response.data.profile_images);
    if (!response.ok) {
      setUpload(false);
      return alert("Something Went Wronge.!!");
    }
    dispatch(apiProfileChange(response.data.profile_images));
    restoreUser(response.data.profile_images);
  };

  const restoreUser = async (result) => {
    const storageUser = await Storage.getAuthUser();
    if (!storageUser) return;
    let tempUser = JSON.parse(storageUser);
    Storage.setAuthUser(JSON.stringify({ ...tempUser, profileImages: result }));
  };

  const SelectImage = async (type) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });
      if (!result.cancelled) onchangeImage(type, result.uri);
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  return (
    <View style={styles.container}>
      <UploadScreen
        onComplete={() => setUpload(false)}
        progress={progress}
        visible={upload}
      />
      {/* <StatusBarComponent theme="dark" backgound="transparent" /> */}
      <StatusBarComponent theme="light" backgound="transparent" />
      <View style={styles.header}>
        <View style={styles.container}>
          <ImageBackground
            source={{ uri: profileImages[1].uri }}
            style={styles.image}
          >
            <IconButton
              icon="camera"
              color="black"
              size={25}
              onPress={() => SelectImage("cover_pic")}
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
                  source={{ uri: profileImages[0].uri }}
                  style={{ backgroundColor: Colors.background }}
                />
                <View>
                  <IconButton
                    icon="account-edit"
                    color="black"
                    size={25}
                    onPress={() => SelectImage("dp")}
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
              {/* <List.Item
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
              /> */}
              <List.Item
                title="Change Password"
                onPress={() => {
                  props.navigation.navigate("ChangePasswordScreen");
                }}
                titleStyle={{ fontSize: 16, fontFamily: "open-sans-bold" }}
                left={() => (
                  <IconButton
                    icon="textbox-password"
                    color="#1DA1F2"
                    size={30}
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
                onPress={() => {
                  props.navigation.navigate("HobbiesScreen");
                }}
                titleStyle={{ fontSize: 16, fontFamily: "open-sans-bold" }}
                left={() => (
                  <IconButton
                    icon="google-fit"
                    color="#FF0000"
                    size={30}
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
                onPress={() => {
                  props.navigation.navigate("PhotosScreen");
                }}
                titleStyle={{ fontSize: 16, fontFamily: "open-sans-bold" }}
                left={() => (
                  <IconButton
                    icon="image-filter"
                    color="#dbad23"
                    size={30}
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
                title="Packages"
                onPress={() => {
                  props.navigation.navigate("ChangePackageScreen");
                }}
                titleStyle={{ fontSize: 16, fontFamily: "open-sans-bold" }}
                left={() => (
                  <IconButton
                    icon="package-variant"
                    color="#57963f"
                    size={30}
                    style={{
                      backgroundColor: "#dff2d7",
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
