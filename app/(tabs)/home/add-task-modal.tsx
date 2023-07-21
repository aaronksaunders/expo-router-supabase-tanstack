import {
  Pressable,
  StyleSheet,
  TextInput,
  useColorScheme,
} from "react-native";

import { Text, View } from "@/components/Themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Stack, useRouter } from "expo-router";
import { useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

export default function ModalScreen() {
  const colorScheme = useColorScheme();

  const titleRef = useRef("");
  const descriptionRef = useRef("");
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
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: "10%",
          backgroundColor: "transparent",
        }}
      >
        <View style={{ width: "80%", backgroundColor: "transparent" }}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              placeholder="Title"
              autoCapitalize="none"
              nativeID="title"
              onChangeText={(text) => {
                titleRef.current = text;
              }}
              style={styles.textInput}
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
              placeholder="Description"
              autoCapitalize="none"
              nativeID="description"
              multiline={true}
              numberOfLines={8}
              onChangeText={(text) => {
                descriptionRef.current = text;
              }}
              style={styles.textInput}
            />
          <TouchableOpacity
            onPress={async () => {
              router.back();
              // const { error } = await signOut();
              // if (error) {
              //   Alert.alert("Sign Out Error", error?.message);
              // }
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>SAVE TASK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    color: "#455fff",
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#455fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 16,
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
    borderRadius: 5,
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
