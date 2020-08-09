import React from "react";
import { Text, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { FontAwesome, Feather } from "@expo/vector-icons";

function ErrorMsg({ error, visible }) {
  if (!visible || !error) return null;
  return (
    <Animatable.View animation="fadeInLeft" duration={500}>
      <Text style={styles.errorMsg}>{error}</Text>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  errorMsg: {
    color: "#FF0000",
    marginTop: 2,
    fontSize: 14,
  },
});

export default ErrorMsg;
