import React, { useState } from "react";
import { View, Text, Platform, StyleSheet, ScrollView,TouchableNativeFeedback } from "react-native";
import * as Animatable from "react-native-animatable";
import { useSelector, useDispatch } from "react-redux";
import { Card, Title, Paragraph } from "react-native-paper";
// import * as yup from "yup";
import StatusBarComponent from "../../components/widjets/StatusBarComponent";
// import Storage from "../../redux/Storage";
import PackageList from "../../components/widjets/PackageList";
// import { apiUpdateUser } from "../../redux/action/Auth";


function PackageSetting({ navigation }) {
  const dispatch = useDispatch();
  const [upload, setUpload] = useState(false);
  const [progress, setProgress] = useState(1);
  const [packageName, setPackageName] = useState("");
  const { user } = useSelector((state) => state.auth);
  const notify = useSelector((state) => state.notify);
  const locale = useSelector((state) => state.translation);

  // const submitForm = async (data) => {
  //   setIsRequesting(true);
  //   const response = await UserApi.UpdateUser(data);
  //   setIsRequesting(false);
  //   if (!response.ok) {
  //     alert("Something went Wronge..!!");
  //     return;
  //   }
  //   setUpload(true);
  //   let { result, success } = response.data;
  //   if (success) {
  //     dispatch(apiUpdateUser(result));
  //     restoreUser(result);
  //   }
  // };


  return (
    <View style={styles.container}>
      <StatusBarComponent theme="light" backgound="transparent" />
      <View style={styles.header}></View>
      <Animatable.View
        animation="fadeInUpBig"
        duration={800}
        style={styles.footer}
      >
        <ScrollView style={{ paddingHorizontal: 20, paddingTop: 30, paddingBottom:80}}>
        <View>
          <Card elevation={40} style={styles.cardContainer}>
            <Card.Content>
              <Title style={{ fontFamily: "open-sans-bold", fontSize: 24,textAlign:"center",color:"#e74c3c" }}>
                Subscribed Plan 
              </Title>
              <Title style={{ fontFamily: "open-sans-bold", fontSize: 22,textAlign:"center",color:"#334249" }}>
              {notify.package ? user.package==null?locale.no_package_sub:user.package:""}
              {!notify.package && <Text>{locale.register_application}</Text>}
              </Title>
            </Card.Content>
          </Card>
        </View>
        <View style={[styles.rowClass, { marginTop: 10,marginBottom:10 }]}>
           <Paragraph>{locale.change_plan_text}</Paragraph>
        </View>
        {/* loop starts */}
        <View style={{marginBottom:200}}>
          <PackageList navigate={navigation} />
        </View>
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
  rowClass: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
  },
  cardContainer: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 6,
    borderColor:"#e74c3c",
    borderTopWidth:2,
    borderLeftWidth:1,
    borderRightWidth:1,
    borderBottomWidth:4,
    borderRadius: 25,
    borderWidth:2
  },
  columnClass: {
    marginVertical: 0,
    width: "55%",
    marginLeft: 40,
  },
  columnSingle: {
    flex: 1,
    justifyContent: "flex-start",
    marginLeft: -12,
  },
  footer: {
    flex: Platform.OS === "ios" ? 9 : 9,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
