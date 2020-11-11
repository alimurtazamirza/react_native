import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import ErrorMsg from "./ErrorMsg";
import { IconButton } from "react-native-paper";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useFormikContext } from "formik";
import Colors from "../../constants/Colors";
import UserApi from "../../api/User";
import * as Animatable from "react-native-animatable";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

function SearchElement({
  name,
  labelText,
  iconName,
  placeholderText,
  icon = false,
  margin = 10,
  ...otherProps
}) {
  const {
    errors,
    handleChange,
    setFieldTouched,
    setFieldValue,
    touched,
    values,
  } = useFormikContext();
  const [result, setResult] = useState(null);
  const [requesting, setRequesting] = useState(false);

  const getReverseLocation = async (lat, lon) => {
    const response = await UserApi.searchReverseGeolocation(lat, lon);
    if (!response.ok) return;
    let address = response.data.address;
    let state = typeof address.state != "undefined" ? address.state : "";
    let city =
      typeof address.state_district != "undefined"
        ? address.state_district
        : "";
    setFieldValue("country", address.country);
    setFieldValue("country_code", address.country_code);
    setFieldValue("state", state);
    setFieldValue("city", city);
  };

  const searchResponse = (searchData) => {
    setFieldValue(name, searchData.display_name);
    let lat = searchData.lat;
    let lon = searchData.lon;
    setFieldValue("latlong", JSON.stringify({ lat, lon }));
    setResult(null);
    getReverseLocation(lat, lon);
  };
  const LoadSearchResult = async (search) => {
    setRequesting(true);
    const response = await UserApi.searchPlaces(search);
    if (!response.ok) {
      alert("Something went Wronge..!!");
      setRequesting(false);
      return;
    }
    if (response.data.length < 1) alert("No Result Found..!");
    setResult(response.data);
    setRequesting(false);
  };
  return (
    <View>
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
        {/* {icon && <FontAwesome name={iconName} color="#05375a" size={20} />} */}
        <TextInput
          placeholder={placeholderText}
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={handleChange(name)}
          numberOfLines={1}
          onSubmitEditing={() => {
            LoadSearchResult(values[name]);
          }}
          returnKeyType="search"
          onBlur={() => setFieldTouched(name)}
          value={values[name]}
          {...otherProps}
        />
        <IconButton
          icon="map-search-outline"
          color={Colors.primary}
          size={30}
          disabled={requesting}
          onPress={() => {
            LoadSearchResult(values[name]);
          }}
          style={styles.iconStyle}
        />
      </View>
      {result != null ? (
        <Animatable.View animation="bounceIn">
          {result.map((item, index) => (
            <TouchableNativeFeedback
              onPress={() => {
                searchResponse(item);
              }}
              key={index}
              style={styles.searchBox}
            >
              <Text key={index}>{item.display_name}</Text>
            </TouchableNativeFeedback>
          ))}
        </Animatable.View>
      ) : null}
      <ErrorMsg error={errors[name]} visible={touched[name]} />
    </View>
  );
}

const styles = StyleSheet.create({
  text_footer: {
    color: "#05375a",
    fontSize: 20,
    fontFamily: "open-sans",
  },
  action: {
    flexDirection: "row",
    // marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    // paddingBottom: 5,
  },
  iconStyle: {
    // backgroundColor: Colors.primary,
    // borderRadius: 10,
    marginLeft: 5,
    marginRight: 0,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : 0,
    // paddingLeft: 10,
    color: "#05375a",
  },
  searchBox: {
    marginTop: Platform.OS === "ios" ? 5 : 5,
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    width: "97%",
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
});

export default SearchElement;
