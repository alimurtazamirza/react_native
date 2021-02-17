import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { useSelector, useDispatch } from "react-redux";
import { apiChangeAsyncData } from "../../redux/action/Notification";
import UserApi from "../../api/User";


const { width, height } = Dimensions.get("window");

function CreateSubscription(props) {
  const { id } = props.route.params;
  const { user } = useSelector((state) => state.auth);
  const locale = useSelector((state) => state.translation);
  console.log(user);
  if (id) props.navigation.setOptions({ title: "Select Package" });
  const dispatch = useDispatch();
  const url = `http://lovesetgo.com/love/package/select/${user.language}/${id}/${user.id}`;
  const webviewRef = React.useRef(null);
  const displaySpinner = () => {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#05375a" animating={true} />
      </View>
    );
  };
//   const LoadBlogs = async () => {
//     const response = await BlogApi.getBlogs("all", user.id);
//     if (!response.ok) {
//       return console.log(response.data);
//     }
//     dispatch(
//       apiGetBlogs({
//         blog: response.data.data,
//         category: response.data.category,
//       })
//     );
//   };
//   const LoadUserBlogs = async () => {
//     const response = await BlogApi.getUserBlogs(user.id);
//     if (!response.ok) {
//       return console.log(response.data);
//     }
//     dispatch(apiUserBlogs(response.data.data));
//   };
  function onMessage(data) {
    let result = JSON.parse(data.nativeEvent.data);
    if (result.success == true) {
        LoadDataFirst();
    }
  }
  const LoadDataFirst = async () => {
    const response = await UserApi.dataFirst(user.id);
    if (response.ok) {
      dispatch(apiChangeAsyncData(response.data));
    }
    // props.navigation.navigate('ChangePackageScreen');
  };
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
    alignItems: "center",
  },
});

export default CreateSubscription;
