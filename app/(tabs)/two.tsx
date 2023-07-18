import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { supabaseClient } from "../context/supabase-service";
import { useQuery } from "@tanstack/react-query";
import ProgressBar from "react-native-progress/Bar";
import MyImageList from "../components/ImageList";

export default function TabTwoScreen() {
  const imageFetcher = async () => {
    const { data, error } = await supabaseClient.storage.from("images").list();
    if (error) throw error;
    return data;
  };

  const { isLoading, isError, data, error, isFetching, isPreviousData } =
    useQuery(["images"], () => imageFetcher());

  return (
    <View style={styles.container}>
      {(isLoading || isFetching) && (
        <ProgressBar
          style={styles.progressView}
          indeterminate={true}
          width={200}
        />
      )}
      <MyImageList files={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
