import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Platform,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
import PhotosPicker from "../../components/widjets/PhotosPicker";
import UploadScreen from "../../components/widjets/UploadScreen";
import PhotosApi from "../../api/Photos";
import StatusBarComponent from "../../components/widjets/StatusBarComponent";
import { useSelector, useDispatch } from "react-redux";
import { apiPhotoChange, apiPhotoDelete } from "../../redux/action/Auth";

const { width, height } = Dimensions.get("window");
function PhotosSetting(props) {
  const dispatch = useDispatch();
  const { user, imageUris } = useSelector((state) => state.auth);
  const locale = useSelector((state) => state.translation);
  const flatList = useRef();
  const [requesting, setRequesting] = useState(false);
  const [upload, setUpload] = useState(false);
  const [progress, setProgress] = useState(0);
  // useEffect(() => {
  //   LoadPhotos();
  // }, []);

  // const LoadPhotos = async () => {
  //   const response = await PhotosApi.getPhotos(user.id);
  //   if (response.ok) setImmageUris(response.data);
  //   setRequesting(false);
  // };
  const onAddImage = async (uri) => {
    setProgress(0);
    setUpload(true);
    const response = await PhotosApi.addPhoto(
      { user_id: user.id, image: uri },
      (progress) => setProgress(progress)
    );
    console.log(response);
    if (!response.ok) {
      setUpload(false);
      if(response.status == 401){
        return alert("You are not allowed to upload the pictures");
      }
      return alert(locale.something_went_wronge);
    }
    dispatch(apiPhotoChange(response.data));
    // setImmageUris([...imageUris, { path: response.data.data }]);
  };
  const onRemoveImage = async (id, uri) => {
    setProgress(1);
    setUpload(true);
    const response = await PhotosApi.deletePhoto(id, user.id);
    if (response.ok && response.data.length)
      dispatch(apiPhotoDelete(response.data));

    // setImageUris(imageUris.filter((imageUri) => imageUri.path !== uri));
  };

  const renderItem = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          padding: 5,
        }}
      >
        <PhotosPicker
          imageUri={item.path}
          onchangeImage={() => onRemoveImage(item.id, item.path)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <UploadScreen
        onComplete={() => setUpload(false)}
        progress={progress}
        visible={upload}
      />
      <StatusBarComponent theme="light" backgound="transparent" />
      <View style={styles.header}></View>
      <Animatable.View
        animation="fadeInUpBig"
        duration={800}
        style={styles.footer}
      >
        {requesting ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator
              animating={requesting}
              color="#334249"
              size="large"
            />
          </View>
        ) : (
          <View style={{ flex: 1, flexDirection: "column" }}>
            <View style={{ height: "85%" }}>
              <FlatList
                data={imageUris}
                ref={flatList}
                renderItem={renderItem}
                onContentSizeChange={() => flatList.current.scrollToEnd()}
                keyExtractor={(item, index) => index}
                numColumns={2}
              />
            </View>
            <View
              style={{ position: "absolute", width: width * 0.96, bottom: 0 }}
            >
              <PhotosPicker onchangeImage={(uri) => onAddImage(uri)} />
            </View>
          </View>
        )}
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#334249",
  },
  header: {
    flex: 0.7,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === "ios" ? 9 : 9,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 5,
    paddingTop: 10,
    borderWidth: 1,
    borderTopWidth: 7,
    borderLeftColor: "#e74c3c",
    borderRightColor: "#e74c3c",
    borderTopColor: "#e74c3c",
  },
});

export default PhotosSetting;
