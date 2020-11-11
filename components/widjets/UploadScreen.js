import React from "react";
import { View, StyleSheet, Text, Modal } from "react-native";
import * as Progress from "react-native-progress";
import Colors from "../../constants/Colors";
import LottieView from "lottie-react-native";

function UploadScreen({ onComplete, progress = 0, visible = false }) {
  return (
    <Modal visible={visible} statusBarTranslucent={true}>
      <View style={styles.container}>
        {progress < 1 ? (
          <Progress.Bar color={Colors.accent} progress={progress} width={220} />
        ) : (
          <LottieView
            autoPlay={true}
            loop={false}
            style={{ width: 300 }}
            onAnimationFinish={onComplete}
            source={require("../../assets/done.json")}
          />
        )}
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

export default UploadScreen;
