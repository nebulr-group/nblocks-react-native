import { Text } from "react-native";
import { DefaultPaddingComponent } from "../../components/shared/DefaultPaddingComponent";
import React, { FunctionComponent } from "react";
import { SetPasswordComponent } from "../../components/Auth/SetPasswordComponent/SetPasswordComponent";

const SetPasswordScreen: FunctionComponent = () => {
  return (
    <DefaultPaddingComponent style={{ flex: 1 }}>
      <SetPasswordComponent />
    </DefaultPaddingComponent>
  );
};

export { SetPasswordScreen };
