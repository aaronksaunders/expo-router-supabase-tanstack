import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { useCallback } from "react";

export default function MyTaskList({
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
  const Item = useCallback(
    ({ item }: any) => {
      return (
        <View style={styles.item}>
          <Pressable onPress={() => onItemClick(item.id)}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.title}>{item.description}</Text>
            <Text style={styles.title}>{item.created_at}</Text>
            <Text style={styles.title}>{item.completed_at}</Text>
          </Pressable>
        </View>
      );
    },
    [onItemClick]
  );

  return (
    <FlatList
      data={files}
      renderItem={({ item }) => <Item item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
});
