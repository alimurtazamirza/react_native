import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import {
  Button,
  Card,
  Subheading,
  Title,
  Paragraph,
  Chip,
  FAB,
} from "react-native-paper";
import StatusBarComponent from "../components/widjets/StatusBarComponent";
import LoadingScreen from "../components/widjets/LoadingScreen";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { apiGetBlogs } from "../redux/action/Blog";
import Colors from "../constants/Colors";
import BlogApi from "../api/Blog";
import moment from "moment";

const Blog = ({ navigation }) => {
  const dispatch = useDispatch();
  const blogData = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    LoadBlogs("all");
  }, []);

  const LoadBlogs = async (category) => {
    const response = await BlogApi.getBlogs(category, user.id);
    if (!response.ok) {
      console.log(response.data);
      return setError(true);
    }
    if (error) {
      setError(false);
    }
    if (!response.data.data.length)
      return alert("Sorry, no post for this category found..!!");
    dispatch(
      apiGetBlogs({
        blog: response.data.data,
        category: response.data.category,
      })
    );
    setLoading(false);
  };

  const renderItem = ({ item }) => (
    <Card elevation={10} style={styles.cardContainer} key={item.id}>
      <View style={{ position: "relative" }}>
        <Card.Cover source={{ uri: item.path }} />
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
              {item.likes}
            </Text>
            <MaterialCommunityIcons name="comment" size={26} color="white" />
            <Text
              style={{
                color: "white",
                paddingHorizontal: 18,
                fontSize: 20,
                fontFamily: "open-sans-bold",
              }}
            >
              {item.comments}
            </Text>
          </View>
        </View>
      </View>
      <Card.Content style={{ paddingLeft: 5 }}>
        <Title style={{ fontFamily: "open-sans-bold" }}>{item.title}</Title>
        <Subheading style={{ fontFamily: "open-sans" }}>
          {"By " + item.name.split(" ", 1) + " "}|
          {moment(item.created_at).format("DD MMM, YYYY")}|
          {"" + item.category + ""}
        </Subheading>
        <Paragraph style={{ fontFamily: "open-sans" }}>
          {item.description}
        </Paragraph>
        <View style={{ width: "50%", alignItems: "flex-start" }}>
          <Button
            mode="text"
            onPress={() => {
              navigation.navigate("BlogDetail", {
                id: item.id,
                dataMaster: "blog",
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
  );

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: "open-sans-bold" }}>
          Couldn't retrive the Data.
        </Text>
        <Button mode="contained" onPress={LoadBlogs}>
          Retry
        </Button>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <LoadingScreen visible={loading} />
      <FAB
        style={styles.fab}
        large
        icon="pen-plus"
        color="white"
        onPress={() => navigation.navigate("createBlog", { id: null })}
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
              icon="arrow-all"
              mode="outlined"
              style={
                blogData.category == "all" ? styles.chipsSelected : styles.chips
              }
              onPress={() => LoadBlogs("all")}
            >
              All
            </Chip>
            <Chip
              icon="account-multiple-plus"
              mode="outlined"
              // textStyle={{ color: "#fff" }}
              style={
                blogData.category == "Marriage"
                  ? styles.chipsSelected
                  : styles.chips
              }
              onPress={() => LoadBlogs("Marriage")}
            >
              Marriage
            </Chip>
            <Chip
              icon="bank"
              mode="outlined"
              style={
                blogData.category == "Business"
                  ? styles.chipsSelected
                  : styles.chips
              }
              onPress={() => LoadBlogs("Business")}
            >
              Business
            </Chip>
            <Chip
              icon="calendar-heart"
              mode="outlined"
              style={
                blogData.category == "Dating"
                  ? styles.chipsSelected
                  : styles.chips
              }
              onPress={() => LoadBlogs("Dating")}
            >
              Dating
            </Chip>
            <Chip
              icon="account-heart"
              mode="outlined"
              style={
                blogData.category == "Love"
                  ? styles.chipsSelected
                  : styles.chips
              }
              onPress={() => LoadBlogs("Love")}
            >
              Love
            </Chip>
            <Chip
              icon="wallet-travel"
              mode="outlined"
              style={
                blogData.category == "Travel"
                  ? styles.chipsSelected
                  : styles.chips
              }
              onPress={() => LoadBlogs("Travel")}
            >
              Travel
            </Chip>
            <Chip
              icon="account-multiple"
              mode="outlined"
              style={
                blogData.category == "Friend"
                  ? styles.chipsSelected
                  : styles.chips
              }
              onPress={() => LoadBlogs("Friend")}
            >
              Friend
            </Chip>
            <Chip
              icon="clover"
              mode="outlined"
              style={
                blogData.category == "Technology"
                  ? styles.chipsSelected
                  : styles.chips
              }
              onPress={() => LoadBlogs("Technology")}
            >
              Technology
            </Chip>
            <Chip
              icon="camera"
              mode="outlined"
              style={
                blogData.category == "Photography"
                  ? styles.chipsSelected
                  : styles.chips
              }
              onPress={() => LoadBlogs("Photography")}
            >
              Photography
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

        <FlatList
          data={blogData.blog}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id.toString()}
        />
      </ScrollView>
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
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 20,
  },
  chips: {
    marginHorizontal: 3,
  },
  chipsSelected: {
    marginHorizontal: 3,
    backgroundColor: Colors.accent,
    color: "#fff",
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
