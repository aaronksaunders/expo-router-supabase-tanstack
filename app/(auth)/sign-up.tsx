import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { useAuth } from "../context/auth";
import { Stack, useRouter } from "expo-router";
import { useRef } from "react";
import { Image } from "expo-image";

export default function SignUp() {
  const { signUp } = useAuth();
  const router = useRouter();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const userNameRef = useRef("");

  return (
    <>
      <Stack.Screen options={{ title: "sign up", headerShown: false }} />
      <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", marginTop:'20%' }}>
      <Image
          style={styles.image}
          source={require("../../assets/images/hero-image.png")}
        />
        <View>
          <Text style={styles.label}>UserName</Text>
          <TextInput
            placeholder="Username"
            autoCapitalize="none"
            nativeID="userName"
            onChangeText={(text) => {
              userNameRef.current = text;
            }}
            style={styles.textInput}
          />
        </View>
        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="email"
            autoCapitalize="none"
            nativeID="email"
            onChangeText={(text) => {
              emailRef.current = text;
            }}
            style={styles.textInput}
          />
        </View>
        <View>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            nativeID="password"
            onChangeText={(text) => {
              passwordRef.current = text;
            }}
            style={styles.textInput}
          />
        </View>

        <TouchableOpacity
          onPress={async () => {
            const { data, error } = await signUp(
              emailRef.current,
              passwordRef.current,
              userNameRef.current
            );
            if (data) {
              router.replace("/(tabs)/home");
            } else {
              console.log(error);
              Alert.alert("Login Error", error?.message);
            }
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 32 }}>
          <Text
            style={{ fontWeight: "500" }}
            onPress={() => router.back()}
          >
            Click Here To Return To Sign In Page
          </Text>
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
    width: 250,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#455fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 16,
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
  image: {
    width: Dimensions.get("screen").width,
    height: "33%",
    backgroundColor: "#0553",
  },
});
