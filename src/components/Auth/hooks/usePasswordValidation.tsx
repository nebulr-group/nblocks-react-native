import { Dispatch, SetStateAction, useState } from "react";
import { ValidationMessageObject } from "../ValidationMessageComponent/ValidationMessageComponent";

/**
 * Object, containing custom configuration map for
 * overriding the default settings of usePasswordValidation hook.
 *
 * @remarks
 * This type is part of usePasswordValidation hook.
 *
 * @example
 * Here's a simple use case example:
 * ```
 * // Object containing configuration for
 * // overriding the usePasswordValidation default event messages
 * const customConfig: Config = {
 *    messages: {
 *      onEmptyString: "Password field is empty!",
 *      onMinLenght: "Your password must contain at leaast 10 characters."
 *    }
 * }
 * ```
 */
export type Config = {
  messages: {
    onEmptyString: string;
    onMinLenght: string;
    onNoUppercaseLetter: string;
    onNoLowercaseLetter: string;
    onNoNumber: string;
    onNoSpecialCharacter: string;
    onInvalidCustomStrenght: string;
  };
};

/**
 * Validation message object map type.
 *
 * @remarks
 * This type is part of passwordStandardStrengthValidator function. It is used to
 * describe the ValidationErrors format in which it will be saved.
 */
export type ValidationErrors = {
  [key: string]: any;
};

/**
 * Password validation hook type.
 *
 * @remark
 * This type is used to define the of password validation hook.
 *
 * @param config - Custom configuration object.
 */
type PasswordValidationHook = (config?: Config) => {
  passwordIsValid: boolean;
  feedbackLog: ValidationMessageObject[];
  password: string;
  onPasswordTextChangeValidation: (text: string, regex?: RegExp) => void;
  onResetPasswordInputText: () => void;
  setPassword: Dispatch<SetStateAction<string>>;
};

/**
 * Password validation hook.
 *
 * @remark
 * The password validation hook provides you with all key components for validating user password input
 * You can use our default configuration or provide your own.
 * @param config
 * @returns
 * The object containing password validity state (boolean), feedback log, password (string), validation callbacks and reset callbacks.
 *
 * @example
 * ```
 * // Custom configuration with custom messages
 * const customConfig: Config = {
 *    messages: {
 *      onEmptyString: "Password field is empty!",
 *      onMinLenght: "Your password must contain at leaast 10 characters."
 *    }
 * }
 *
 *
 * // Init usePasswordValidaiton hook
 * const { passwordIsValid: newPasswordIsValid,
 *         feedbackLog: newPasswordFeedbackLog,
 *         password: newPassword,
 *         onPasswordTextChangeValidation,
 *         onResetPasswordInputText: onNewPasswordResetPasswordInputText,
 *         setPassword: setNewPassword } = usePasswordValidation(customConfig)
 * ```
 */
const usePasswordValidation: PasswordValidationHook = (config) => {
  // Password Text State
  const [password, setPassword] = useState("");
  const [feedbackLog, setFeedbackLog] = useState([{}]);

  // Default Hook Validation Configuration
  const defaultConfig = {
    messages: {
      onEmptyString: "Password field can not be empty.",
      onMinLenght: "Minimal length: 10 characters",
      onNoUppercaseLetter: "Should contain uppercase letter",
      onNoLowercaseLetter: "Should contain lowercase letter",
      onNoNumber: "Should contain digit",
      onNoSpecialCharacter: "Should contain special character",
      onInvalidCustomStrenght: "The password must be hard to guess!",
    },
  };

  // Custom and Default Configuration Union

  let validationConfiguration = {
    ...defaultConfig,
    messages: {
      ...defaultConfig.messages,
    },
  };

  if (config) {
    validationConfiguration = {
      ...defaultConfig,
      ...config,
      messages: {
        ...defaultConfig.messages,
        ...config.messages,
      },
    };
  }

  // Reset password field text
  const onResetPasswordInputText = () => {
    setPassword("");
  };

  const onPasswordTextChangeValidation = (text: string, regex?: RegExp) => {
    // If password is an empty string
    if (text === "") {
      setFeedbackLog([
        {
          error: validationConfiguration.messages.onEmptyString,
        },
      ]);
      setPassword("");
      return;
    }
    // If using custom regex
    if (regex) {
      // Set the new password
      const passwordErrors = createPasswordCustomStrengthValidator(regex, text);

      if (passwordErrors !== null) {
        setFeedbackLog([
          {
            error: validationConfiguration.messages.onInvalidCustomStrenght,
          },
        ]);
      }

      setPassword(text);
      return;
    }

    const passwordErrors = passwordStandardStrengthValidator(text);
    if (passwordErrors !== null) {
      const errorMessageLog = [];
      // Min lenght
      if (passwordErrors.passwordStrength_minLength) {
        errorMessageLog.push({
          error: validationConfiguration.messages.onMinLenght,
        });
      }

      if (passwordErrors.passwordStrength_noUppercaseLetter) {
        errorMessageLog.push({
          error: validationConfiguration.messages.onNoUppercaseLetter,
        });
      }

      if (passwordErrors.passwordStrength_noLowercaseLetter) {
        errorMessageLog.push({
          error: validationConfiguration.messages.onNoLowercaseLetter,
        });
      }

      if (passwordErrors.passwordStrength_noNumber) {
        errorMessageLog.push({
          error: validationConfiguration.messages.onNoNumber,
        });
      }

      if (passwordErrors.passwordStrength_noSpecialCharacter) {
        errorMessageLog.push({
          error: validationConfiguration.messages.onNoSpecialCharacter,
        });
      }

      setFeedbackLog(errorMessageLog);
      setPassword(text);
      return;
    }
    setFeedbackLog([]);
    setPassword(text);
    return;
  };

  const passwordIsValid = feedbackLog.length > 0 ? false : true;
  return {
    password,
    feedbackLog,
    passwordIsValid,
    onPasswordTextChangeValidation,
    onResetPasswordInputText,
    setPassword,
  };
};

// ISO 27001 strength
const passwordStandardStrengthValidator = (value: string) => {
  const errors: ValidationErrors = {};

  if (value.length < 10) {
    errors.passwordStrength = true;
    errors.passwordStrength_minLength = true;
  }

  const upperCaseCharacters = /[A-Z]+/g;
  if (upperCaseCharacters.test(value) === false) {
    errors.passwordStrength = true;
    errors.passwordStrength_noUppercaseLetter = true;
  }

  const lowerCaseCharacters = /[a-z]+/g;
  if (lowerCaseCharacters.test(value) === false) {
    errors.passwordStrength = true;
    errors.passwordStrength_noLowercaseLetter = true;
  }

  const numberCharacters = /[0-9]+/g;
  if (numberCharacters.test(value) === false) {
    errors.passwordStrength = true;
    errors.passwordStrength_noNumber = true;
  }

  const specialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
  if (specialCharacters.test(value) === false) {
    errors.passwordStrength = true;
    errors.passwordStrength_noSpecialCharacter = true;
  }

  if (errors.passwordStrength) {
    return errors;
  }

  return null;
};

// Uses custom regex to validate the password value
const createPasswordCustomStrengthValidator = (
  regex: RegExp,
  value: string
) => {
  const errors: ValidationErrors = {};

  if (regex.test(value) === false) {
    errors.passwordStrenght = true;
    errors.passwordStrenght_invalidCustomStrenght = true;
  }

  if (errors.passwordStrenght) {
    return errors;
  }

  return null;
};

export { usePasswordValidation };
