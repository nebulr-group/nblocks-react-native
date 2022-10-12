import { Text } from "react-native";
import React, { Fragment, FunctionComponent } from "react";
import uuid from "react-native-uuid";
import { PasswordValidationPropmtMessage } from "../hooks/usePasswordValidation";
import { useTheme } from "../../../hooks/theme-context";

const ValidationMessageComponent: FunctionComponent<{
  feedbackLog: PasswordValidationPropmtMessage[];
  style?: {};
}> = ({ feedbackLog, style }) => {
  const { colors } = useTheme();

  return (
    <Fragment>
      {feedbackLog.map((message) => {
        return (
          <Text
            key={String(uuid.v4())}
            style={{ color: colors.dangerColor, ...style }}
          >
            {message["error"]}
          </Text>
        );
      })}
    </Fragment>
  );
};

export { ValidationMessageComponent };
