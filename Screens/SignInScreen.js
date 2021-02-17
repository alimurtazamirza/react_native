import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import UserApi from "../api/User";
import { Formik } from "formik";
import * as yup from "yup";

import { useTheme } from "react-native-paper";

import TextElement from "../components/widjets/TextElement";
import PasswordElement from "../components/widjets/PasswordElement";
import GradientButton from "../components/widjets/GradientButton";
import OutlinedButton from "../components/widjets/OutlinedButton";
import StatusBarComponent from "../components/widjets/StatusBarComponent";
import { useDispatch } from "react-redux";
import { apiLoginUser } from "../redux/action/Auth";
import { apiChangeLanguage } from "../redux/action/Translation";
import Storage from "../redux/Storage";

let validationSchema = yup.object().shape({
  email: yup.string().required().label("Email"),
  password: yup.string().required().min(8).label("Password"),
  device_name: yup.string().required(),
});
const SignInScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [secureText, setSecureText] = useState(true);
  const [isRequesting, setIsRequesting] = React.useState(false);

  const { colors } = useTheme();

  const loginHandle = async (data) => {
    setIsRequesting(true);
    const response = await UserApi.loginUser(data);
    setIsRequesting(false);
    if (!response.ok) {
      Alert.alert("Invalid User!", "Email or Passord is Incorrect.!!", [
        { text: "Okay" },
      ]);
      return;
    }
    let UserResponse = {
      profileImages: response.data.profile_images,
      imageUris: response.data.images,
      user: response.data.user,
      token: response.data.token,
    };
    dispatch(apiLoginUser(UserResponse));
    dispatch(apiChangeLanguage(response.data.language));
    Storage.setAuthUser(JSON.stringify(UserResponse));
    // Storage.setLocale(JSON.stringify(response.data.language));
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor="#334249" barStyle="light-content" /> */}
      <StatusBarComponent theme="light" backgound="transparent" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <Formik
          initialValues={{
            email: "",
            password: "",
            device_name: "IPadpro",
          }}
          onSubmit={loginHandle}
          validationSchema={validationSchema}
        >
          {({ handleSubmit }) => (
            <>
              <TextElement
                name="email"
                labelText="Email"
                iconName="envelope-o"
                icon={true}
                placeholderText="Your Email"
              />
              <PasswordElement
                name="password"
                labelText="Password"
                iconName="lock"
                icon={true}
                placeholderText="Your Password"
                secureTextEntry={secureText}
                updateSecureTextEntry={() => setSecureText(!secureText)}
              />

              {/* <TouchableOpacity>
                <Text style={{ color: "#334249", marginTop: 15 }}>
                  Forgot password?
                </Text>
              </TouchableOpacity> */}
              <View style={styles.button}>
                <GradientButton
                  onClick={handleSubmit}
                  Requesting={isRequesting}
                  text="Sign In"
                  gradient={["#848484", "#334249"]}
                />
                <View style={{ marginTop: 15, width: "100%" }}>
                  <OutlinedButton
                    onClick={() => navigation.navigate("SignUp")}
                    Requesting={false}
                    text="Sign Up"
                    gradient={["#848484", "#334249"]}
                  />
                </View>
              </View>
            </>
          )}
        </Formik>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   backgroundColor: '#e74c3c'
    backgroundColor: "#334249",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
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
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
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
});
