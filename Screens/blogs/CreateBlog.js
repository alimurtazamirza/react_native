import React from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import BlogApi from "../../api/Blog";
import { apiGetBlogs, apiUserBlogs } from "../../redux/action/Blog";
import { useSelector, useDispatch } from "react-redux";

const { width, height } = Dimensions.get("window");

function CreateBlog(props) {
  const { id } = props.route.params;
  if (id) props.navigation.setOptions({ title: "Update" });
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const url = !id
    ? "http://lovesetgo.com/love/blog/create"
    : "http://lovesetgo.com/love/blog/api_edit/" + id;
  const webviewRef = React.useRef(null);
  const displaySpinner = () => {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#05375a" animating={true} />
      </View>
    );
  };
  const LoadBlogs = async () => {
    const response = await BlogApi.getBlogs("all", user.id);
    if (!response.ok) {
      return console.log(response.data);
    }
    dispatch(
      apiGetBlogs({
        blog: response.data.data,
        category: response.data.category,
      })
    );
  };
  const LoadUserBlogs = async () => {
    const response = await BlogApi.getUserBlogs(user.id);
    if (!response.ok) {
      return console.log(response.data);
    }
    dispatch(apiUserBlogs(response.data.data));
  };
  function onMessage(data) {
    let result = JSON.parse(data.nativeEvent.data);
    if (result.success == true) {
      !id ? LoadBlogs() : LoadUserBlogs;
    }
  }
  let jsCode = `document.querySelector('#user_id').value= ${user.id};`;
  return (
    <View style={styles.container}>
      <WebView
        startInLoadingState={true}
        automaticallyAdjustContentInsets={false}
        ref={webviewRef}
        source={{ uri: url }}
        injectedJavaScript={jsCode}
        javaScriptEnabledAndroid={true}
        onMessage={onMessage}
        renderLoading={() => {
          return displaySpinner();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height * 0.9,
    width: width,
  },
  center: {
    flex: 1,
    justifyContent: "center",
  },
});

export default CreateBlog;
