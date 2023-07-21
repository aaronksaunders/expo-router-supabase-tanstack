import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
} from "react-native";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { supabaseClient } from "../../../context/supabase-service";
import { useQuery } from "@tanstack/react-query";

export default function MyImageList({
  files,
  onItemClick,
}: {
  files: any;
  onItemClick: any;
}) {
  /**
   *
   * @param param0
   * @returns
   */
  const Item = ({ item, onClick }: any) => {
    // const [url, setURL] = useState<string>();
    const blurhash =
      "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

    /**
     * fetcher to convert from blob to base 64 to be rendered,
     *
     * @param name
     */
    const getImageBlobAndConvert = async (name: string) => {
      const { data: blob, error } = await supabaseClient.storage
        .from("images")
        .download(name);

      if (error) throw error;

      // convert blob to base64 string
      return new Promise<string>((resolve) => {
        const fileReaderInstance = new FileReader();
        fileReaderInstance.readAsDataURL(blob as Blob);
        fileReaderInstance.onload = () => {
          resolve(fileReaderInstance.result as string);
        };
      });
    };

    const {
      isLoading,
      isError,
      data: url,
      error,
      isFetching,
      isPreviousData,
    } = useQuery(["images", item.name], () =>
      getImageBlobAndConvert(item.name)
    );

    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.image_container}>
          <Pressable onPress={onClick}>
            <Image
              source={url}
              style={styles.image}
              contentFit="contain"
              placeholder={blurhash}
            />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={files}
      renderItem={({ item }) => {
        return item.name !== ".emptyFolderPlaceholder" ? (
          // <Pressable onPress={() => onItemClick(item.name)}>
          <Item item={item} onClick={() => onItemClick(item.name)} />
        ) : (
          // </Pressable>
          <></>
        );
      }}
      keyExtractor={(item) => item.name}
    />
  );
}

const styles = StyleSheet.create({
  image_container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    marginVertical: 16,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
  image: {
    flex: 1,
    width: Dimensions.get("screen").width - 32,
    height: 224,
    backgroundColor: "#0553",
  },
});
