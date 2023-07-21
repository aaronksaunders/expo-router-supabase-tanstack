import { View, Button, Text, StyleSheet, Alert, Platform } from "react-native";
import * as Device from "expo-device";
import * as ImagePicker from "expo-image-picker";
import { supabaseClient } from "../context/supabase-service";

export const useCamera = () => {


  const uploadToSupabase = async (uri: string, type: string) => {
    try {
      const name = uri.split("/").pop() as string;

      const photo = {
        uri: uri,
        type: type,
        name: name,
      };

      var formData = new FormData();
      formData.append("file", photo as any);

      const { data, error } = await supabaseClient.storage
        .from("images")
        .upload(name, formData);
      if (error) throw error;

      console.log(data);

      return {data, error : undefined};
    } catch (e) {
      Alert.alert(`Error Uploading To Supabase ${(e as Error).message}`);
      return { error:e, data: undefined }
    } 
    
  };

  /**
   *
   */
  const takePhoto = async () => {
    const func = Device.isDevice
      ? ImagePicker.launchCameraAsync
      : ImagePicker.launchImageLibraryAsync;
    const ipResult = await func({
      allowsEditing: true,
      //   mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!ipResult.canceled) {
      // get uri
      const uri = ipResult.assets[0].uri;
      console.log(uri);
      // upload to firebase storage
      return await uploadToSupabase(uri, ipResult.assets[0].type as string);
    }
  };

  return {
    takePhoto,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
