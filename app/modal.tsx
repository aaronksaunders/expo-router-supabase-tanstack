import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAuth } from "./context/auth";
import { Link, Stack, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

export default function ModalScreen() {
  const { signOut, user } = useAuth();
  const colorScheme = useColorScheme();

  const router = useRouter();
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable onPress={() => router.back()}>
              {({ pressed }) => (
                <FontAwesome
                  name="close"
                  size={25}
                  color={Colors[colorScheme ?? "light"].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>
          {user?.user_metadata?.name || user?.email}
        </Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <TouchableOpacity
          onPress={async () => {
            const { error } = await signOut();
            if (error) {
              Alert.alert("Sign Out Error", error?.message);
            }
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>LOGOUT</Text>
        </TouchableOpacity>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    width: 250,
    borderRadius: 5,
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
