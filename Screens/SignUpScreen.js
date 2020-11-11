import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import UserApi from "../api/User";
import * as Location from "expo-location";
import { Formik } from "formik";
import * as yup from "yup";

import TextElement from "../components/widjets/TextElement";
import PickerElement from "../components/widjets/PickerElement";
import PasswordElement from "../components/widjets/PasswordElement";
import DateElement from "../components/widjets/DateElement";
import ErrorMsg from "../components/widjets/ErrorMsg";
import SearchElement from "../components/widjets/SearchElement";
import GradientButton from "../components/widjets/GradientButton";
import OutlinedButton from "../components/widjets/OutlinedButton";
import Colors from "../constants/Colors";

let validationSchema = yup.object().shape({
  name: yup.string().required().label("Name"),
  email: yup.string().required().label("Email"),
  latlong: yup.string().required("Please Select The Location After Searching"),
  location: yup.string().required().label("Location"),
  gender: yup.number().required().label("Gender"),
  dob: yup.string().required().label("Date of Birthday"),
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

const SignUpScreen = ({ navigation }) => {
  const [secureText, setSecureText] = useState(true);
  const [secureTextConfirm, setSecureTextConfirm] = useState(true);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isCheck, setIsCheck] = useState(true);
  const [form, setForm] = useState({
    latlong: {},
    country: "",
    location: "",
    country_code: "",
    state: "",
    city: "",
  });

  useEffect(() => {
    setTimeout(() => {
      getLocation();
    }, 1000);
    return () => {
      setIsCheck(false);
    };
  }, []);

  const submitForm = async (data) => {
    setIsRequesting(true);
    const response = await UserApi.registerUser(data);
    setIsRequesting(false);
    if (!response.ok) {
      alert("Something went Wronge..!!");
      return;
    }
    let { result, success } = response.data;
    if (!success) {
      var text = "";
      var x;
      var i = 1;
      for (x in result) {
        text += i + ": " + result[x][0] + "\n";
        i++;
      }
      Alert.alert("Error", text);
    } else {
      Alert.alert(
        "Congratulations",
        "You are successfully registered. Please Sign In to start Dating.",
        [{ text: "OK", onPress: () => navigation.navigate("SignIn") }]
      );
    }
  };
  const getReverseLocation = async (lat, lon) => {
    const response = await UserApi.searchReverseGeolocation(lat, lon);
    if (!response.ok) return;
    let address = response.data.address;
    let state = typeof address.state != "undefined" ? address.state : "";
    let city =
      typeof address.state_district != "undefined"
        ? address.state_district
        : "";
    setForm({
      ...form,
      country: address.country,
      country_code: address.country_code,
      location: response.data.display_name,
      latlong: JSON.stringify({ lat, lon }),
      state: state,
      city: city,
    });
  };

  const getLocation = async () => {
    const { granted } = await Location.requestPermissionsAsync();
    if (!granted) {
      if (isCheck) setForm({ ...form, latlong: "" });
      return;
    }
    try {
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      let lat = latitude;
      let lon = longitude;
      // setForm({ ...form, latlong: { lat, lon } });
      if (isCheck) getReverseLocation(lat, lon);
    } catch (error) {
      alert(
        "We could not find your position. Please make sure your location service provider is on"
      );
      if (isCheck) setForm({ ...form, latlong: "" });
      console.log("Error while trying to get location: ", error);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#334249" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView alwaysBounceVertical style={styles.scrollview}>
          <Formik
            initialValues={{
              name: "",
              email: "",
              location: form.location,
              latlong: form.latlong,
              state: form.state,
              city: form.city,
              country: form.country,
              country_code: form.country_code,
              gender: "",
              dob: "",
              password: "",
              password_confirmation: "",
            }}
            enableReinitialize={true}
            onSubmit={submitForm}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, errors, touched }) => (
              <>
                <TextElement
                  name="name"
                  labelText="Name"
                  iconName="user-o"
                  icon={true}
                  placeholderText="Full Name"
                />
                <TextElement
                  name="email"
                  labelText="Email"
                  iconName="envelope-o"
                  icon={true}
                  margin={20}
                  placeholderText="Your Email"
                />

                <DateElement name="dob" labelText="Date of Birth" margin={20} />
                {form.latlong == "" && (
                  <>
                    <SearchElement
                      name="location"
                      labelText="Address"
                      iconName="address-card-o"
                      icon={true}
                      margin={20}
                      placeholderText="Your Address"
                    />
                    <Text style={{ color: Colors.primary }}>
                      Click the map Search Icon to choose the distination
                    </Text>
                  </>
                )}
                <PickerElement
                  name="gender"
                  labelText="Gender"
                  margin={20}
                  pickerData={[
                    { label: "Male", value: 1 },
                    { label: "Female", value: 2 },
                  ]}
                />

                <PasswordElement
                  name="password"
                  labelText="Password"
                  iconName="lock"
                  icon={true}
                  margin={20}
                  placeholderText="Your Password"
                  secureTextEntry={secureText}
                  updateSecureTextEntry={() => setSecureText(!secureText)}
                />
                <PasswordElement
                  name="password_confirmation"
                  labelText="Confirm Password"
                  iconName="lock"
                  icon={true}
                  margin={20}
                  placeholderText="Confirm Your Password"
                  secureTextEntry={secureTextConfirm}
                  updateSecureTextEntry={() =>
                    setSecureTextConfirm(!secureTextConfirm)
                  }
                />

                <View style={styles.textPrivate}>
                  <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                  </Text>
                  <Text
                    style={[styles.color_textPrivate, { fontWeight: "bold" }]}
                  >
                    {" "}
                    Terms of service
                  </Text>
                  <Text style={styles.color_textPrivate}> and</Text>
                  <Text
                    style={[styles.color_textPrivate, { fontWeight: "bold" }]}
                  >
                    {" "}
                    Privacy policy
                  </Text>
                </View>
                <View style={styles.button}>
                  <View style={{ marginBottom: 20 }}>
                    {errors.latlong && touched.location ? (
                      <ErrorMsg
                        error={errors.latlong}
                        visible={touched.location}
                      />
                    ) : null}
                  </View>
                  <GradientButton
                    onClick={handleSubmit}
                    Requesting={isRequesting}
                    text="Sign Up"
                    gradient={["#848484", "#334249"]}
                  />
                  <View style={{ marginTop: 15, width: "100%" }}>
                    <OutlinedButton
                      onClick={() => navigation.navigate("SignIn")}
                      Requesting={false}
                      text="Sign In"
                      gradient={["#848484", "#334249"]}
                    />
                  </View>
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#334249",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 5,
    paddingBottom: 30,
    borderWidth: 1,
    borderTopWidth: 7,
    borderLeftColor: "#e74c3c",
    borderRightColor: "#e74c3c",
    borderTopColor: "#e74c3c",
  },
  scrollview: {
    paddingHorizontal: 20,
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
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
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
