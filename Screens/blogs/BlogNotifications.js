import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
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
  Button,
  Avatar,
  Caption,
  ActivityIndicator,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import AutoHeightWebView from "react-native-autoheight-webview";
import { useSelector } from "react-redux";
import StatusBarComponent from "../../components/widjets/StatusBarComponent";
import LoadingScreen from "../../components/widjets/LoadingScreen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BlogApi from "../../api/Blog";
import Colors from "../../constants/Colors";
import moment from "moment";

const BlogNotifications = (props) => {
  const { id, blog_id } = props.route.params;
  const [text, setText] = useState("");
  // const [heightWeb, setHeightWeb] = useState(350);
  const [animating, setAnimating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { user, profileImages } = useSelector((state) => state.auth);

  const [blog, setBlog] = useState(null);

  React.useEffect(() => {
    const parent = props.navigation.dangerouslyGetParent();
    getBlogSingle();
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

  const getBlogSingle = async () => {
    const response = await BlogApi.getSingleBlog(blog_id, id);
    if (response.ok && response.data.data != null) {
      if (error) setError(false);
    } else {
      setError(true);
    }
    setBlog(response.data.data);
    setLoading(false);
  };

  const likedBlog = async () => {
    let likestatus = blog.liked;
    if (blog.liked) {
      setBlog({ ...blog, liked: false });
    } else {
      setBlog({ ...blog, liked: true });
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
      setBlog({
        ...blog,
        comments_all: [
          ...blog.comments_all,
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
        ],
      });

      setText("");
    }
  };

  const deleteComment = async (id) => {
    const response = await BlogApi.deletcomment(id);
    let blogNew = { ...blog };
    blogNew.comments_all = blogNew.comments_all.filter(
      (comment) => comment.id != id
    );
    setBlog({ ...blog, ...blogNew });
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
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: "open-sans-bold" }}>
          Couldn't retrive the Data.
        </Text>
        <Button mode="contained" onPress={getBlogSingle}>
          Retry
        </Button>
      </View>
    );
  }
  if (blog == null) {
    if (loading) {
      return <LoadingScreen visible={loading} />;
    }
  }

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
                  name={blog.liked ? "ios-heart" : "ios-heart-empty"}
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
                Comments
              </Subheading>
            </View>
          </View>
          <View style={{ marginVertical: 20 }}>{renderItem()}</View>
          <View style={styles.action}>
            <TextInput
              placeholder="Write a Comment"
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

export default BlogNotifications;
