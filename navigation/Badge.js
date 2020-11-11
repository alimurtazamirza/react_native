import React from "react";
import { Text, StyleSheet } from "react-native";

function Badge({ number = 0 }) {
  return number > 0 ? <Text style={styles.container}>{number}</Text> : null;
}

const styles = StyleSheet.create({
  container: {
    color: "#fff",
    position: "absolute",
    top: 3,
    right: 13,
    margin: -1,
    minWidth: 18,
    height: 18,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF0000",
    textAlign: "center",
    fontSize: 12,
    padding: 1,
  },
});

export default Badge;
