/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React from "react";
import { AppRegistry, Text } from "react-native";
import { Provider } from "react-redux";
import { StyleProvider } from "native-base";
import getTheme from "./native-base-theme/components";
import material from "./native-base-theme/variables/platform";

import store from "./src/store";
import App from "./src/App";

export default function render() {
  return (
    <Provider store={store}>
      <StyleProvider style={getTheme(material)}>
        <App />
      </StyleProvider>
    </Provider>
  );
}
