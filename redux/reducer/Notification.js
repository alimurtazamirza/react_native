import { APICHANGE_ASYNCDATA } from "../action/Notification";
import { APIUPDATE_MESSAGES } from "../action/Notification";

const initialState = {
  request_count: 0,
  notifications_count: 0,
  massages_count: 0,
  posts: 0,
  friends: 0,
  likes: 0,
  requests: [],
  notifications: [],
  massages: [],
  chatMassages: 0,
  package:true,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case APICHANGE_ASYNCDATA:
      let newState = action.data;
      return { ...state, ...newState };
    case APIUPDATE_MESSAGES:
      let oldState = { ...state };
      let singleMessage = oldState.massages.find(
        (msg) => msg.header == action.header
      );
      singleMessage.chatMassages = action.count;
      oldState.massages_count = oldState.massages_count - action.count;
      return { ...state, ...oldState };
    default:
      return state;
  }
  return state;
};

export default notificationReducer;
