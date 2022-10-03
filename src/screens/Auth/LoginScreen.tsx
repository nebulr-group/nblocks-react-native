import React, { FunctionComponent } from "react";
import { Platform, ScrollView } from "react-native";
import { LoginComponent } from "../../components/Auth/LoginComponent/LoginComponent";
import { DefaultPaddingComponent } from "../../components/shared/DefaultPaddingComponent";
const LoginScreen: FunctionComponent<{}> = () => {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
    >
      <DefaultPaddingComponent style={{ flex: 1 }}>
        <LoginComponent />
      </DefaultPaddingComponent>
    </ScrollView>
  );
};

export { LoginScreen };
