import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert, FlatList } from "react-native";
import {
  Button,
  Card,
  Subheading,
  Title,
  Paragraph,
  IconButton,
  ActivityIndicator,
} from "react-native-paper";
import StatusBarComponent from "../../components/widjets/StatusBarComponent";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { apiUserBlogs, apiAccountBlogs } from "../../redux/action/Blog";
import Colors from "../../constants/Colors";
import BlogApi from "../../api/Blog";
import moment from "moment";

const Posts = (props) => {
  const dispatch = useDispatch();
  const blogData = useSelector((state) => state.blog);
  const locale = useSelector((state) => state.translation);
  
  const { user } = props.userObj;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    LoadBlogs();
  }, []);

  const LoadBlogs = async () => {
    const response = await BlogApi.getUserBlogs(user.id);
    if (!response.ok) {
      return setError(true);
    }
    if (error) {
      setError(false);
    }
    if (props.userObj) {
      dispatch(apiAccountBlogs(response.data.data));
    } else {
      dispatch(apiUserBlogs(response.data.data));
    }
    setLoading(false);
  };
  const deletePost = async (id) => {
    const response = await BlogApi.deleteUserBlogs(id);
    if (response.ok) {
      LoadBlogs();
    }
  };

  const handlePostDelete = (id) => {
    Alert.alert(locale.Post_delete, locale.Post_delete_text, [
      { text: locale.yes, onPress: () => deletePost(id) },
      { text: locale.no },
    ]);
  };

  const renderItem = ({ item }) => (
    <Card elevation={20} style={styles.cardContainer} key={item.id}>
      <View style={{ position: "relative" }}>
        <Card.Cover source={{ uri: item.path }} />
        {!props.userObj && (
          <IconButton
            icon="square-edit-outline"
            color={Colors.accent}
            size={30}
            style={{
              backgroundColor: "#e0e0e0",
              borderRadius: 15,
              position: "absolute",
              right: 0,
              marginHorizontal: 10,
            }}
            onPress={() =>
              props.onNavigationChanges("createBlog", { id: item.id })
            }
          />
        )}
        {!props.userObj && (
          <IconButton
            icon="delete-empty"
            color={Colors.accent}
            size={30}
            style={{
              backgroundColor: "#e0e0e0",
              borderRadius: 15,
              position: "absolute",
              left: 0,
              marginHorizontal: 10,
            }}
            onPress={() => {
              handlePostDelete(item.id);
            }}
          />
        )}
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
          {locale.by+" "+ item.name.split(" ", 1) + " "}|
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
              props.onNavigationChanges("BlogDetail", {
                id: item.id,
                dataMaster: props.userObj ? "account" : "user",
              });
            }}
            labelStyle={{
              marginHorizontal: 0,
              color: Colors.accent,
              fontFamily: "open-sans-bold",
            }}
          >
            {locale.read_more} {`>>`}
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  const renderHeader = () => (
    <View>
      <Subheading
        style={{
          fontFamily: "open-sans-bold",
          fontSize: 28,
          paddingVertical: 15,
        }}
      >
        {props.userObj ? locale.user_posts : locale.your_posts}
      </Subheading>
    </View>
  );

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: "open-sans-bold" }}>
          {locale.couldnt_retrive}
        </Text>
        <Button mode="contained" onPress={LoadBlogs}>
          {locale.retry}
        </Button>
      </View>
    );
  }
  if (loading) {
    return <ActivityIndicator size="large" animating={loading} />;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={props.userObj ? blogData.account_blog : blogData.user_blog}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id.toString()}
      />
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
    elevation: 10,
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
  fab: {
    position: "absolute",
    backgroundColor: Colors.accent,
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
});

export default Posts;
