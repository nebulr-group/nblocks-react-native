import React, { FunctionComponent } from "react";
import { Fragment } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleProp,
  ViewStyle,
} from "react-native";

// Types of arguments passed to Component wrapper
export type Config = {
  behavior?: "height" | "position" | "padding" | undefined;
  scrollMode?: "auto" | "always" | "never" | undefined;
  scrollBounces?: boolean;
  showScrollIndicator?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  keyboardDismissMode?: "none" | "interactive" | "on-drag" | undefined;
};

type Props = {
  useBehavior: boolean;
  useScroll: boolean;
  children: React.ReactNode;
  config?: Config;
};

// Component wrapper
const KeyboardAvoidingComponent: FunctionComponent<Props> = ({
  children,
  config,
  useScroll,
  useBehavior,
}) => {
  let defaultConfig: Config = {
    behavior: Platform.OS === "ios" ? "padding" : "height",
    scrollMode: "always",
    scrollBounces: true,
    showScrollIndicator: true,
    keyboardDismissMode: "none",
  };

  if (config === undefined) {
    // Default config
    config = {
      ...defaultConfig,
    };
  } else {
    config = {
      ...defaultConfig,
      ...config,
    };
  }
  // If scroll is enabled
  if (useScroll) {
    return (
      <ScrollView
        style={{ flex: 1 }}
        overScrollMode={config.scrollMode}
        bounces={config.scrollBounces}
        contentContainerStyle={config.contentContainerStyle}
        showsVerticalScrollIndicator={config.showScrollIndicator}
        keyboardDismissMode={config.keyboardDismissMode}
      >
        {useBehavior ? (
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={config.behavior}
            enabled
          >
            {children}
          </KeyboardAvoidingView>
        ) : (
          <KeyboardAvoidingView style={{ flex: 1 }} enabled>
            {children}
          </KeyboardAvoidingView>
        )}
      </ScrollView>
    );
  }
  return (
    <Fragment>
      {useBehavior ? (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={config.behavior}
          enabled
        >
          {children}
        </KeyboardAvoidingView>
      ) : (
        <KeyboardAvoidingView style={{ flex: 1 }} enabled>
          {children}
        </KeyboardAvoidingView>
      )}
    </Fragment>
  );
};

export { KeyboardAvoidingComponent };
