import { DefaultPaddingComponent } from "../../components/shared/DefaultPaddingComponent";
import React, { FunctionComponent } from "react";
import { Platform, ScrollView } from "react-native";
import { SetPasswordComponent } from "../../components/Auth/SetPasswordComponent/SetPasswordComponent";

const SetPasswordScreen: FunctionComponent = () => {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
    >
      <DefaultPaddingComponent style={{ flex: 1 }}>
        <SetPasswordComponent />
      </DefaultPaddingComponent>
    </ScrollView>
  );
};

export { SetPasswordScreen };
