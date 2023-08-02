import { View, Text } from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "@/app/context/supabase-service";
import { useEffect, useState } from "react";

export default function ImageDetail() {
  const router = useRouter();
  const { key } = useSearchParams();
  const [imageData, setImageData] = useState();

  console.log("in image detail ", key);

  // const { isLoading, isError, data, error, isFetching, isPreviousData } =
  //   useQuery({
  //     queryKey: ["image", key],
  //     queryFn: async () => {
  //       const { data, error } = await supabaseClient.storage
  //         .from("images")
  //         .list("", {
  //           search: key,
  //         });

  //       if (error) throw error;
  //       setImageData(data as any);
  //       return data;
  //     },
  //   });

  useEffect(() => {
    (async () => {
      const { data, error } = await supabaseClient.storage
        .from("images")
        .list("", {
          search: key,
        });
      if (error) throw error;
      console.log(data);
      setImageData(data as any);
      return data;
    })();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "Image Detail", headerShown: true }} />
      <Text>{key}</Text>
      <Text>{imageData && JSON.stringify(imageData[0], null, 2)}</Text>
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
