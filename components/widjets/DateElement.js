import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { IconButton } from "react-native-paper";
import { useFormikContext } from "formik";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ErrorMsg from "./ErrorMsg";
import Colors from "../../constants/Colors";
import moment from "moment";

function DateElement({ name, labelText, margin = 10 }) {
  const { errors, values, setFieldValue, touched } = useFormikContext();
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
    <>
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
        <TextInput
          placeholder="Your Date of Birth"
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          editable={false}
          value={values[name]}
        />
        <IconButton
          icon="calendar"
          color={Colors.primary}
          size={30}
          onPress={showDatePicker}
          style={styles.iconStyle}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={values[name] == "" ? new Date() : new Date(values[name])}
          onConfirm={(date) => {
            hideDatePicker();
            let newDate = moment(date).format("YYYY-MM-DD");
            setFieldValue(name, newDate);
          }}
          onCancel={hideDatePicker}
        />
      </View>
      <ErrorMsg error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -5,
    paddingLeft: 8,
  },
  iconStyle: {
    position: "absolute",
    marginHorizontal: 5,
    right: -5,
    bottom: -5,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 20,
    fontFamily: "open-sans",
  },
  action: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 5,
  },
});

export default DateElement;
