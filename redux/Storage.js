import AsyncStorage from "@react-native-community/async-storage";

const key = "userAuth";

const setAuthUser = async (authUser) => {
  try {
    await AsyncStorage.setItem(key, authUser);
  } catch (error) {
    console.log("Error in retrieving the auth user ", error);
  }
};

const getAuthUser = async () => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log("Error getting the auth user", error);
  }
};

const RemoveAuthUser = async () => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Error removing the auth user", error);
  }
};

export default {
  RemoveAuthUser,
  getAuthUser,
  setAuthUser,
};
