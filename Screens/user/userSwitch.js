import React from "react";
import About from "./userAbout";
import Photos from "./userPhotos";
import Friends from "./userFriends";
import Posts from "./userPosts";

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
