import Server from "./Server";
import { create } from "apisauce";

const api = create({
  baseURL: "https://nominatim.openstreetmap.org/",
});

const getUser = (id, auth_id) => Server.get(`/user/${id}/${auth_id}`);

const updatePushToken = (data) => Server.post(`/user/update_push_token`, data);

const getUserFrineds = (id) => Server.get(`/user/user_friend/${id}`);

const showMapUser = (data) => Server.post(`/get_users_for_map`, data);

const getLanguage = (data) => Server.get(`/language/${language}`);

// const showMapUser = (data) => Server.post(`/get_users_for_map`, data);

const registerUser = (formData) => Server.post(`/register`, formData);

const getFilteredResults = (data) => Server.post(`/get_filtered_results`, data);

const UpdateUser = (formData) =>
  Server.post(`/update_personal_setting`, formData);

const loginUser = (formData) => Server.post(`sanctum/token`, formData);

const loadSelect = () => Server.get(`get_select_value`);

const dataFirst = (id) => Server.get(`/user/dataFirst/${id}`);

const getPackages = (type) => Server.get(`/user/packages/${type}`);

const screenFocused = (option, user_id) =>
  Server.get(`/user/focused/${option}/${user_id}`);

const changePassword = (data) => Server.post(`changePassword`, data);

const checkAsyncData = (id) => Server.get(`/user/check_async_data/${id}`);

const getUserMessages = (id, user_id, header) =>
  Server.get(`/user/get_user_massages/${id}/${user_id}/${header}`);

const sendMassage = (message) =>
  Server.post(`/user/send_new_maassage`, message);

const makeRemoveRequest = (data) =>
  Server.post(`/user/make_remove_request`, data);

const rejectRequest = (data) => Server.post(`/user/reject_request`, data);

const acceptRequest = (data) => Server.post(`/user/accept_friend`, data);

const removeRequest = (data) => Server.post(`/user/remove_friend`, data);

const searchPlaces = (search) =>
  api.get(`search?format=json&limit=3&q=${search}`);

const searchReverseGeolocation = (lat, lon) =>
  api.get(`reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`);

export default {
  getUser,
  dataFirst,
  searchPlaces,
  sendMassage,
  updatePushToken,
  searchReverseGeolocation,
  registerUser,
  getUserFrineds,
  rejectRequest,
  screenFocused,
  loginUser,
  getPackages,
  UpdateUser,
  getLanguage,
  changePassword,
  loadSelect,
  checkAsyncData,
  acceptRequest,
  removeRequest,
  showMapUser,
  makeRemoveRequest,
  getUserMessages,
  getFilteredResults,
};
