import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import LottieView from "lottie-react-native";

function LoadingScreen({ visible = false }) {
  if (!visible) return null;
  return (
    <Modal visible={visible} statusBarTranslucent={true}>
      <View style={styles.container}>
        <LottieView
          autoPlay={true}
          loop={true}
          style={{ width: 300 }}
          source={require("../../assets/loading.json")}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoadingScreen;
