import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Colors from "../../constants/Colors";

const GradientButton = ({ onClick, Requesting, height, text }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      disabled={Requesting}
      style={[styles.signIn, { height: height > 0 ? height : 50 }]}
    >
      {!Requesting ? (
        <Text style={styles.textSign}>{text}</Text>
      ) : (
        <ActivityIndicator
          animating={Requesting}
          color={Colors.accent}
          size="large"
        />
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: Colors.accent,
    borderWidth: 1,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    color: Colors.accent,
  },
});
export default GradientButton;
