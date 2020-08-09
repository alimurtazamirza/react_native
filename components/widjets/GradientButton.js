import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const GradientButton = (props) => {
  return (
    <TouchableOpacity
      style={[styles.signIn, { height: props.height > 0 ? props.height : 50 }]}
      onPress={props.onClick}
      disabled={props.Requesting}
    >
      <LinearGradient
        colors={props.gradient}
        style={[
          styles.signIn,
          { height: props.height > 0 ? props.height : 50 },
        ]}
      >
        {!props.Requesting ? (
          <Text
            style={[
              styles.textSign,
              {
                color: "#fff",
                padding: 10,
              },
            ]}
          >
            {props.text}
          </Text>
        ) : (
          <ActivityIndicator
            animating={props.Requesting}
            color="white"
            size="large"
          />
        )}
      </LinearGradient>
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
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default GradientButton;
