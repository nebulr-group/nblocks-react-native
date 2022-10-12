import React, { FunctionComponent } from "react";
import { ScrollView, Platform } from "react-native";
import { ResetPasswordComponent } from "../../components/Auth/ResetPasswordComponent/ResetPasswordComponent";
import { DefaultPaddingComponent } from "../../components/shared/DefaultPaddingComponent";

const ResetPasswordScreen: FunctionComponent<{}> = () => {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
    >
      <DefaultPaddingComponent style={{ flex: 1 }}>
        <ResetPasswordComponent />
      </DefaultPaddingComponent>
    </ScrollView>
  );
};

export { ResetPasswordScreen };
