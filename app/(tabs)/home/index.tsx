import { Pressable, StyleSheet, useColorScheme } from "react-native";

import { Text, View } from "@/components/Themed";
import { Link, Stack, useRouter } from "expo-router";
import { supabaseClient } from "@/app/context/supabase-service";
import { useQuery } from "@tanstack/react-query";
import ProgressBar from "react-native-progress/Bar";
import MyTaskList from "@/app/components/TaskList";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function TabOneScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const taskFetcher = async () => {
    const { data, error } = await supabaseClient.from("Tasks").select("*");
    if (error) throw error;
    return data;
  };

  const { isLoading, isError, data, error, isFetching, isPreviousData } =
    useQuery(["tasks"], () => taskFetcher());

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "SQL Data",
          headerRight: () => (
            <Link href="/(tabs)/home/add-task-modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerLeft: () => (
            <Link href="/(tabs)/home/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="user-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <View style={styles.container}>
        {(isLoading || isFetching) && (
          <ProgressBar
            style={styles.progressView}
            indeterminate={true}
            width={200}
          />
        )}

        <MyTaskList
          files={data}
          onItemClick={(id: string) => router.push(`/(tabs)/home/${id}`)}
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
