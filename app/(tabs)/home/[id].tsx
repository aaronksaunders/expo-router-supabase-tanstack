import { View, Text } from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "@/app/context/supabase-service";
import { useEffect, useState } from "react";

export default function ImageDetail() {
  const router = useRouter();
  const { id } = useSearchParams();
  const [taskData, setTaskData] = useState();

  // const { isLoading, isError, data, error, isFetching, isPreviousData } =
  // useQuery(["tasks", id], async () => {
  //   const { data, error } = await supabaseClient
  //     .from("Tasks")
  //     .select("*")
  //     .eq("id", id);

  //     setTaskData(data as any);
  //   return data;
  // });

  useEffect(() => {
    (async () => {
      const { data, error } = await supabaseClient
        .from("Tasks")
        .select("*")
        .eq("id", id);

      setTaskData(data as any);
      return data;
    })();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "Task Detail", headerShown: true }} />
      <Text>{JSON.stringify(id)}</Text>
      <Text>{taskData && JSON.stringify(taskData[0], null, 2)}</Text>
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
