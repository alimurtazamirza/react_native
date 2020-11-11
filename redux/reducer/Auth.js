import { APILOGIN_USER } from "../action/Auth";
import { APIPROFILE_CHANGE } from "../action/Auth";
import { APIPHOTO_CHANGE } from "../action/Auth";
import { APIPHOTO_DELETE } from "../action/Auth";
import { APIUPDATE_USER } from "../action/Auth";
import { APILOAD_USER } from "../action/Auth";
import { APIFRIEND_CHANGE } from "../action/Auth";

const initialState = {
  user: null,
  profileImages: [
    {
      uri: "",
    },
    {
      uri: "",
    },
  ],
  imageUris: [],
  friends: [],
  token: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case APILOGIN_USER:
      let newState = action.user;
      return { ...state, ...newState };
    case APIPROFILE_CHANGE:
      return { ...state, profileImages: action.profileImages };
    case APIPHOTO_CHANGE:
      return {
        ...state,
        imageUris: [...state.imageUris, action.imageUris],
      };
    case APIFRIEND_CHANGE:
      return {
        ...state,
        friends: [...action.friends],
      };
    case APILOAD_USER:
      return { ...state, ...action.user };
    case APIPHOTO_DELETE:
      return {
        ...state,
        imageUris: [...action.imageUris],
      };
    case APIUPDATE_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
  return state;
};

export default authReducer;
