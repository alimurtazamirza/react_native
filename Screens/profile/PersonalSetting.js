import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";

import GradientButton from "../../components/widjets/GradientButton";
import DateElement from "../../components/widjets/DateElement";
import TextElement from "../../components/widjets/TextElement";
import PickerElement from "../../components/widjets/PickerElement";
import StatusBarComponent from "../../components/widjets/StatusBarComponent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Colors from "../../constants/Colors";

let validationSchema = yup.object().shape({
  gender: yup.string().required().label("Gender"),
  dob: yup.date().required().label("Date of Birth"),
  location: yup.string().required().label("Location"),
});

function PersonalSetting(props) {
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
        <KeyboardAwareScrollView extraScrollHeight={80}>
          <Formik
            initialValues={{
              gender: "",
              dob: "",
              location: "",
              phone: "",
              looking: "",
              marial_status: "",
              political: "",
              religion: "",
              desc: "",
              facebook: "",
              instagram: "",
              twitter: "",
              youtube: "",
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
              setFieldValue,
              touched,
            }) => (
              <>
                <PickerElement
                  name="gender"
                  labelText="Gender"
                  pickerData={[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Femle" },
                  ]}
                />
                <DateElement name="dob" labelText="Date of Birth" />
                <TextElement
                  name="location"
                  labelText="Location"
                  iconName="user-o"
                  placeholderText="You location"
                />
                <TextElement
                  name="phone"
                  labelText="Phone No"
                  iconName="phone"
                  placeholderText="Phone No"
                />
                <PickerElement
                  name="looking"
                  labelText="Wish to meet"
                  pickerData={[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Femle" },
                  ]}
                />
                <PickerElement
                  name="occupation"
                  labelText="Occupation"
                  pickerData={[
                    { label: "No Answer", value: "No Answer" },
                    { label: "Employed", value: "Employed" },
                    { label: "Self-employed", value: "Self-employed" },
                    { label: "Currently not employed", value: "Femle" },
                  ]}
                />
                <PickerElement
                  name="marial_status"
                  labelText="Martial Status"
                  pickerData={[
                    { label: "No Answer", value: "No Answer" },
                    { label: "Single", value: "Single" },
                    {
                      label: "Divorced / Separated",
                      value: "Divorced / Separated",
                    },
                    { label: "Widowed", value: "Widowed" },
                    {
                      label: "It is Complicated",
                      value: "It is Complicated",
                    },
                  ]}
                />
                <TextElement
                  name="political"
                  labelText="Political Incline"
                  iconName="object-group"
                  placeholderText="Political Incline"
                />
                <PickerElement
                  name="religion"
                  labelText="Religious Beliefs"
                  pickerData={[
                    { label: "No Answer", value: "No Answer" },
                    { label: "Islam", value: "Islam" },
                    {
                      label: "Christian",
                      value: "Christian",
                    },
                    { label: "Athiest", value: "Athiest" },
                    { label: "Jew", value: "Jew" },
                  ]}
                />
                <TextElement
                  name="desc"
                  labelText="Little Desciption about you"
                  iconName="object-group"
                  placeholderText="Description"
                  multiline={true}
                />
                <TextElement
                  name="facebook"
                  labelText="Facebook Link"
                  iconName="object-group"
                  placeholderText="Complete Facebook profile link"
                  multiline={true}
                />
                <TextElement
                  name="instagram"
                  labelText="Instagram Link"
                  iconName="object-group"
                  placeholderText="Complete Instagram profile link"
                  multiline={true}
                />
                <TextElement
                  name="twitter"
                  labelText="Twitter Link"
                  iconName="object-group"
                  placeholderText="Complete Twitter profile link"
                  multiline={true}
                />
                <TextElement
                  name="youtube"
                  labelText="Youtube Link"
                  iconName="object-group"
                  placeholderText="Complete Youtube profile link"
                  multiline={true}
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
        </KeyboardAwareScrollView>
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
  dropdown: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
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

export default PersonalSetting;
