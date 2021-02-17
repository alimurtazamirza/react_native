import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Subheading, Card, Title, Paragraph } from "react-native-paper";
import moment from "moment";
import { useSelector } from "react-redux";

const About = (props) => {
  const { user } = props.userObj
    ? useSelector((state) => state.user)
    : useSelector((state) => state.auth);
  const selectData = useSelector((state) => state.select);
  const locale = useSelector((state) => state.translation);


  const valueGetter = (name) => {
    let result = selectData[name].filter((items) => items.value == user[name]);
    if (result.length) {
      return result[0].label;
    }
    return "";
  };

  // console.log(selectData);
  return (
    <View>
      <View>
        <Card elevation={10} style={styles.cardContainer}>
          <Card.Content>
            <Title style={{ fontFamily: "open-sans-bold", fontSize: 24 }}>
              {locale.i_am_looking_for}
            </Title>
            <View style={[styles.rowClass, { marginTop: 10 }]}>
              <View style={styles.columnClass}>
                <Subheading style={{ fontFamily: "open-sans-bold" }}>
                {locale.wish_to_meet}
                </Subheading>
                <Paragraph style={{ fontFamily: "open-sans" }}>
                  {valueGetter("looking")}
                </Paragraph>
              </View>
              <View style={styles.columnClass}>
                <Subheading style={{ fontFamily: "open-sans-bold" }}>
                {locale.purpose}
                </Subheading>
                <Paragraph style={{ fontFamily: "open-sans" }}>
                  {valueGetter("purpose")}
                </Paragraph>
              </View>
            </View>
            <View style={styles.rowClass}>
              <View style={styles.columnSingle}>
                <Subheading style={{ fontFamily: "open-sans-bold" }}>
                {locale.preffered_age}
                </Subheading>
                <Paragraph style={{ fontFamily: "open-sans" }}>
                  {valueGetter("preffered_age")}
                </Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
      <View>
        <Card elevation={10} style={styles.cardContainer}>
          <Card.Content>
            <Title style={{ fontFamily: "open-sans-bold", fontSize: 24 }}>
            {locale.about_you}
            </Title>
            <View
              style={[
                styles.rowClass,
                { justifyContent: "flex-start", marginTop: 10, marginLeft: 4 },
              ]}
            >
              <Paragraph style={{ fontFamily: "open-sans" }}>
                {user.desc}
              </Paragraph>
            </View>
          </Card.Content>
        </Card>
      </View>
      <Card elevation={10} style={styles.cardContainer}>
        <Card.Content>
          <Title style={{ fontFamily: "open-sans-bold", fontSize: 24 }}>
          {locale.about_me}
          </Title>
          <View style={[styles.rowClass, { marginTop: 10 }]}>
            <View style={styles.columnClass}>
              <Subheading style={{ fontFamily: "open-sans-bold" }}>
              {locale.gender}
              </Subheading>
              <Paragraph style={{ fontFamily: "open-sans" }}>
                {valueGetter("gender")}
              </Paragraph>
            </View>
            <View style={styles.columnClass}>
              <Subheading style={{ fontFamily: "open-sans-bold" }}>
              {locale.birthday}
              </Subheading>
              <Paragraph style={{ fontFamily: "open-sans" }}>
                {moment(user.dob).format("Do MMM YYYY")}
              </Paragraph>
            </View>
          </View>
          <View style={styles.rowClass}>
            <View style={styles.columnClass}>
              <Subheading style={{ fontFamily: "open-sans-bold" }}>
              {locale.country}
              </Subheading>
              <Paragraph style={{ fontFamily: "open-sans" }}>
                {user.country}
              </Paragraph>
            </View>
            <View style={styles.columnClass}>
              <Subheading style={{ fontFamily: "open-sans-bold" }}>
              {locale.occupation}
              </Subheading>
              <Paragraph style={{ fontFamily: "open-sans" }}>
                {valueGetter("occupation")}
              </Paragraph>
            </View>
          </View>
          <View style={styles.rowClass}>
            <View style={styles.columnClass}>
              <Subheading style={{ fontFamily: "open-sans-bold" }}>
              {locale.ethnicity}
              </Subheading>
              <Paragraph style={{ fontFamily: "open-sans" }}>
                {valueGetter("ethnicity")}
              </Paragraph>
            </View>
            <View style={styles.columnClass}>
              <Subheading style={{ fontFamily: "open-sans-bold" }}>
              {locale.relationship}
              </Subheading>
              <Paragraph style={{ fontFamily: "open-sans" }}>
                {valueGetter("marial_status")}
              </Paragraph>
            </View>
          </View>
          <View style={styles.rowClass}>
            <View style={styles.columnClass}>
              <Subheading style={{ fontFamily: "open-sans-bold" }}>
              {locale.height}
              </Subheading>
              <Paragraph style={{ fontFamily: "open-sans" }}>
                {valueGetter("height")}
              </Paragraph>
            </View>
            <View style={styles.columnClass}>
              <Subheading style={{ fontFamily: "open-sans-bold" }}>
              {locale.smoker}
              </Subheading>
              <Paragraph style={{ fontFamily: "open-sans" }}>
                {valueGetter("smoker")}
              </Paragraph>
            </View>
          </View>
          <View style={styles.rowClass}>
            <View style={styles.columnClass}>
              <Subheading style={{ fontFamily: "open-sans-bold" }}>
              {locale.language}
              </Subheading>
              <Paragraph style={{ fontFamily: "open-sans" }}>
                {valueGetter("language_spoken")}
              </Paragraph>
            </View>
            <View style={styles.columnClass}>
              <Subheading style={{ fontFamily: "open-sans-bold" }}>
              {locale.drinker}
              </Subheading>
              <Paragraph style={{ fontFamily: "open-sans" }}>
                {valueGetter("occupation")}
              </Paragraph>
            </View>
          </View>
          <View style={styles.rowClass}>
            <View
              style={[
                styles.columnClass,
                {
                  flex: 1,
                  justifyContent: "flex-start",
                  marginTop: 5,
                  marginLeft: -12,
                },
              ]}
            >
              <Subheading style={{ fontFamily: "open-sans-bold" }}>
              {locale.education}
              </Subheading>
              <Paragraph style={{ fontFamily: "open-sans" }}>
                {user.education}
              </Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 10,
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
  rowClass: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
});

export default About;
