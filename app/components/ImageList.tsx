import { FlatList, StyleSheet, Text, View, Dimensions } from "react-native";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { supabaseClient } from "../context/supabase-service";

export default function MyImageList({ files }: { files: any }) {
  /**
   *
   * @param param0
   * @returns
   */
  const Item = ({ item }: any) => {
    const [url, setURL] = useState<string>();
    const blurhash =
      "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

    /**
     * helper to conver from blob to base 64 to be rendered,
     * then set the state variable `setURL`
     *
     * @param name
     */
    const getImageBlobAndConvert = async (name: string) => {
      try {
        const { data: blob, error } = await supabaseClient.storage
          .from("images")
          .download(name);

        if (error) throw error;

        // convert blob to base64 string
        const fileReaderInstance = new FileReader();
        fileReaderInstance.readAsDataURL(blob as Blob);
        fileReaderInstance.onload = () => {
          setURL(fileReaderInstance.result as string);
        };
      } catch (error) {
        console.log("getImageBlobAndConvert", error);
      }
    };

    useEffect(() => {
      getImageBlobAndConvert(item.name);
    }, [item.name]);

    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.image_container}>
          <Image
            source={url}
            style={styles.image}
            contentFit="contain"
            placeholder={blurhash}
          />
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={files}
      renderItem={({ item }) => {
        return item.name !== ".emptyFolderPlaceholder" ? (
          <Item item={item} />
        ) : (
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
