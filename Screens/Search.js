import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Alert,
  Platform,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import StatusBarComponent from "../components/widjets/StatusBarComponent";
import LoadingScreen from "../components/widjets/LoadingScreen";
import UserApi from "../api/User";
import { useSelector } from "react-redux";
import { markers } from "../model/mapData";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import KeyboardDismiss from "../components/widjets/KeyboardDismiss";
import Colors from "../constants/Colors";
import { setLocale } from "yup";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height * 0.35;
const CARD_WIDTH = width * 0.6;
const SPACING_FOR_CARD_INSET = width * 0.2 - 10;

const Search = ({ navigation }) => {
  const Authuser = useSelector((state) => state.auth);
  const locale = useSelector((state) => state.translation);

  const { lat, lon } = JSON.parse(Authuser.user.latlong);

  const initialMapState = {
    markers,
    categories: [
      {
        name: locale.same_country,
        active: false,
        icon: (
          <MaterialCommunityIcons
            style={styles.chipsIcon}
            name="image-area"
            color={Colors.accent}
            size={18}
          />
        ),
      },
      // {
      //   name: "Users",
      //   active: false,
      //   icon: (
      //     <FontAwesome5
      //       name="users"
      //       style={styles.chipsIcon}
      //       color={Colors.accent}
      //       size={18}
      //     />
      //   ),
      // },
      {
        name: locale.male,
        active: false,
        icon: (
          <FontAwesome
            name="male"
            style={styles.chipsIcon}
            color={Colors.accent}
            size={18}
          />
        ),
      },
      {
        name: locale.female,
        active: false,
        icon: (
          <FontAwesome
            name="female"
            style={styles.chipsIcon}
            color={Colors.accent}
            size={18}
          />
        ),
      },
    ],
    region: {
      latitude: parseInt(lat),
      longitude: parseInt(lon),
      latitudeDelta: 1.09864195044303443,
      longitudeDelta: 1.0142817690068,
    },
  };

  const [state, setState] = React.useState(initialMapState);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [start, setStart] = useState(false);
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  const getMapData = async () => {
    setStart(true);
    const response = await UserApi.showMapUser({ id: Authuser.user.id });
    setLoading(false);
    if (!response.ok) {
      Alert.alert(locale.error, locale.something_went_wronge, [{ text: locale.okay }]);
      return;
    }
    reformData(response.data.users);
  };
  const getFilterResults = (name, status) => {
    var arrayHolder = [];
    let i = 0;
    const categoryIndex = state.categories.findIndex(
      (element) => element.name == name
    );
    let categoriesArray = state.categories;
    categoriesArray[categoryIndex].active = !status;
    setState({ ...state, categories: categoriesArray });
    const categoryNew = categoriesArray.filter((element) => element.active);
    for (const iterator of categoryNew) {
      arrayHolder[i] = iterator.name;
      i++;
    }
    const searchObj = {
      id: Authuser.user.id,
      name: arrayHolder,
      search: search,
    };

    callTheApi(searchObj);
  };
  const callTheApi = async (searchObj) => {
    setLoading(true);
    const response = await UserApi.getFilteredResults(searchObj);
    setLoading(false);
    if (!response.ok) {
      Alert.alert(locale.error, locale.something_went_wronge, [{ text: locale.okay }]);
      return;
    }
    let arryData = response.data.data;
    if (!arryData.length) {
      Alert.alert(locale.error, locale.nothing_found, [{ text: locale.okay }]);
      return;
    }
    reformData(arryData);
  };

  const getSearchResults = () => {
    var arrayHolder = [];
    let i = 0;
    const categoryNew = state.categories.filter((element) => element.active);
    for (const iterator of categoryNew) {
      arrayHolder[i] = iterator.name;
      i++;
    }
    const searchObj = {
      id: Authuser.user.id,
      name: arrayHolder,
      search: search,
    };

    callTheApi(searchObj);
  };

  const reformData = (data) => {
    var markersNew = [];
    let i = 0;
    for (const iterator of data) {
      markersNew[i] = {
        coordinate: {
          latitude: parseFloat(iterator.latlong.lat),
          longitude: parseFloat(iterator.latlong.lon),
        },
        title: iterator.name,
        description:
          iterator.age +
           locale.years_old+" | " +
          iterator.state +
          ", " +
          iterator.country,
        image: iterator.dp,
        rating: 4,
        id: iterator.id,
        reviews: 99,
      };
      i++;
    }
    setState({ ...state, markers: markersNew });
  };

  React.useEffect(() => {
    if (!start) {
      getMapData();
    }
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = state.markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolations = state.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.6, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });
  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };

  return (
    <KeyboardDismiss>
      <View style={styles.container}>
        <StatusBarComponent />
        <LoadingScreen visible={loading} />
        <MapView
          ref={_map}
          initialRegion={state.region}
          style={styles.container}
        >
          {state.markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            return (
              <Marker
                key={index}
                coordinate={marker.coordinate}
                tracksViewChanges={false}
                onPress={(e) => onMarkerPress(e)}
              >
                {/* <Animated.View style={[styles.markerWrap]}>
                  <Animated.Image
                    source={require("../assets/map_marker.png")}
                    style={[styles.marker, scaleStyle]}
                    resizeMode="cover"
                  />
                </Animated.View> */}
              </Marker>
            );
          })}
        </MapView>
        <View style={styles.searchBox}>
          <TextInput
            placeholder= {locale.search_name}
            placeholderTextColor="#000"
            autoCapitalize="none"
            style={{ flex: 1, padding: 0 }}
            onChangeText={(value) => setSearch(value)}
            value={search}
          />
          <Ionicons
            name="ios-search"
            size={23}
            style={{ paddingTop: 3 }}
            onPress={getSearchResults}
          />
        </View>
        <ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          height={50}
          style={styles.chipsScrollView}
          contentInset={{
            // iOS only
            top: 0,
            left: 0,
            bottom: 0,
            right: 20,
          }}
          contentContainerStyle={{
            paddingRight: Platform.OS === "android" ? 20 : 0,
          }}
        >
          {state.categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.chipsItem,
                {
                  backgroundColor: category.active ? Colors.primary : "#fff",
                },
              ]}
              onPress={() => {
                getFilterResults(category.name, category.active);
              }}
            >
              {category.icon}
              <Text style={{ color: Colors.accent }}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Animated.ScrollView
          ref={_scrollView}
          horizontal
          pagingEnabled
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 20}
          snapToAlignment="center"
          style={styles.scrollView}
          contentInset={{
            top: 0,
            left: SPACING_FOR_CARD_INSET,
            bottom: 0,
            right: SPACING_FOR_CARD_INSET,
          }}
          contentContainerStyle={{
            paddingHorizontal:
              Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: mapAnimation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
        >
          {state.markers.map((marker, no) => {
            return (
              <TouchableWithoutFeedback key={no}>
                <View style={styles.card}>
                  <Image
                    source={{ uri: marker.image }}
                    style={styles.cardImage}
                    resizeMode="cover"
                  />
                  <View style={styles.textContent}>
                    <View style={styles.nameStyle}>
                      <Text numberOfLines={1} style={styles.cardtitle}>
                        {marker.title}
                      </Text>
                    </View>
                    {/* <StarRating ratings={marker.rating} reviews={marker.reviews} /> */}
                    <View style={styles.descriptStyle}>
                      <Text numberOfLines={2} style={styles.cardDescription}>
                        {marker.description}
                      </Text>
                    </View>
                    <View style={{ flex: 3 }}>
                      <View style={styles.button}>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate("User", { userID: marker.id });
                          }}
                          style={[
                            styles.signIn,
                            {
                              borderColor: "#FF6347",
                              borderWidth: 1,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.textSign,
                              {
                                color: "#FF6347",
                              },
                            ]}
                          >
                            {locale.view_profile}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </Animated.ScrollView>
      </View>
    </KeyboardDismiss>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nameStyle: {
    flex: 2,
    alignItems: "center",
    justifyContent: "space-around",
  },
  descriptStyle: {
    flex: 2,
    alignItems: "center",
    justifyContent: "space-around",
  },
  mapStyle: {
    width: width,
    height: height,
  },
  searchBox: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 5 : 5,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 60,
    paddingHorizontal: 15,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 2,
    height: 35,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  // endPadding: {
  //   paddingRight: width - CARD_WIDTH,
  // },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 16,
    // marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 14,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: "center",
    marginTop: 5,
  },
  signIn: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Search;
