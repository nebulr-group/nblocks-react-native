import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, useState } from "react";
import { Text, ActivityIndicator } from "react-native";
import { useSecureContext } from "../../../hooks/secure-http-context";
import { AuthRoutesStackParams } from "../../../routes/AuthRoutes";
import { TextInputComponent } from "../../shared/InputComponent";
import { NblocksButton } from "../../shared/NblocksButton";
import { BaseStyleComponent } from "../BaseStyleComponent";
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import { ValidationMessageComponent } from "../ValidationMessageComponent/ValidationMessageComponent";
import { useTheme } from "../../../hooks/theme-context";
import * as Linking from "expo-linking";
import QueryString from "qs";
import { Fragment } from "react";

const SetPasswordComponent: FunctionComponent = () => {
  const navigation = useNavigation<NavigationProp<AuthRoutesStackParams>>();
  const [wasTouched, setWasTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [requestErrorStatus, setRequestErrorStatus] = useState(false);
  const { colors } = useTheme();
  // Parse url for auth token
  const url = Linking.useURL();
  let token:
    | string
    | QueryString.ParsedQs
    | string[]
    | QueryString.ParsedQs[]
    | undefined;
  if (url) {
    const parsedLink = Linking.parse(url);
    if (parsedLink.queryParams) {
      token = Linking.parse(url).queryParams!["token"];
    }
  }

  const { authService } = useSecureContext();
  // Form Validity State/Control
  const {
    password: newPassword,
    feedbackLog: newPasswordFeedbackLog,
    passwordIsValid: newPasswordIsValid,
    onPasswordTextChangeValidation: onNewPasswordTextChangeValidation,
  } = usePasswordValidation();

  const { password: confirmPassword, setPassword: setConfirmPassword } =
    usePasswordValidation();
  const submitPassword = async (): Promise<void> => {
    try {
      setLoading(true);
      if (!token || typeof token !== "string") {
        token = "";
      }
      await authService.updatePassword(token, newPassword);
      navigation.navigate("Login");
      setLoading(false);
    } catch (error) {
      setRequestErrorStatus(true);
      setLoading(false);
    }
  };

  let formIsValid = false;
  if (newPasswordIsValid) {
    formIsValid = samePasswordValidator(newPassword, confirmPassword);
  }
  const renderErrorMessages = wasTouched && !newPasswordIsValid;
  return (
    <Fragment>
      {loading ? (
        <ActivityIndicator color="#32B768" style={{ flex: 1 }} size="large" />
      ) : (
        <BaseStyleComponent
          title="Set a new Password"
          subTitle="Set your new password which you will be using for any future logins."
        >
          <TextInputComponent
            label="New Password"
            placeholder="Enter your new password."
            type="password"
            value={newPassword}
            onChangeText={(text) => onNewPasswordTextChangeValidation(text)}
            onPressIn={() => setWasTouched(true)}
            onBlur={() => setWasTouched(true)}
          />
          {/* useEffect with clean up function should set the state of was touched */}
          {renderErrorMessages && newPasswordFeedbackLog[0].error ? (
            <ValidationMessageComponent feedbackLog={newPasswordFeedbackLog} />
          ) : null}
          <TextInputComponent
            label="Confirm Password"
            placeholder="Repeat your password"
            type="password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <NblocksButton
            title="Set New Password"
            type={!requestErrorStatus ? "primary" : "danger"}
            onPress={() => submitPassword()}
            disabled={!formIsValid || requestErrorStatus}
          />
          {requestErrorStatus && (
            <Text style={{ color: colors.dangerColor }}>
              The link has expired, you'll need to generate a new one again.
            </Text>
          )}
        </BaseStyleComponent>
      )}
    </Fragment>
  );
};

const samePasswordValidator = (
  newPassword: string,
  confirmPassword: string
) => {
  if (newPassword !== confirmPassword) {
    return false;
  }

  return true;
};

export { SetPasswordComponent };
