import React, { useState } from "react";
import { View, Text, Platform, StyleSheet, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";

import GradientButton from "../../components/widjets/GradientButton";
import StatusBarComponent from "../../components/widjets/StatusBarComponent";
import PickerElement from "../../components/widjets/PickerElement";
import UploadScreen from "../../components/widjets/UploadScreen";
import Storage from "../../redux/Storage";
import UserApi from "../../api/User";
import { apiUpdateUser } from "../../redux/action/Auth";
import ErrorMsg from "../../components/widjets/ErrorMsg";

let validationSchema = yup.object().shape({
  see_profile: yup.string().required().label("Profile"),
  see_friends: yup.string().required().label("Friends"),
  see_images: yup.string().required().label("Images"),
});
function PackageSetting({ navigation }) {
  const dispatch = useDispatch();
  const [upload, setUpload] = useState(false);
  const [progress, setProgress] = useState(1);
  const [isRequesting, setIsRequesting] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const submitForm = async (data) => {
    setIsRequesting(true);
    const response = await UserApi.UpdateUser(data);
    setIsRequesting(false);
    if (!response.ok) {
      alert("Something went Wronge..!!");
      return;
    }
    setUpload(true);
    let { result, success } = response.data;
    if (success) {
      dispatch(apiUpdateUser(result));
      restoreUser(result);
    }
  };

  const restoreUser = async (result) => {
    const storageUser = await Storage.getAuthUser();
    if (!storageUser) return;
    let tempUser = JSON.parse(storageUser);
    Storage.setAuthUser(JSON.stringify({ ...tempUser, user: result }));
  };

  return (
    <View style={styles.container}>
      <UploadScreen
        onComplete={() => setUpload(false)}
        progress={progress}
        visible={upload}
      />
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
              id: user.id,
              see_profile: user.see_profile,
              see_friends: user.see_friends,
              see_images: user.see_images,
              language: user.language,
            }}
            onSubmit={submitForm}
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
                <PickerElement
                  name="see_profile"
                  labelText="Who can see my profile"
                  pickerData={[
                    { label: "Everyone", value: 1 },
                    { label: "No one", value: 2 },
                    { label: "Only Friends", value: 3 },
                    { label: "Subscribed Members", value: 4 },
                  ]}
                />
                <PickerElement
                  name="see_friends"
                  labelText="Who can see my Friends"
                  pickerData={[
                    { label: "Everyone", value: 1 },
                    { label: "No one", value: 2 },
                    { label: "Only Friends", value: 3 },
                    { label: "Subscribed Members", value: 4 },
                  ]}
                />
                <PickerElement
                  name="see_images"
                  labelText="Who can see my Images"
                  pickerData={[
                    { label: "Everyone", value: 1 },
                    { label: "No one", value: 2 },
                    { label: "Only Friends", value: 3 },
                    { label: "Subscribed Members", value: 4 },
                  ]}
                />
                <PickerElement
                  name="language"
                  labelText="Language"
                  pickerData={[
                    { label: "English", value: 1 },
                    { label: "German", value: 2 },
                    { label: "Franch", value: 3 },
                    { label: "Pakistani", value: 4 },
                  ]}
                />
                <View style={styles.button}>
                  <GradientButton
                    onClick={handleSubmit}
                    Requesting={isRequesting}
                    text="Update"
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

export default PackageSetting;
