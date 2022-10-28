import { Text, TextStyle } from "react-native";
import React, { Fragment, FunctionComponent } from "react";
import uuid from "react-native-uuid";
import { useTheme } from "../../../hooks/theme-context";

// Password Validation Fedback Log Format
/**
 * Interface for constructing validation message objects.
 *
 * @remarks
 * This interface is part of the ValidaitonMessageObject.
 *
 * @example
 * Here's a simple example:
 * ```
 * // Object containing error: string map
 * const messageObject: ValidationMessageObject = {
 *  error: "Error message goes here."
 * }
 * ```
 */
export interface ValidationMessageObject {
  /**
   * The error message
   */
  error?: string;
}

/**
 * Validation message component for rendering list of messages.
 * @param {ValidationMessageObject[]} feedbackLog - Array containing object map of key: string values.
 * @param {TextStyle} style - Optional object containing style for messages, overrides the default style.
 *
 * @returns Fragment collection of Text elements that contain validation messages.
 */
const ValidationMessageComponent: FunctionComponent<{
  feedbackLog: ValidationMessageObject[];
  style?: TextStyle;
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
