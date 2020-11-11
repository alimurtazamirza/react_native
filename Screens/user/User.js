import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Alert,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import GradientButton from "../../components/widjets/GradientButton";
import StatusBarComponent from "../../components/widjets/StatusBarComponent";
import * as Linking from "expo-linking";
import LoadingScreen from "../../components/widjets/LoadingScreen";
import {
  Headline,
  Subheading,
  Divider,
  Title,
  Avatar,
  Button,
  Caption,
  IconButton,
  Text,
  ToggleButton,
  List,
} from "react-native-paper";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import { useSelector, useDispatch } from "react-redux";
import ImageView from "react-native-image-viewing";
import { apiChangeFriend } from "../../redux/action/Auth";
import { apiGetSelect } from "../../redux/action/Select";

import Switch from "./userSwitch";
import UserApi from "../../api/User";
import Colors from "../../constants/Colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Profile = ({ route, navigation }) => {
  const { userID } = route.params;
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);
  const AuthUser = useSelector((state) => state.auth);
  const auth = AuthUser.user;
  const [value, setValue] = useState("About");
  const [error, setError] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [visible, setIsVisible] = useState({ shown: false, index: 0 });
  const [user, setUser] = useState({});

  useEffect(() => {
    LoadUser(userID);
    // LoadSelect();
  }, []);

  // const LoadUser = async (userID) => {
  //   const response = await UserApi.getUser(userID, auth.id);
  //   if (response.ok && response.data.user != null) {
  //     dispatch(
  //       apiLoadProfileUser({
  //         profileImages: response.data.profile_images,
  //         imageUris: response.data.images,
  //         user: response.data.user,
  //         friend: response.data.friend,
  //         friends: response.data.friends,
  //         request_pending: response.data.request_pending,
  //         request_sent: response.data.request_sent,
  //         blogs: response.data.blogs,
  //       })
  //     );
  //     if (error) setError(false);
  //   } else {
  //     setError(true);
  //   }
  //   setLoading(false);
  // };

  const LoadUser = async (userID) => {
    const response = await UserApi.getUser(userID, auth.id);
    if (response.ok && response.data.user != null) {
      setUser({
        profileImages: response.data.profile_images,
        imageUris: response.data.images,
        user: response.data.user,
        friend: response.data.friend,
        friends: response.data.friends,
        request_pending: response.data.request_pending,
        request_sent: response.data.request_sent,
        blogs: response.data.blogs,
        posts: response.data.posts,
        likes: response.data.likes,
        friends_count: response.data.friends_count,
      });
      if (error) setError(false);
    } else {
      setError(true);
    }
    setLoading(false);
    setRequesting(false);
  };

  const navigationFunction = (screen, params, push = "") => {
    if (push == "push") {
      navigation.push(screen, params);
    }
    navigation.navigate(screen, params);
  };

  const requestBtn = async (option) => {
    setRequesting(true);
    if (option == "add" || option == "cancel") {
      const response = await UserApi.makeRemoveRequest({
        id: user.user.id,
        user_id: auth.id,
      });
      setRequesting(false);
      if (response.ok) {
        if (response.data.status == 1) {
          setUser({ ...user, request_sent: 1 });
        } else {
          setUser({ ...user, request_sent: 0 });
        }
      }
    } else if (option == "accept") {
      const response = await UserApi.acceptRequest({
        id: user.user.id,
        user_id: auth.id,
      });
      if (response.ok) {
        if (response.data.status == 1) {
          return LoadUser(user.user.id);
        }
      }
      setRequesting(false);
    } else if (option == "remove") {
      const response = await UserApi.removeRequest({
        id: user.user.id,
        user_id: auth.id,
      });
      if (response.ok) {
        if (response.data.status == 1) {
          return LoadUser(user.user.id);
        }
      }
      setRequesting(false);
    } else {
      setRequesting(false);
    }
  };

  const LoadSelect = async () => {
    const response = await UserApi.loadSelect();
    if (response.ok) {
      dispatch(apiGetSelect(response.data));
    } else {
      console.log("Error ");
    }
  };

  let button;
  if (user.friend > 0) {
    button = (
      <GradientButton
        onClick={() => {
          requestBtn("remove");
        }}
        Requesting={requesting}
        text="Remove Friend"
        gradient={["#ef8575", Colors.accent]}
      />
    );
  } else if (user.request_pending > 0) {
    button = (
      <GradientButton
        onClick={() => {
          requestBtn("accept");
        }}
        Requesting={requesting}
        text="Accept Request"
        gradient={["#ef8575", Colors.accent]}
      />
    );
  } else if (user.request_sent > 0) {
    button = (
      <GradientButton
        onClick={() => {
          requestBtn("cancel");
        }}
        Requesting={requesting}
        text="Cancel Request"
        gradient={["#ef8575", Colors.accent]}
      />
    );
  } else {
    button = (
      <GradientButton
        onClick={() => {
          requestBtn("add");
        }}
        Requesting={requesting}
        text="Add Friend"
        gradient={["#ef8575", Colors.accent]}
      />
    );
  }

  const toggleButtonChanger = (value) => {
    if (value) {
      setValue(value);
    }
  };
  const navigationScreen = () => {
    bs.current.snapTo(1);
  };
  const renderContent = () => (
    <View style={styles.panel}>
      <List.Section>
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
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: "open-sans-bold" }}>
          Couldn't retrive the Data.
        </Text>
        <Button mode="contained" onPress={LoadUser}>
          Retry
        </Button>
      </View>
    );
  }
  if (loading) {
    return <LoadingScreen visible={loading} />;
  }
  return (
    <View style={styles.container}>
      <ImageView
        images={user.profileImages}
        imageIndex={visible.index}
        visible={visible.shown}
        swipeToCloseEnabled={false}
        presentationStyle="overFullScreen"
        onRequestClose={() => setIsVisible({ ...visible, shown: false })}
      />
      <StatusBarComponent theme="light" backgound="transparent" />
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
      <ScrollView nestedScrollEnabled={true}>
        <Animated.View
          // animation="flipInX"
          style={styles.header}
        >
          <View style={styles.container}>
            <ImageBackground
              source={
                user.profileImages[1].uri == ""
                  ? null
                  : { uri: user.profileImages[1].uri }
              }
              style={styles.image}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  setIsVisible({ ...visible, shown: true, index: 0 });
                }}
                style={{ flex: 1 }}
              ></TouchableWithoutFeedback>
            </ImageBackground>
          </View>
        </Animated.View>
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
              <TouchableWithoutFeedback
                onPress={() => {
                  setIsVisible({ ...visible, shown: true, index: 0 });
                }}
              >
                <Avatar.Image
                  size={windowWidth / 2.3}
                  source={
                    user.profileImages[0].uri == ""
                      ? null
                      : { uri: user.profileImages[0].uri }
                  }
                  style={{ backgroundColor: Colors.background }}
                />
              </TouchableWithoutFeedback>
            </View>
            <Headline
              style={{
                fontFamily: "open-sans-bold",
                fontSize: 34,
                paddingTop: 15,
                textTransform: "capitalize",
              }}
            >
              {user.user.name}
            </Headline>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 10,
              }}
            >
              <Subheading
                style={{ fontFamily: "open-sans", paddingHorizontal: 2 }}
              >
                {user.user.age + " years Old "}|
                {user.user.state + ", " + user.user.country}
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
                onPress={async () => {
                  if (user.user.facebook) {
                    const supported = await Linking.canOpenURL(
                      user.user.facebook
                    );
                    if (supported) {
                      await Linking.openURL(user.user.facebook);
                    } else {
                      Alert.alert(
                        `Don't know how to open this URL: ${user.user.facebook}`
                      );
                    }
                  }
                }}
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
                onPress={async () => {
                  if (user.user.instagram) {
                    const supported = await Linking.canOpenURL(
                      user.user.instagram
                    );
                    if (supported) {
                      await Linking.openURL(user.user.instagram);
                    } else {
                      Alert.alert(
                        `Don't know how to open this URL: ${user.user.instagram}`
                      );
                    }
                  }
                }}
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
                onPress={async () => {
                  if (user.user.twitter) {
                    const supported = await Linking.canOpenURL(
                      user.user.twitter
                    );
                    if (supported) {
                      await Linking.openURL(user.user.twitter);
                    } else {
                      Alert.alert(
                        `Don't know how to open this URL: ${user.user.twitter}`
                      );
                    }
                  }
                }}
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
                onPress={async () => {
                  if (user.user.youtube) {
                    const supported = await Linking.canOpenURL(
                      user.user.youtube
                    );
                    if (supported) {
                      await Linking.openURL(user.user.youtube);
                    } else {
                      Alert.alert(
                        `Don't know how to open this URL: ${user.user.youtube}`
                      );
                    }
                  }
                }}
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
                {user.posts}
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
                {user.friends_count}
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
                {user.likes}
              </Title>
              <Caption style={{ fontFamily: "open-sans", fontSize: 20 }}>
                Likes
              </Caption>
            </View>
            {/* <View style={{ alignItems: "center" }}>
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
            </View> */}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <View style={{ flex: 1.1, paddingHorizontal: 5 }}>{button}</View>
            <View style={{ flex: 1, paddingHorizontal: 5 }}>
              <TouchableOpacity
                onPress={() => {
                  let header;
                  if (auth.id > user.user.id) {
                    header = user.user.id + "_" + auth.id;
                  } else {
                    header = auth.id + "_" + user.user.id;
                  }
                  navigation.navigate("userChatDetailScreen", {
                    itemId: user.user.id,
                    title: user.user.name,
                    header: header,
                    dp: user.user.dp,
                  });
                }}
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
            <Switch
              currentState={value}
              user={user}
              onNavigation={navigationFunction}
            />
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
