import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
  Text,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";


const { width, height } = Dimensions.get("window");

function PhotosPicker({ imageUri, onchangeImage }) {
  const locale = useSelector((state) => state.translation);
  useEffect(() => {
    requestPermission();
  }, []);
  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (!granted) alert(locale.permisson_gallery);
  };
  const handlePress = () => {
    if (!imageUri) SelectImage();
    else
      Alert.alert(locale.Post_delete, locale.delete_image, [
        { text: locale.yes, onPress: () => onchangeImage(null) },
        { text: locale.no },
      ]);
  };
  const SelectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });
      if (!result.cancelled) onchangeImage(result.uri);
    } catch (error) {
      console.log(locale.error_image, error);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={!imageUri ? styles.picker : styles.container}>
        {!imageUri && (
          <>
            <MaterialCommunityIcons
              color={Colors.primary}
              name="camera"
              size={30}
            />
            <Text>{locale.add_image}</Text>
          </>
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    height: width * 0.455,
    overflow: "hidden",
    width: width * 0.455,
  },
  picker: {
    backgroundColor: "#eee",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    marginHorizontal: 0,
    marginVertical: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: "#eee",
  },
});

export default PhotosPicker;
