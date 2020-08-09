import React from "react";
import { View, StyleSheet, Text } from "react-native";
import ErrorMsg from "./ErrorMsg";
import RNPickerSelect from "react-native-picker-select";
import { useFormikContext } from "formik";

function PickerElement({ name, labelText, pickerData }) {
  const {
    errors,
    handleChange,
    setFieldTouched,
    touched,
    values,
  } = useFormikContext();
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
      <View style={{ borderBottomWidth: 1, borderBottomColor: "#e0e0e0" }}>
        <RNPickerSelect
          style={{ ...pickerSelectStyles }}
          placeholder={{
            label: "Select an Item",
            value: "",
          }}
          value={values[name]}
          onOpen={() => setFieldTouched(name)}
          onValueChange={handleChange(name)}
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
    fontSize: 18,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    paddingTop: 20,
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: "white",
  },
});

export default PickerElement;
