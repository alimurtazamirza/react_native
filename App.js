import React, { useState } from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import * as Font from "expo-font";
import { AppLoading } from "expo";
import Colors from "./constants/Colors";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import SwitchNavigation from "./navigation/SwitchNavigation";
import UserReducer from "./redux/reducer/User";
import AuthReducer from "./redux/reducer/Auth";
// import packageReducer from "./redux/reducer/package";
import SelectReducer from "./redux/reducer/Select";
import blogReducer from "./redux/reducer/Blog";
import notificationReducer from "./redux/reducer/Notification";
import translationReducer from "./redux/reducer/Translation";
import Storage from "./redux/Storage/";
// import { navigationRef } from "./navigation/rootNavigation";

const rootReducer = combineReducers({
  user: UserReducer,
  auth: AuthReducer,
  select: SelectReducer,
  blog: blogReducer,
  notify: notificationReducer,
  translation: translationReducer,
  // package: packageReducer,
});

const store = createStore(rootReducer, composeWithDevTools());
      
const theme = {
  ...DefaultTheme,
  roundness: 2, 
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.accent,
    accent: Colors.primary,
  },
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [storage, setStorage] = useState(null);

  const BeforeLoad = async () => {
    const storageUser = await Storage.getAuthUser();
    setStorage(storageUser);
    return Font.loadAsync({
      "open-sans": require("./constants/fonts/OpenSans-Regular.ttf"),
      "open-sans-bold": require("./constants/fonts/OpenSans-Bold.ttf"),
    });
  };

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={BeforeLoad}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <SwitchNavigation  storageUser={storage} />
      </Provider>
    </PaperProvider>
  );
}
