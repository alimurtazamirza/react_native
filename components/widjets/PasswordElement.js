import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import ErrorMsg from "./ErrorMsg";
import { Feather } from "@expo/vector-icons";
import { useFormikContext } from "formik";

function PasswordElement({
  name,
  labelText,
  iconName,
  placeholderText,
  icon = false,
  margin = 30,
  secureTextEntry = true,
  updateSecureTextEntry,
  ...otherProps
}) {
  const { errors, handleChange, setFieldTouched, touched } = useFormikContext();
  return (
    <View>
      <Text
        style={[
          styles.text_footer,
          {
            marginTop: margin,
          },
        ]}
      >
        {labelText}
      </Text>
      <View style={styles.action}>
        {icon && <Feather name={iconName} color="#05375a" size={20} />}
        <TextInput
          placeholder={placeholderText}
          style={styles.textInput}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          onChangeText={handleChange(name)}
          onBlur={() => setFieldTouched(name)}
          {...otherProps}
        />
        <TouchableOpacity onPress={updateSecureTextEntry}>
          {secureTextEntry ? (
            <Feather
              name="eye-off"
              color="grey"
              size={20}
              style={{ marginRight: 13 }}
            />
          ) : (
            <Feather
              name="eye"
              color="grey"
              size={20}
              style={{ marginRight: 13 }}
            />
          )}
        </TouchableOpacity>
      </View>
      <ErrorMsg error={errors[name]} visible={touched[name]} />
    </View>
  );
}

const styles = StyleSheet.create({
  text_footer: {
    color: "#05375a",
    fontSize: 20,
    fontFamily: "open-sans",
  },
  action: {
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

export default PasswordElement;
