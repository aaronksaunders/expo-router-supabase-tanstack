import { Pressable, useColorScheme } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";

/**
 *
 * @param param0
 * @returns
 */
export const CamerButton = ({ onTakePhoto }: { onTakePhoto: () => void; }) => {
  const colorScheme = useColorScheme();
  return (
    <Pressable onPress={onTakePhoto}>
      {({ pressed }) => (
        <FontAwesome
          name="camera"
          size={25}
          color={Colors[colorScheme ?? "light"].text}
          style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
      )}
    </Pressable>
  );
};
