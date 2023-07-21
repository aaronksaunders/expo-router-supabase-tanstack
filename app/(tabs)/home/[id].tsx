import { View, Text } from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "@/app/context/supabase-service";

export default function ImageDetail() {
  const router = useRouter();
  const { id } = useSearchParams();

  const { isLoading, isError, data, error, isFetching, isPreviousData } =
    useQuery(["tasks", id], async () => {
      const { data, error } = await supabaseClient
        .from("Tasks")
        .select("*")
        .eq("id", id);
      return data;
    });

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "Task Detail", headerShown: true }} />
      <Text>{JSON.stringify(id)}</Text>
      <Text>{data && JSON.stringify(data[0], null, 2)}</Text>
      <Text
        onPress={() => {
          // Go back to the previous screen using the imperative API.
          router.back();
        }}
      >
        GO BACK
      </Text>
    </View>
  );
}
