import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  Dimensions,
  FlatList,
  YellowBox,
} from "react-native";
import ImageView from "react-native-image-viewing";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

YellowBox.ignoreWarnings([
  "VirtualizedLists should never be nested", // TODO: Remove when fixed
]);

const Photos = (props) => {
  const { imageUris } = props.userObj;
  // const { imageUris } = useSelector((state) => state.auth);
  const [visible, setIsVisible] = useState({ shown: false, index: 0 });
  const [source, setSource] = useState([]);
  useState(() => {
    let arrayImages = [];
    let i = 0;
    for (const iterator of imageUris) {
      arrayImages[i] = { uri: iterator.path };
      i++;
    }
    setSource(arrayImages);
  }, [imageUris]);
  const renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setIsVisible({ ...visible, shown: true, index: index });
        }}
        key={index}
      >
        <Image style={styles.galleryPics} source={{ uri: item.uri }} />
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View>
      <ImageView
        images={source}
        imageIndex={visible.index}
        visible={visible.shown}
        swipeToCloseEnabled={false}
        presentationStyle="overFullScreen"
        onRequestClose={() => setIsVisible({ ...visible, shown: false })}
      />
      <View style={{ flex: 1 }}>
        <FlatList
          data={source}
          renderItem={renderItem}
          scrollEnabled={false}
          keyExtractor={(item, index) => index}
          numColumns={3}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  galleryPics: {
    width: windowWidth / 3.5,
    height: windowWidth / 3.5,
    marginHorizontal: 3.5,
    borderRadius: 10,
    marginVertical: 5,
  },
});
export default Photos;
