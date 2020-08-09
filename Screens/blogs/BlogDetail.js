import React from "react";
import {
  View,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Headline,
  Subheading,
  Paragraph,
  Title,
  Avatar,
  Caption,
} from "react-native-paper";

import StatusBarComponent from "../../components/widjets/StatusBarComponent";
import Colors from "../../constants/Colors";

const BlogDetail = (props) => {
  const title = props.route.params.title;
  const [data, setData] = React.useState({
    username: "",
    password: "",
    confirm_password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });
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
            source={{ uri: "https://picsum.photos/600" }}
            style={styles.image}
          ></ImageBackground>
        </View>
      </View>
      <View
        // animation="flipInY"
        style={styles.footer}
      >
        <ScrollView>
          <Headline
            style={{
              fontFamily: "open-sans-bold",
              fontSize: 35,
              paddingTop: 15,
            }}
          >
            {title}
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
              {" 03 Sep, 2016 "}|{" Dating"}
            </Subheading>
          </View>
          <View>
            <View style={{ flexDirection: "row" }}>
              <Avatar.Image
                size={50}
                source={{ uri: "https://placebeard.it/640x360" }}
                style={styles.autherAvatar}
              />
              <Title
                style={{
                  paddingHorizontal: 10,
                  fontFamily: "open-sans-bold",
                  paddingTop: 7,
                }}
              >
                Muhammad Ali
              </Title>
            </View>
          </View>
          <Paragraph
            style={{
              fontFamily: "open-sans",
              fontSize: 15,
              paddingVertical: 10,
            }}
          >
            But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system, and expound the actual teachings of the great
            explorer of the truth, the master-builder of human happiness. No one
            rejects, dislikes, or avoids pleasure itself, because it is
            pleasure, but because those who do not know how to pursue pleasure
            rationally encounter consequences that are extremely painful.
          </Paragraph>
          <Paragraph
            style={{
              fontFamily: "open-sans",
              fontSize: 15,
              paddingVertical: 10,
            }}
          >
            Nor again is there anyone who loves or pursues or desires to obtain
            pain of itself, because it is pain, but because occasionally
            circumstances occur in which toil and pain can procure him some
            great pleasure. To take a trivial example, which of us ever
            undertakes laborious physical exercise, except to obtain some
            advantage from it? But who has any right to find fault with a man
            who chooses to enjoy a pleasure that has no annoying consequences,
            or one who avoids a pain that produces no resultant pleasure?"Nor
            again is there anyone who loves or pursues or desires to obtain pain
            of itself, because it is pain, except to obtain some advantage from
            it?
          </Paragraph>
          <View
            style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
          >
            <View
              style={{
                backgroundColor: Colors.accent,
                height: 30,
                width: "90%",
                borderRadius: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Subheading
                style={{ fontFamily: "open-sans-bold", color: "white" }}
              >
                Comments
              </Subheading>
            </View>
          </View>
          <View style={{ marginVertical: 20 }}>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Avatar.Image
                size={40}
                source={{ uri: "https://placebeard.it/540x360" }}
                style={styles.commentAvatar}
              />
              <View style={{ flex: 1, flexDirection: "column" }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Paragraph
                    style={{ paddingLeft: 4, fontFamily: "open-sans-bold" }}
                  >
                    Muhammad Ali
                  </Paragraph>
                  <View style={{ paddingHorizontal: 1 }}>
                    <Caption>Sep 14, 2020 at 11:00 am</Caption>
                  </View>
                </View>
                <Paragraph style={{ paddingLeft: 4, fontFamily: "open-sans" }}>
                  But I must explain to you how all this mistaken idea of
                  denouncing pleasure and praising pain was born
                </Paragraph>
                {/* <View style={{flexDirection:"row",justifyContent:"flex-end"}}>
                            <Button icon="reply" mode="text" onPress={() => console.log('Pressed')}>
                                reply
                            </Button>
                        </View> */}
              </View>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Avatar.Image
                size={40}
                source={{ uri: "https://placebeard.it/440x360" }}
                style={styles.commentAvatar}
              />
              <View style={{ flex: 1, flexDirection: "column" }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Paragraph
                    style={{ paddingLeft: 4, fontFamily: "open-sans-bold" }}
                  >
                    Muhammad Ali
                  </Paragraph>
                  <View style={{ paddingHorizontal: 1 }}>
                    <Caption>Sep 14, 2020 at 11:00 am</Caption>
                  </View>
                </View>
                <Paragraph style={{ paddingLeft: 4, fontFamily: "open-sans" }}>
                  expound the actual teachings of the great explorer of the
                  truth, the master-builder of human happiness..
                </Paragraph>
                {/* <View style={{flexDirection:"row",justifyContent:"flex-end"}}>
                            <Button icon="reply" mode="text" onPress={() => console.log('Pressed')}>
                                reply
                            </Button>
                        </View> */}
              </View>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Avatar.Image
                size={40}
                source={{ uri: "https://placebeard.it/660x360" }}
                style={styles.commentAvatar}
              />
              <View style={{ flex: 1, flexDirection: "column" }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Paragraph
                    style={{ paddingLeft: 4, fontFamily: "open-sans-bold" }}
                  >
                    Muhammad Ali
                  </Paragraph>
                  <View style={{ paddingHorizontal: 1 }}>
                    <Caption>Sep 14, 2020 at 11:00 am</Caption>
                  </View>
                </View>
                <Paragraph style={{ paddingLeft: 4, fontFamily: "open-sans" }}>
                  great explorer of the truth, the master-builder of human
                  happiness.
                </Paragraph>
                {/* <View style={{flexDirection:"row",justifyContent:"flex-end"}}>
                            <Button icon="reply" mode="text" onPress={() => console.log('Pressed')}>
                                reply
                            </Button>
                        </View> */}
              </View>
            </View>
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Write a Comment"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
            />
            <View>
              <Ionicons name="md-send" color={Colors.accent} size={30} />
            </View>
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
    flex: 3,
  },
  footer: {
    flex: Platform.OS === "ios" ? 6 : 6,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 15,
    paddingBottom: 20,
    paddingTop: 3,
    marginTop: -40,
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
