import React from "react";
import { StatusBar } from "expo-status-bar";

import Colors from "../../constants/Colors";

const StatusBarComponent = (props) => {
  return (
    <StatusBar
      style={props.theme ? props.theme : "dark"}
      backgroundColor={props.backgound ? props.backgound : ""}
    />
  );
};

export default StatusBarComponent;
