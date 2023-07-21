import { Button, Dimensions, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { supabaseClient } from "../../context/supabase-service";
import { useQuery } from "@tanstack/react-query";
import ProgressBar from "react-native-progress/Bar";
import MyImageList from "../../components/ImageList";
import { Stack, useNavigation, useRouter } from "expo-router";
import { useCamera } from "@/app/hooks/useCamera";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import { useEffect } from "react";

export default function TabTwoScreen() {
  const router = useRouter();
  const { takePhoto } = useCamera();

  const [permission, requestPermission] = ImagePicker.useCameraPermissions();

  useEffect(() => {
    if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
      requestPermission().then(() => {
        return null;
      });
    }
  }, []);

  const imageFetcher = async () => {
    const { data, error } = await supabaseClient.storage.from("images").list();
    if (error) throw error;
    return data;
  };

  const { isLoading, isError, data, error, isFetching, isPreviousData, refetch } =
    useQuery(["images"], () => imageFetcher(), { keepPreviousData: true });

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Image Storage" }} />
      <View style={styles.container}>
        {(isLoading || isFetching) && (
          <ProgressBar
            style={styles.progressView}
            indeterminate={true}
            width={Dimensions.get("window").width}
          />
        )}
        <MyImageList
          files={data}
          onItemClick={(key: string) => router.push(`/(tabs)/images/${key}`)}
        />
        <Button
          title="Take Photo"
          onPress={async () => {
            const r = await takePhoto();
            if (r?.data) {
              refetch()
            }
          }}
          disabled={permission?.status !== ImagePicker.PermissionStatus.GRANTED}
        ></Button>
      </View>
    </>
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
