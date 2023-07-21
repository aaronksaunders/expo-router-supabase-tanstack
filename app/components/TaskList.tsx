import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import { supabaseClient } from "../context/supabase-service";
import { useQuery } from "@tanstack/react-query";

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
  const Item = ({ item, onClick }: any) => {
    return (
      <View style={styles.item}>
        <Pressable onPress={onClick}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.title}>{item.description}</Text>
          <Text style={styles.title}>{item.created_at}</Text>
          <Text style={styles.title}>{item.completed_at}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <FlatList
      data={files}
      renderItem={({ item }) => (
        <Item item={item} onClick={() => onItemClick(item.id)} />
      )}
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
