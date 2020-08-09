import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import ErrorMsg from "./ErrorMsg";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useFormikContext } from "formik";
import * as Animatable from "react-native-animatable";

function TextElement({
  name,
  labelText,
  iconName,
  placeholderText,
  ...otherProps
}) {
  const { errors, handleChange, setFieldTouched, touched } = useFormikContext();
  return (
    <View>
      <Text
        style={[
          styles.text_footer,
          {
            marginTop: 10,
          },
        ]}
      >
        {labelText}
      </Text>
      <View style={styles.action}>
        {/* <FontAwesome name={iconName} color="#05375a" size={20} /> */}
        <TextInput
          placeholder={placeholderText}
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={handleChange(name)}
          onBlur={() => setFieldTouched(name)}
          {...otherProps}
        />
        {touched[name] && typeof errors[name] == "undefined" ? (
          <Animatable.View animation="bounceIn">
            <Feather
              name="check-circle"
              color="green"
              size={20}
              style={{ marginRight: 15 }}
            />
          </Animatable.View>
        ) : null}
      </View>
      <ErrorMsg error={errors[name]} visible={touched[name]} />
    </View>
  );
}

const styles = StyleSheet.create({
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -5,
    paddingLeft: 10,
    color: "#05375a",
  },
});

export default TextElement;
