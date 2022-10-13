import React, { FunctionComponent, useState, useEffect } from "react";
import { View, Image, Dimensions, Keyboard, Platform } from "react-native";
import WebView from "react-native-webview";
import { useApp } from "../../hooks/app-context";
import { ImageComponent } from "../shared/ImageComponent";
import { IngressComponent } from "../shared/IngressComponent";
import { NblocksButton } from "../shared/NblocksButton";
import { NblocksModalComponent } from "../shared/NblocksModalComponent";
import { SubTitleComponent } from "../shared/SubTitleComponent";
import { TextComponent } from "../shared/TextComponent";

const BaseStyleComponent: FunctionComponent<{
  title: string;
  subTitle: string;
}> = ({ children, title, subTitle }) => {
  const { name, logo, privacyPolicyUrl } = useApp();
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [keyboardState, setKeyboardState] = useState(false);
  // Set keyboard event listners
  useEffect(() => {
    let hidePrivacyPolicyCTA = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardState(true);
    });

    let displayPrivacyPolicyCTA = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardState(false);
      }
    );

    if (Platform.OS === "ios") {
      hidePrivacyPolicyCTA.remove();
      hidePrivacyPolicyCTA = Keyboard.addListener("keyboardWillShow", () => {
        setKeyboardState(true);
      });

      displayPrivacyPolicyCTA.remove();
      displayPrivacyPolicyCTA = Keyboard.addListener("keyboardWillHide", () => {
        setKeyboardState(false);
      });
    }

    return () => {
      hidePrivacyPolicyCTA.remove();
      displayPrivacyPolicyCTA.remove();
    };
  }, []);

  const renderPrivacyPolicy = () => {
    if (privacyPolicyUrl) {
      return (
        <NblocksModalComponent
          mode="full"
          visible={showPrivacyPolicy}
          swipable={false}
          onCloseModal={() => setShowPrivacyPolicy(false)}
        >
          <WebView
            style={{ flex: 1 }}
            source={{ uri: privacyPolicyUrl }}
          ></WebView>
          <NblocksButton
            title="Close"
            type="primary"
            onPress={() => setShowPrivacyPolicy(false)}
          ></NblocksButton>
        </NblocksModalComponent>
      );
    }
  };

  return (
    <View style={{ flex: 1, alignContent: "space-between" }}>
      <View style={{ alignItems: "center" }}>
        <ImageComponent
          style={{
            height: 100,
            width: Dimensions.get("window").width * (2 / 3),
            resizeMode: "contain",
          }}
          uri={logo}
        />
        <SubTitleComponent>{title}</SubTitleComponent>
        <IngressComponent>{subTitle}</IngressComponent>
      </View>
      <View style={{ flex: 1 }}>{children}</View>
      <View
        style={{
          alignItems: "center",
          display: keyboardState ? "none" : "flex",
        }}
      >
        <TextComponent>
          @{new Date().getFullYear()} {name} All rights reserved
        </TextComponent>
        <NblocksButton
          title="Privacy policy"
          onPress={() => setShowPrivacyPolicy(true)}
        />
      </View>
      {renderPrivacyPolicy()}
    </View>
  );
};

export { BaseStyleComponent };
