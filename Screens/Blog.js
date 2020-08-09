import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Subheading,
  Title,
  Paragraph,
  IconButton,
  Chip,
  FAB,
} from "react-native-paper";
import { AuthContext } from "../components/context";
import StatusBarComponent from "../components/widjets/StatusBarComponent";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const Blog = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <FAB
        style={styles.fab}
        large
        icon="pen-plus"
        color="white"
        onPress={() => console.log("Pressed")}
      />
      <ScrollView>
        <View>
          <Subheading
            style={{
              fontFamily: "open-sans-bold",
              fontSize: 28,
              paddingTop: 10,
            }}
          >
            Top Categories
          </Subheading>
        </View>
        <ScrollView horizontal={true}>
          <View style={styles.chipContainer}>
            <Chip
              icon="account-multiple-plus"
              mode="outlined"
              style={styles.chips}
              onPress={() => console.log("Pressed")}
            >
              Marriage
            </Chip>
            <Chip
              icon="camera"
              mode="outlined"
              style={styles.chips}
              onPress={() => console.log("Pressed")}
            >
              Photography
            </Chip>
            <Chip
              icon="information"
              mode="outlined"
              style={styles.chips}
              onPress={() => console.log("Pressed")}
            >
              Dating
            </Chip>
            <Chip
              icon="clover"
              mode="outlined"
              style={styles.chips}
              onPress={() => console.log("Pressed")}
            >
              Love
            </Chip>
          </View>
        </ScrollView>
        <View>
          <Subheading
            style={{
              fontFamily: "open-sans-bold",
              fontSize: 28,
              paddingVertical: 15,
            }}
          >
            New Posts
          </Subheading>
        </View>
        <Card elevation={10} style={styles.cardContainer}>
          <View style={{ position: "relative" }}>
            <Card.Cover source={{ uri: "https://picsum.photos/600" }} />
            <View
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                height: "20%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="ios-heart" size={28} color="white" />
                <Text
                  style={{
                    color: "white",
                    paddingHorizontal: 20,
                    fontSize: 18,
                    fontFamily: "open-sans-bold",
                  }}
                >
                  15
                </Text>
                <MaterialCommunityIcons
                  name="comment"
                  size={26}
                  color="white"
                />
                <Text
                  style={{
                    color: "white",
                    paddingHorizontal: 18,
                    fontSize: 20,
                    fontFamily: "open-sans-bold",
                  }}
                >
                  18
                </Text>
              </View>
            </View>
          </View>
          <Card.Content style={{ paddingLeft: 5 }}>
            <Title style={{ fontFamily: "open-sans-bold" }}>
              Your Blog title here
            </Title>
            <Subheading style={{ fontFamily: "open-sans" }}>
              {"By David "}|{" 03 Sep, 2016 "}|{" Dating"}
            </Subheading>
            <Paragraph style={{ fontFamily: "open-sans" }}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using is that it has a more-or-less like readable
              English.
            </Paragraph>
            <View style={{ width: "50%", alignItems: "flex-start" }}>
              <Button
                mode="text"
                onPress={() => {
                  navigation.navigate("BlogDetail", {
                    title: "Your Blog title here",
                  });
                }}
                labelStyle={{
                  marginHorizontal: 0,
                  color: Colors.accent,
                  fontFamily: "open-sans-bold",
                }}
              >
                Read more {`>>`}
              </Button>
            </View>
          </Card.Content>
        </Card>
        <Card elevation={10} style={styles.cardContainer}>
          <View style={{ position: "relative" }}>
            <Card.Cover source={{ uri: "https://picsum.photos/500" }} />
            <View
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                height: "20%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="ios-heart" size={28} color="white" />
                <Text
                  style={{
                    color: "white",
                    paddingHorizontal: 20,
                    fontSize: 18,
                    fontFamily: "open-sans-bold",
                  }}
                >
                  15
                </Text>
                <MaterialCommunityIcons
                  name="comment"
                  size={26}
                  color="white"
                />
                <Text
                  style={{
                    color: "white",
                    paddingHorizontal: 18,
                    fontSize: 20,
                    fontFamily: "open-sans-bold",
                  }}
                >
                  18
                </Text>
              </View>
            </View>
          </View>
          <Card.Content style={{ paddingLeft: 5 }}>
            <Title style={{ fontFamily: "open-sans-bold" }}>
              Your Blog title here
            </Title>
            <Subheading style={{ fontFamily: "open-sans" }}>
              {"By David "}|{" 03 Sep, 2016 "}|{" Dating"}
            </Subheading>
            <Paragraph style={{ fontFamily: "open-sans" }}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using is that it has a more-or-less like readable
              English.
            </Paragraph>
            <View style={{ width: "50%", alignItems: "flex-start" }}>
              <Button
                mode="text"
                onPress={() => {
                  navigation.navigate("BlogDetail", {
                    title: "Your Blog title here",
                  });
                }}
                labelStyle={{
                  marginHorizontal: 0,
                  color: Colors.accent,
                  fontFamily: "open-sans-bold",
                }}
              >
                Read more {`>>`}
              </Button>
            </View>
          </Card.Content>
        </Card>
        <Card elevation={10} style={styles.cardContainer}>
          <View style={{ position: "relative" }}>
            <Card.Cover source={{ uri: "https://picsum.photos/800" }} />
            <View
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                height: "20%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="ios-heart" size={28} color="white" />
                <Text
                  style={{
                    color: "white",
                    paddingHorizontal: 20,
                    fontSize: 18,
                    fontFamily: "open-sans-bold",
                  }}
                >
                  15
                </Text>
                <MaterialCommunityIcons
                  name="comment"
                  size={26}
                  color="white"
                />
                <Text
                  style={{
                    color: "white",
                    paddingHorizontal: 18,
                    fontSize: 20,
                    fontFamily: "open-sans-bold",
                  }}
                >
                  18
                </Text>
              </View>
            </View>
          </View>
          <Card.Content style={{ paddingLeft: 5 }}>
            <Title style={{ fontFamily: "open-sans-bold" }}>
              Your Blog title here
            </Title>
            <Subheading style={{ fontFamily: "open-sans" }}>
              {"By David "}|{" 03 Sep, 2016 "}|{" Dating"}
            </Subheading>
            <Paragraph style={{ fontFamily: "open-sans" }}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using is that it has a more-or-less like readable
              English.
            </Paragraph>
            <View style={{ width: "50%", alignItems: "flex-start" }}>
              <Button
                mode="text"
                onPress={() => {
                  navigation.navigate("BlogDetail", {
                    title: "Your Blog title here fasdjfalsdflka",
                  });
                }}
                labelStyle={{
                  marginHorizontal: 0,
                  color: Colors.accent,
                  fontFamily: "open-sans-bold",
                }}
              >
                Read more {`>>`}
              </Button>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
      {/* <Text>This is the blog screen!</Text>
            <Button title="SignOUt" onPress={()=>{signOut()}}/> */}
      <StatusBarComponent theme="dark" backgound="transparent" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  cardContainer: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 20,
  },
  chips: {
    marginHorizontal: 3,
  },
  fab: {
    position: "absolute",
    backgroundColor: Colors.accent,
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
});

export default Blog;
