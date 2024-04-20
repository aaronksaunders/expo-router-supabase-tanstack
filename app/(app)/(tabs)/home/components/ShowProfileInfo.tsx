import { Pressable, useColorScheme } from "react-native";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const ShowProfileInfo = () => {
  const colorScheme = useColorScheme();
  return (
    <Link href="/(app)/(tabs)/home/modal" asChild>
      <Pressable>
        {({ pressed }) => (
          <FontAwesome
            name="user-circle"
            size={25}
            color={Colors[colorScheme ?? "light"].text}
            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
        )}
      </Pressable>
    </Link>
  );
};
