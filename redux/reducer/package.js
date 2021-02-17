import { APICHECK_MEMBERSHIP } from "../action/package";

const initialState = {
  val:true,
  msg:""
};

const packageReducer = (state = initialState, action) => {
  switch (action.type) {
    case APICHECK_MEMBERSHIP:
      let newState = action.data;
      return { ...state, ...newState };

    default:
      return state;
  }
  return state;
};

export default packageReducer;
