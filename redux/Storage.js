import AsyncStorage from "@react-native-community/async-storage";

const key = "userAuth";
const localeKey = "locale";

const setAuthUser = async (authUser) => {
  try {
    await AsyncStorage.setItem(key, authUser);
  } catch (error) {
    console.log("Error in retrieving the auth user ", error);
  }
};

const setLocale = async (translation) => {
  try {
    await AsyncStorage.setItem(localeKey, translation);
  } catch (error) {
    console.log("Error in saving the translation", error);
  }
};

const getAuthUser = async () => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log("Error getting the auth user", error);
  }
};

const getLocale = async () => {
  try {
    return await AsyncStorage.getItem(localeKey);
  } catch (error) {
    console.log("Error getting the translation", error);
  }
};

const RemoveAuthUser = async () => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Error removing the auth user", error);
  }
};

const removeLocale = async () => {
  try {
    await AsyncStorage.removeItem(localeKey);
  } catch (error) {
    console.log("Error removing the translation", error);
  }
};

export default {
  RemoveAuthUser,
  getAuthUser,
  setAuthUser,
  setLocale,
  getLocale,
  removeLocale
};
