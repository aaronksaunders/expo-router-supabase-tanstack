import {
  Dimensions,
  StyleSheet,
} from "react-native";

import { View } from "@/components/Themed";
import { Stack, useRouter } from "expo-router";
import { supabaseClient } from "@/app/context/supabase-service";
import { useQuery } from "@tanstack/react-query";
import ProgressBar from "react-native-progress/Bar";
import MyTaskList from "@/app/(app)/(tabs)/home/components/TaskList";
import { AddTaskButton } from "./components/AddTaskButton";
import { ShowProfileInfo } from "./components/ShowProfileInfo";

export default function TabOneScreen() {
  const router = useRouter();

  const taskFetcher = async () => {
    const { data, error } = await supabaseClient.from("Tasks").select("*");
    if (error) throw error;
    return data;
  };

  const { isLoading, isError, data, error, isFetching, isPreviousData } =
    useQuery(["tasks"], () => taskFetcher(), { keepPreviousData: true });

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "SQL Data",
          headerRight: () => <AddTaskButton />,
          headerLeft: () => <ShowProfileInfo />,
        }}
      />
      <View style={styles.container}>
        {(isLoading || isFetching) && (
          <ProgressBar
            style={styles.progressView}
            indeterminate={true}
            width={Dimensions.get("window").width}
          />
        )}

        <MyTaskList
          files={data}
          onItemClick={(id: string) => router.push(`/(app)/(tabs)/home/${id}`)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  progressView: {
    marginTop: 20,
  },
});
