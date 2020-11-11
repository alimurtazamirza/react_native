import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Navigation from "./Navigation";
import AuthNavigation from "./AuthNavigation";
import { apiLoadUser } from "../redux/action/Auth";

// import Storage from "../redux/Storage";

const SwitchNavigation = (props) => {
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.auth);

  // if (props.storageUser != null) {
  //   dispatch(apiLoadUser(JSON.parse(props.storageUser)));
  // }
  // const restoreUser = async () => {
  //   const storageUser = await Storage.getAuthUser();
  //   if (!storageUser) return;
  //   dispatch(apiLoadUser(JSON.parse(storageUser)));
  // };
  const restoreUser = () => {
    if (props.storageUser != null) {
      dispatch(apiLoadUser(JSON.parse(props.storageUser)));
    }
  };

  useEffect(() => {
    restoreUser();
  }, []);

  const check_data = (id) => {};

  let returnValue;
  if (Auth.user != null) {
    returnValue = <Navigation />;
  } else {
    returnValue = <AuthNavigation />;
  }
  return returnValue;
};

export default SwitchNavigation;
