import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import React, { useEffect } from "react";
import { SessionProvider,useSession } from "./context/ctx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      console.log("loaded fonts")
    }
  }, [loaded]);

  const { user, isLoading } = useSession();
  console.log("[root layout] ==>", user, isLoading)

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <></>;
  }

  const client = new QueryClient();

  return (
    <SessionProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={client}>
        <Slot />
        </QueryClientProvider>
      </GestureHandlerRootView>
    </SessionProvider>
  );
}