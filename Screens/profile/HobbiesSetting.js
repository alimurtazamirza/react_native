import React, { useState } from "react";
import { View, Platform, StyleSheet, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";

import GradientButton from "../../components/widjets/GradientButton";
import StatusBarComponent from "../../components/widjets/StatusBarComponent";
import TextElement from "../../components/widjets/TextElement";
import UploadScreen from "../../components/widjets/UploadScreen";
import Storage from "../../redux/Storage";
import UserApi from "../../api/User";
import { apiUpdateUser } from "../../redux/action/Auth";

function HobbiesSetting({ navigation }) {
  const dispatch = useDispatch();
  const [upload, setUpload] = useState(false);
  const [progress, setProgress] = useState(1);
  const [isRequesting, setIsRequesting] = useState(false);
  const locale = useSelector((state) => state.translation);
  const { user } = useSelector((state) => state.auth);

  const submitForm = async (data) => {
    setIsRequesting(true);
    const response = await UserApi.UpdateUser(data);
    setIsRequesting(false);
    if (!response.ok) {
      alert(locale.something_went_wronge);
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
        <ScrollView style={styles.scrollStyle}>
          <Formik
            initialValues={{
              id: user.id,
              fav_hobbies: user.fav_hobbies,
              fav_music: user.fav_music,
              fav_tv: user.fav_tv,
              fav_books: user.fav_books,
              fav_movies: user.fav_movies,
              fav_games: user.fav_games,
              fav_interest: user.fav_interest,
            }}
            onSubmit={submitForm}
          >
            {({ handleSubmit }) => (
              <>
                <TextElement
                  name="fav_hobbies"
                  labelText={locale.hobbies}
                  iconName="user-o"
                  numberOfLines={2}
                  placeholderText={locale.hobbies}
                />
                <TextElement
                  name="fav_music"
                  labelText={locale.fav_music}
                  iconName="user-o"
                  numberOfLines={2}
                  placeholderText={locale.fav_music}
                />
                <TextElement
                  name="fav_tv"
                  labelText={locale.fav_tv}
                  iconName="user-o"
                  numberOfLines={2}
                  placeholderText={locale.fav_tv}
                />
                <TextElement
                  name="fav_books"
                  labelText={locale.fav_books}
                  iconName="user-o"
                  numberOfLines={2}
                  placeholderText={locale.fav_books}
                />
                <TextElement
                  name="fav_movies"
                  labelText={locale.fav_movies}
                  iconName="user-o"
                  numberOfLines={2}
                  placeholderText={locale.fav_movies}
                />
                <TextElement
                  name="fav_games"
                  labelText={locale.fav_games}
                  iconName="user-o"
                  numberOfLines={2}
                  placeholderText={locale.fav_games}
                />
                <TextElement
                  name="fav_interest"
                  labelText={locale.fav_others}
                  iconName="user-o"
                  numberOfLines={2}
                  placeholderText={locale.fav_others}
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
    paddingVertical: 30,
    borderWidth: 1,
    borderTopWidth: 7,
    borderLeftColor: "#e74c3c",
    borderRightColor: "#e74c3c",
    borderTopColor: "#e74c3c",
  },
  scrollStyle: {
    paddingHorizontal: 20,
    paddingBottom: 50,
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

export default HobbiesSetting;
