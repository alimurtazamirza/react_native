import React, { useState, useEffect } from "react";
import Navigation from "./navigation/Navigation";
import AuthNavigation from "./navigation/AuthNavigation";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import * as Font from "expo-font";
import { AppLoading } from "expo";
import { AuthContext } from "./components/context";
import Colors from "./constants/Colors";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.accent,
    accent: Colors.primary,
  },
};

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./constants/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./constants/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [fontLoaded, setFontLoaded] = useState(false);

  const authContext = React.useMemo(
    () => ({
      signIn: () => {
        setUserToken("fgkj");
        setIsLoading(false);
      },
      signOut: () => {
        setUserToken(null);
        setIsLoading(false);
      },
      signUp: () => {
        setUserToken("fgkj");
        setIsLoading(false);
      },
      toggleTheme: () => {
        setIsDarkTheme((isDarkTheme) => !isDarkTheme);
      },
    }),
    []
  );

  // if(isLoading){
  //   return(
  //     <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  // useEffect(()=>{
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 1000);
  // },[]);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        {userToken == null ? <Navigation /> : <AuthNavigation />}
      </AuthContext.Provider>
    </PaperProvider>
  );
}
