import React, { useState } from "react";
import { View, Platform, StyleSheet, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";

import GradientButton from "../../components/widjets/GradientButton";
import StatusBarComponent from "../../components/widjets/StatusBarComponent";
import PasswordElement from "../../components/widjets/PasswordElement";
import UploadScreen from "../../components/widjets/UploadScreen";
import Storage from "../../redux/Storage";
import UserApi from "../../api/User";
import { apiUpdateUser } from "../../redux/action/Auth";

let validationSchema = yup.object().shape({
  old_password: yup.string().required().label("Old Password"),
  password: yup.string().required().min(8).label("Password"),
  password_confirmation: yup
    .string()
    .min(8)
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Both password need to be the same"),
    })
    .label("Password Confirmation")
    .required(),
});
function ChangePasswordSetting({ navigation }) {
  const dispatch = useDispatch();
  const [secureTextOld, setSecureTextOld] = useState(true);
  const [secureText, setSecureText] = useState(true);
  const [secureTextConfirm, setSecureTextConfirm] = useState(true);
  const [upload, setUpload] = useState(false);
  const [progress, setProgress] = useState(1);
  const [isRequesting, setIsRequesting] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const locale = useSelector((state) => state.translation);


  const submitForm = async (data) => {
    setIsRequesting(true);
    const response = await UserApi.changePassword(data);
    setIsRequesting(false);
    console.log(response);
    if (!response.ok) {
      alert(locale.something_went_wronge);
      return;
    }

    let { error, success } = response.data;
    if (success) {
      setUpload(true);
    } else {
      alert(error);
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
        onComplete={() => {
          navigation.goBack();
        }}
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
              old_password: "",
              password: "",
              password_confirmation: "",
            }}
            onSubmit={submitForm}
            validationSchema={validationSchema}
          >
            {({ handleSubmit }) => (
              <>
                <PasswordElement
                  name="old_password"
                  labelText={locale.old_pass}
                  iconName="lock"
                  icon={true}
                  margin={20}
                  placeholderText={locale.your_pass}
                  secureTextEntry={secureTextOld}
                  updateSecureTextEntry={() => setSecureTextOld(!secureTextOld)}
                />
                <PasswordElement
                  name="password"
                  labelText={locale.password}
                  iconName="lock"
                  icon={true}
                  margin={20}
                  placeholderText={locale.your_pass}
                  secureTextEntry={secureText}
                  updateSecureTextEntry={() => setSecureText(!secureText)}
                />
                <PasswordElement
                  name="password_confirmation"
                  labelText={locale.confirm_pass}
                  iconName="lock"
                  icon={true}
                  margin={20}
                  placeholderText={locale.confirm_your_pass}
                  secureTextEntry={secureTextConfirm}
                  updateSecureTextEntry={() =>
                    setSecureTextConfirm(!secureTextConfirm)
                  }
                />

                <View style={styles.button}>
                  <GradientButton
                    onClick={handleSubmit}
                    Requesting={isRequesting}
                    text={locale.account_update}
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

export default ChangePasswordSetting;
