import React, { FunctionComponent, useState } from "react";
import { useEffect } from "react";
import { SafeAreaView, View, Keyboard, Platform } from "react-native";
import Modal from "react-native-modal";
import { DefaultPaddingComponent } from "./DefaultPaddingComponent";

/**
 * NblocksModalComponent, shared reusable modal
 * Swipable support is experimental. Works 50% of the time
 * onCloseModal optional but required when half mode
 * @param param0
 * @returns
 */
const NblocksModalComponent: FunctionComponent<{
  visible: boolean;
  onCloseModal: () => void;
  mode: "full" | "half";
  swipable: boolean;
}> = ({ visible, onCloseModal, mode, swipable, children }) => {
  const [keyboardState, setKeyboardState] = useState(false);
  // Set keyboard event listners
  useEffect(() => {
    if (mode !== "half") return;

    let increaseModalSize = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardState(true);
    });

    let decreaseModalSize = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardState(false);
    });

    if (Platform.OS === "ios") {
      increaseModalSize = Keyboard.addListener("keyboardWillShow", () => {
        setKeyboardState(true);
      });

      decreaseModalSize = Keyboard.addListener("keyboardWillHide", () => {
        setKeyboardState(false);
      });
    }

    return () => {
      increaseModalSize.remove();
      decreaseModalSize.remove();
    };
  }, []);
  return (
    <Modal
      style={{
        flex: 1,
        margin: 0,
        justifyContent: "flex-end",
      }}
      isVisible={visible}
      onBackdropPress={() => onCloseModal()}
      swipeDirection={swipable ? ["up", "down"] : []}
      onSwipeComplete={() => onCloseModal}
      backdropTransitionOutTiming={0}
      avoidKeyboard={Platform.OS === "ios" ? true : false}
    >
      <View
        style={{
          flex: mode === "half" && !keyboardState ? 0.5 : 1,
        }}
      >
        <DefaultPaddingComponent style={{ flex: 1 }}>
          <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
        </DefaultPaddingComponent>
      </View>
    </Modal>
  );
};

export { NblocksModalComponent };
