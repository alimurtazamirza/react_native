import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const GradientButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onClick}
      disabled={props.Requesting}
      style={[styles.signIn, { height: props.height > 0 ? props.height : 50 }]}
    >
      <Text style={styles.textSign}>{props.text}</Text>
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
