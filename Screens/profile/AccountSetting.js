import React from "react";
import { View, Text, Platform, StyleSheet, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";
import { FontAwesome, Feather } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { Formik } from "formik";
import * as yup from "yup";

import GradientButton from "../../components/widjets/GradientButton";
import StatusBarComponent from "../../components/widjets/StatusBarComponent";
import ErrorMsg from "../../components/widjets/ErrorMsg";

let validationSchema = yup.object().shape({
  see_profile: yup.string().required().label("Profile"),
  see_friends: yup.string().required().label("Friends"),
  see_images: yup.string().required().label("Images"),
});
function PersonalSetting({ navigation }) {
  const [isRequesting, setIsRequesting] = React.useState(false);

  return (
    <View style={styles.container}>
      <StatusBarComponent theme="light" backgound="transparent" />
      <View style={styles.header}></View>
      <Animatable.View
        animation="fadeInUpBig"
        duration={800}
        style={styles.footer}
      >
        <ScrollView>
          <Formik
            initialValues={{
              see_profile: "1",
              see_friends: "1",
              see_images: "1",
            }}
            onSubmit={(values) => console.log(values)}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleSubmit,
              errors,
              values,
              setFieldTouched,
              touched,
            }) => (
              <>
                <Text
                  style={[
                    styles.text_footer,
                    {
                      marginTop: 15,
                    },
                  ]}
                >
                  Who can see my profile
                </Text>
                <View
                  style={{ borderBottomWidth: 1, borderBottomColor: "#e0e0e0" }}
                >
                  <RNPickerSelect
                    style={{ ...pickerSelectStyles }}
                    placeholder={{
                      label: "Select an Item",
                      value: "",
                    }}
                    value={values.see_profile}
                    onOpen={() => setFieldTouched("see_profile")}
                    onValueChange={handleChange("see_profile")}
                    items={[
                      { label: "Everyone", value: "1" },
                      { label: "No one", value: "2" },
                      { label: "Only Friends", value: "3" },
                      { label: "Subscribed Members", value: "4" },
                    ]}
                  />
                </View>
                <ErrorMsg
                  error={errors.see_profile}
                  visible={touched.see_profile}
                />
                <Text
                  style={[
                    styles.text_footer,
                    {
                      marginTop: 15,
                    },
                  ]}
                >
                  Who can see my Friends
                </Text>
                <View
                  style={{ borderBottomWidth: 1, borderBottomColor: "#e0e0e0" }}
                >
                  <RNPickerSelect
                    style={{ ...pickerSelectStyles }}
                    placeholder={{
                      label: "Select an Item",
                      value: "",
                    }}
                    value={values.see_friends}
                    onValueChange={handleChange("see_friends")}
                    onOpen={() => setFieldTouched("see_friends")}
                    items={[
                      { label: "Everyone", value: "1" },
                      { label: "No one", value: "2" },
                      { label: "Only Friends", value: "3" },
                      { label: "Subscribed Members", value: "4" },
                    ]}
                  />
                </View>
                <ErrorMsg
                  error={errors.see_friends}
                  visible={touched.see_friends}
                />
                <Text
                  style={[
                    styles.text_footer,
                    {
                      marginTop: 15,
                    },
                  ]}
                >
                  Who can see my Images
                </Text>
                <View
                  style={{ borderBottomWidth: 1, borderBottomColor: "#e0e0e0" }}
                >
                  <RNPickerSelect
                    style={{ ...pickerSelectStyles }}
                    placeholder={{
                      label: "Select an Item",
                      value: "",
                    }}
                    value={values.see_images}
                    onValueChange={handleChange("see_images")}
                    onOpen={() => setFieldTouched("see_images")}
                    items={[
                      { label: "Everyone", value: "1" },
                      { label: "No one", value: "2" },
                      { label: "Only Friends", value: "3" },
                      { label: "Subscribed Members", value: "4" },
                    ]}
                  />
                </View>
                <ErrorMsg
                  error={errors.see_images}
                  visible={touched.see_images}
                />
                <View style={styles.button}>
                  <GradientButton
                    onClick={handleSubmit}
                    Requesting={isRequesting}
                    text="Sign Up"
                    gradient={["#848484", "#334249"]}
                  />
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#334249",
  },
  header: {
    flex: 0.7,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  footer: {
    flex: Platform.OS === "ios" ? 9 : 9,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderWidth: 1,
    borderTopWidth: 7,
    borderLeftColor: "#e74c3c",
    borderRightColor: "#e74c3c",
    borderTopColor: "#e74c3c",
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  inputpicker: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
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
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
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
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
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

export default PersonalSetting;
