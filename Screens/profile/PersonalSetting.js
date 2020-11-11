import React, { useState } from "react";
import { View, Platform, StyleSheet, Text, Alert } from "react-native";
import * as Animatable from "react-native-animatable";
import { Formik } from "formik";
import * as yup from "yup";

import GradientButton from "../../components/widjets/GradientButton";
import DateElement from "../../components/widjets/DateElement";
import TextElement from "../../components/widjets/TextElement";
import PickerElement from "../../components/widjets/PickerElement";
import SearchElement from "../../components/widjets/SearchElement";
import UploadScreen from "../../components/widjets/UploadScreen";
import StatusBarComponent from "../../components/widjets/StatusBarComponent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector, useDispatch } from "react-redux";
import UserApi from "../../api/User";
import { apiUpdateUser } from "../../redux/action/Auth";
import Storage from "../../redux/Storage";
import Colors from "../../constants/Colors";

let validationSchema = yup.object().shape({
  gender: yup.string().required().label("Gender"),
  dob: yup.date().required().label("Date of Birth"),
  location: yup.string().required().label("Location"),
});

function PersonalSetting(props) {
  const dispatch = useDispatch();
  const [upload, setUpload] = useState(false);
  const [progress, setProgress] = useState(1);
  const [isRequesting, setIsRequesting] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const selectData = useSelector((state) => state.select);

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
        <KeyboardAwareScrollView
          extraScrollHeight={80}
          style={styles.scrollview}
        >
          <Formik
            initialValues={{
              id: user.id,
              name: user.name,
              gender: user.gender,
              dob: user.dob,
              location: user.location,
              phone: user.phone,
              latlong: user.latlong,
              state: user.state,
              city: user.city,
              education: user.education,
              country: user.country,
              country_code: user.country_code,
              looking: user.looking,
              drinker: user.drinker,
              ethnicity: user.ethnicity,
              height: user.height,
              language_spoken: user.language_spoken,
              preffered_age: user.preffered_age,
              purpose: user.purpose,
              looking: user.looking,
              smoker: user.smoker,
              marial_status: user.marial_status,
              religion: user.religion,
              occupation: user.occupation,
              desc: user.desc,
              facebook: user.facebook,
              instagram: user.instagram,
              twitter: user.twitter,
              youtube: user.youtube,
            }}
            // enableReinitialize
            onSubmit={submitForm}
            validationSchema={validationSchema}
          >
            {({ handleSubmit }) => (
              <>
                <TextElement
                  name="name"
                  labelText="Name"
                  iconName="user-o"
                  placeholderText="Your Name"
                />
                <PickerElement
                  name="gender"
                  labelText="Gender"
                  pickerData={selectData.gender}
                />
                <DateElement name="dob" labelText="Date of Birth" />
                <>
                  <SearchElement
                    name="location"
                    labelText="Address"
                    iconName="address-card-o"
                    icon={true}
                    margin={20}
                    placeholderText="Your Address"
                  />
                  <Text style={{ color: "grey", fontSize: 12 }}>
                    Click the map Search Icon after filling the text to choose
                    the distination
                  </Text>
                </>
                <TextElement
                  name="phone"
                  labelText="Phone No"
                  iconName="phone"
                  placeholderText="Phone No"
                />
                <PickerElement
                  name="looking"
                  labelText="Wish to meet"
                  pickerData={selectData.looking}
                />
                <PickerElement
                  name="drinker"
                  labelText="Drinker"
                  pickerData={selectData.drinker}
                />
                <PickerElement
                  name="ethnicity"
                  labelText="Ethnicity"
                  pickerData={selectData.ethnicity}
                />
                <PickerElement
                  name="height"
                  labelText="Height"
                  pickerData={selectData.height}
                />
                <PickerElement
                  name="occupation"
                  labelText="Occupation"
                  pickerData={selectData.occupation}
                />
                <PickerElement
                  name="language_spoken"
                  labelText="Languages spoken"
                  pickerData={selectData.language_spoken}
                />
                <PickerElement
                  name="preffered_age"
                  labelText="Preferred age"
                  pickerData={selectData.preffered_age}
                />
                <PickerElement
                  name="purpose"
                  labelText="Purpose of dating"
                  pickerData={selectData.purpose}
                />
                <PickerElement
                  name="smoker"
                  labelText="Smoker"
                  pickerData={selectData.smoker}
                />
                <PickerElement
                  name="marial_status"
                  labelText="Relationship"
                  pickerData={selectData.marial_status}
                />
                <PickerElement
                  name="religion"
                  labelText="Religious Beliefs"
                  pickerData={selectData.religion}
                />
                <TextElement
                  name="education"
                  labelText="Final Education"
                  iconName="object-group"
                  placeholderText="Final Education"
                />
                <TextElement
                  name="desc"
                  labelText="Little Desciption about you"
                  iconName="object-group"
                  placeholderText="Description"
                  multiline={true}
                  numberOfLines={5}
                />
                <TextElement
                  name="facebook"
                  labelText="Facebook Link"
                  iconName="object-group"
                  placeholderText="Complete Facebook profile link"
                />
                <TextElement
                  name="instagram"
                  labelText="Instagram Link"
                  iconName="object-group"
                  placeholderText="Complete Instagram profile link"
                />
                <TextElement
                  name="twitter"
                  labelText="Twitter Link"
                  iconName="object-group"
                  placeholderText="Complete Twitter profile link"
                />
                <TextElement
                  name="youtube"
                  labelText="Youtube Link"
                  iconName="object-group"
                  placeholderText="Complete Youtube profile link"
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
    paddingBottom: 20,
    paddingTop: 5,
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
  scrollview: {
    paddingHorizontal: 20,
    paddingBottom: 50,
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
