import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
          title: "User Info",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="add-task-modal"
        options={{
          presentation: "modal",
          title: "New Task",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
