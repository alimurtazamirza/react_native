import React from "react";
import { View, StyleSheet, Text } from "react-native";
import ErrorMsg from "./ErrorMsg";
import RNPickerSelect from "react-native-picker-select";
import { useFormikContext } from "formik";

function PickerElement({ name, labelText, pickerData, margin = 10 }) {
  const {
    errors,
    setFieldTouched,
    touched,
    setFieldValue,
    values,
  } = useFormikContext();
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
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#e0e0e0",
          marginTop: -10,
        }}
      >
        <RNPickerSelect
          style={{ ...pickerSelectStyles }}
          placeholder={{
            label: "Select an Item",
            value: "",
          }}
          value={parseInt(values[name], 10)}
          onOpen={() => setFieldTouched(name)}
          // onValueChange={handleChange(name)}
          onValueChange={(value) => setFieldValue(name, value)}
          items={pickerData}
        />
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
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginTop: 10,
    backgroundColor: "white",
  },
});

export default PickerElement;
