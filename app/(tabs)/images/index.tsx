import {
  Dimensions,
  StyleSheet,
} from "react-native";

import { View } from "@/components/Themed";
import { supabaseClient } from "../../context/supabase-service";
import { useQuery } from "@tanstack/react-query";
import ProgressBar from "react-native-progress/Bar";
import MyImageList from "./components/ImageList";
import { Stack, useRouter } from "expo-router";
import { useCamera } from "@/app/hooks/useCamera";
import * as ImagePicker from "expo-image-picker";
import { useEffect } from "react";
import { CamerButton } from "./components/CamerButton";

export default function TabTwoScreen() {
  const router = useRouter();

  const { takePhoto } = useCamera();

  const [permission, requestPermission] = ImagePicker.useCameraPermissions();

  /**
   * used by the camerButton component onPress
   */
  const onTakePhoto = async () => {
    const r = await takePhoto();
    if (r?.data) {
      refetch();
    }
  };

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

  const {
    isLoading,
    isError,
    data,
    error,
    isFetching,
    isPreviousData,
    refetch,
  } = useQuery(["images"], () => imageFetcher(), { keepPreviousData: true });

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Image Storage",
          headerRight: () => <CamerButton onTakePhoto={onTakePhoto} />,
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
        <MyImageList
          files={data}
          onItemClick={(key: string) => router.push(`/(tabs)/images/${key}`)}
        />
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
