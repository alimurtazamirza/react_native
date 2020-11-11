import React from "react";
import About from "./About";
import Photos from "./profile/Photos";
import Friends from "./profile/Friends";
import Posts from "./profile/Posts";

const Switch = (props) => {
  let returnValue;
  if (props.currentState === "About") {
    returnValue = <About userObj={props.user} />;
  } else if (props.currentState === "Images") {
    returnValue = <Photos userObj={props.user} />;
  } else if (props.currentState === "Post") {
    returnValue = (
      <Posts userObj={props.user} onNavigationChanges={props.onNavigation} />
    );
  } else if (props.currentState === "Friends") {
    returnValue = (
      <Friends userObj={props.user} onNavigationChanges={props.onNavigation} />
    );
  } else {
    returnValue = <About userObj={props.user} />;
  }
  return returnValue;
};

export default Switch;
