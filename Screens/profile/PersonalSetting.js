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
  const locale = useSelector((state) => state.translation);


  const submitForm = async (data) => {
    setIsRequesting(true);
    const response = await UserApi.UpdateUser(data);
    setIsRequesting(false);
    if (!response.ok) {
      alert(locale.error_somthing_went_wronge);
      return;
    }
    setUpload(true);
    let { result, success} = response.data;
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
                  labelText={locale.name}
                  iconName="user-o"
                  placeholderText={locale.name}
                />
                <PickerElement
                  name="gender"
                  labelText={locale.gender}
                  pickerData={selectData.gender}
                />
                <DateElement name="dob" labelText={locale.dob} />
                <>
                  <SearchElement
                    name="location"
                    labelText={locale.address}
                    iconName="address-card-o"
                    icon={true}
                    margin={20}
                    placeholderText={locale.your_address}
                  />
                  <Text style={{ color: "grey", fontSize: 12 }}>
                  {locale.map_search}
                  </Text>
                </>
                <TextElement
                  name="phone"
                  labelText={locale.phone}
                  iconName="phone"
                  placeholderText={locale.phone}
                />
                <PickerElement
                  name="looking"
                  labelText={locale.wish_to_meet}
                  pickerData={selectData.looking}
                />
                <PickerElement
                  name="drinker"
                  labelText={locale.drinker}
                  pickerData={selectData.drinker}
                />
                <PickerElement
                  name="ethnicity"
                  labelText={locale.ethnicity}
                  pickerData={selectData.ethnicity}
                />
                <PickerElement
                  name="height"
                  labelText={locale.height}
                  pickerData={selectData.height}
                />
                <PickerElement
                  name="occupation"
                  labelText={locale.occupation}
                  pickerData={selectData.occupation}
                />
                <PickerElement
                  name="language_spoken"
                  labelText={locale.language}
                  pickerData={selectData.language_spoken}
                />
                <PickerElement
                  name="preffered_age"
                  labelText={locale.preffered_age}
                  pickerData={selectData.preffered_age}
                />
                <PickerElement
                  name="purpose"
                  labelText={locale.purpose}
                  pickerData={selectData.purpose}
                />
                <PickerElement
                  name="smoker"
                  labelText={locale.smoker}
                  pickerData={selectData.smoker}
                />
                <PickerElement
                  name="marial_status"
                  labelText={locale.relationship}
                  pickerData={selectData.marial_status}
                />
                <PickerElement
                  name="religion"
                  labelText={locale.religion}
                  pickerData={selectData.religion}
                />
                <TextElement
                  name="education"
                  labelText={locale.final_education}
                  iconName="object-group"
                  placeholderText={locale.final_education}
                />
                <TextElement
                  name="desc"
                  labelText={locale.little_desc}
                  iconName="object-group"
                  placeholderText={locale.desc}
                  multiline={true}
                  numberOfLines={5}
                />
                <TextElement
                  name="facebook"
                  labelText={locale.fb_link}
                  iconName="object-group"
                  placeholderText={locale.fb_link_desc}
                />
                <TextElement
                  name="instagram"
                  labelText={locale.insta_link}
                  iconName="object-group"
                  placeholderText={locale.insta_link_desc}
                />
                <TextElement
                  name="twitter"
                  labelText={locale.twitter}
                  iconName="object-group"
                  placeholderText={locale.twitter_desc}
                />
                <TextElement
                  name="youtube"
                  labelText={locale.youtube}
                  iconName="object-group"
                  placeholderText={locale.youtube_desc}
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
