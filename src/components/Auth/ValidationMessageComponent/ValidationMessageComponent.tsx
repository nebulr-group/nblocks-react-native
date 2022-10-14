import { Text } from "react-native";
import React, { Fragment, FunctionComponent } from "react";
import uuid from "react-native-uuid";
import { useTheme } from "../../../hooks/theme-context";

// Password Validation Fedback Log Format
export interface ValidationMessageObject {
  error?: string;
}

const ValidationMessageComponent: FunctionComponent<{
  feedbackLog: ValidationMessageObject[];
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
