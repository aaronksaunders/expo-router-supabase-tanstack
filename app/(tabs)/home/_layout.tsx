import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
          title: "User Info",
        }}
      />
    </Stack>
  );
}
