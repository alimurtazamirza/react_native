import { APILOADPROFILE_USER } from "../action/User";

const initialState = {
  user: {},
  profileImages: [
    {
      uri: "",
    },
    {
      uri: "",
    },
  ],
  imageUris: [],
  friend: 0,
  friends: [],
  request_pending: 0,
  request_sent: 0,
  blogs: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case APILOADPROFILE_USER:
      let newState = action.user;
      return { ...state, ...newState };

    default:
      return state;
  }
  return state;
};

export default userReducer;
