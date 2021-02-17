import React, { useState } from "react";
import {
  View,
  TextInput,
  Platform,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import {
  Headline,
  Subheading,
  Paragraph,
  Title,
  Avatar,
  Caption,
  ActivityIndicator,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import AutoHeightWebView from "react-native-autoheight-webview";
import { useSelector, useDispatch } from "react-redux";
import StatusBarComponent from "../../components/widjets/StatusBarComponent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BlogApi from "../../api/Blog";
import Colors from "../../constants/Colors";
import {
  apiLikedBlogs,
  apiCommentBlogs,
  apiCommentDelete,
} from "../../redux/action/Blog";
import moment from "moment";
import { array } from "yup";

const BlogDetail = (props) => {
  const { id, dataMaster } = props.route.params;
  const [text, setText] = useState("");
  // const [heightWeb, setHeightWeb] = useState(350);
  const [animating, setAnimating] = useState(false);
  const dispatch = useDispatch();
  const blogData = useSelector((state) => state.blog);
  const locale = useSelector((state) => state.translation);
  const { user, profileImages } = useSelector((state) => state.auth);
  let blog;
  if (dataMaster == "user") {
    blog = blogData.user_blog.find((data) => data.id == id);
  } else if (dataMaster == "account") {
    blog = blogData.account_blog.find((data) => data.id == id);
  } else {
    blog = blogData.blog.find((data) => data.id == id);
  }

  const [liked, setLiked] = useState(blog.liked);

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

  const onWebViewMessage = (event = WebViewMessageEvent) => {
    // console.log(event.nativeEvent.data);
    setHeightWeb(Number(event.nativeEvent.data));
  };

  const likedBlog = async () => {
    dispatch(apiLikedBlogs(blog.id, !liked, dataMaster));
    let likestatus = liked;
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
    }
    const response = await BlogApi.likeBlog(blog.id, user.id, !likestatus);
  };

  const addComment = async () => {
    if (text != "") {
      setAnimating(true);
      const response = await BlogApi.commentBlog(blog.id, user.id, text);
      setAnimating(false);
      if (!response.ok) {
        return console.log(response.data);
      }
      let result = response.data.data;
      dispatch(
        apiCommentBlogs(
          {
            blog_id: result.blog_id,
            created_at: result.created_at,
            description: result.description,
            dp: profileImages[0].uri,
            id: result.id,
            name: user.name,
            updated_at: result.updated_at,
            user_id: user.id,
          },
          blog.id,
          dataMaster
        )
      );
      setText("");
    }
  };

  const deleteComment = async (id) => {
    dispatch(apiCommentDelete(blog.id, id, dataMaster));
    const response = await BlogApi.deletcomment(id);
  };

  const renderItem = () => {
    let i = 0;
    let arrayObjects = [];
    for (const iterator of blog.comments_all) {
      arrayObjects[i] = (
        <View
          style={{ flexDirection: "row", marginBottom: 10 }}
          key={iterator.id}
        >
          <Avatar.Image
            size={40}
            source={{ uri: iterator.dp }}
            style={styles.commentAvatar}
          />
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Paragraph style={{ paddingLeft: 4, fontFamily: "open-sans-bold" }}>
              {iterator.name}
            </Paragraph>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Paragraph
                style={{ paddingLeft: 4, fontFamily: "open-sans", flex: 4 }}
              >
                {iterator.description}
              </Paragraph>
              <View>
                {(blog.user_id == user.id || iterator.user_id == user.id) && (
                  <Ionicons
                    name="ios-trash"
                    size={30}
                    color="red"
                    style={{ width: 20, flex: 2 }}
                    onPress={() => deleteComment(iterator.id)}
                  />
                )}
              </View>
            </View>
            <View>
              <Caption>
                {moment(iterator.created_at).format("DD MMM, YYYY") +
                  " at " +
                  moment(iterator.created_at).format("hh:mm a")}
              </Caption>
            </View>
          </View>
        </View>
      );
      i++;
    }
    return arrayObjects;
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
            source={{ uri: blog.path }}
            style={styles.image}
          ></ImageBackground>
        </View>
      </View>
      <View
        // animation="flipInY"
        style={styles.footer}
      >
        <KeyboardAwareScrollView
          extraScrollHeight={80}
          style={styles.scrollview}
        >
          <Headline
            style={{
              fontFamily: "open-sans-bold",
              fontSize: 25,
              paddingTop: 15,
            }}
          >
            {blog.title}
          </Headline>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 10,
            }}
          >
            <Subheading
              style={{
                fontFamily: "open-sans",
                paddingHorizontal: 2,
                fontSize: 14,
              }}
            >
              {moment(blog.date).format("DD MMM, YYYY")}|{blog.category}
            </Subheading>
          </View>
          <View>
            <View style={{ flexDirection: "row" }}>
              <Avatar.Image
                size={50}
                source={{ uri: blog.dp }}
                style={styles.autherAvatar}
              />
              <Title
                style={{
                  paddingHorizontal: 10,
                  fontFamily: "open-sans-bold",
                  paddingTop: 7,
                  fontSize: 16,
                }}
              >
                {blog.name}
              </Title>
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  top: 10,
                  width: 30,
                }}
              >
                <Ionicons
                  name={liked ? "ios-heart" : "ios-heart-empty"}
                  size={28}
                  color="red"
                  onPress={likedBlog}
                />
              </View>
            </View>
          </View>
          <View style={{ width: "100%", marginTop: 10 }}>
            {/* <WebView
              originWhitelist={["*"]}
              automaticallyAdjustContentInsets={true}
              style={{ height: heightWeb }}
              onMessage={onWebViewMessage}
              injectedJavaScript="window.ReactNativeWebView.postMessage(document.body.scrollHeight)"
              source={{
                html:
                  '<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><style type="text/css">body {margin: 0px;padding: 0px;height:200px}</style></head><body>' +
                  blog.descriptionfull +
                  "</body></html>",
              }}
            /> */}
            <AutoHeightWebView
              style={{
                width: "100%",
                marginTop: 15,
                marginBottom: 35,
                minHeight: 400,
              }}
              source={{
                html: blog.descriptionfull,
              }}
              scalesPageToFit={false}
              viewportContent={"width=device-width, user-scalable=no"}
            />
          </View>
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
                {locale.comments}
              </Subheading>
            </View>
          </View>
          <View style={{ marginVertical: 20 }}>{renderItem()}</View>
          <View style={styles.action}>
            <TextInput
              placeholder={locale.write_comment}
              style={styles.textInput}
              autoCapitalize="none"
              value={text}
              onChangeText={(val) => setText(val)}
            />
            <ActivityIndicator size="small" animating={animating} />
            <View>
              {!animating && (
                <Ionicons
                  name="md-send"
                  color={Colors.accent}
                  size={30}
                  onPress={addComment}
                />
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
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
  scrollview: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === "ios" ? 6 : 6,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
