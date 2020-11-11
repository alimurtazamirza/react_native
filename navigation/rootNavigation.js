import React from "react";
export const navigationRef = React.useRef(null);

const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
};

export default {
  navigate,
};
