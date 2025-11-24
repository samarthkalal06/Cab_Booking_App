//HomeScreen.js 
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchCabs } from "../api";

export default function HomeScreen({ navigation }) {
  const [cabs, setCabs] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await fetchCabs();
    setCabs(data);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.container}>
        <Text style={styles.title}>Available Cabs</Text>

        <FlatList
          contentContainerStyle={{ paddingBottom: 30 }}
          data={cabs}
          keyExtractor={(i) => String(i.id)}
          renderItem={({ item }) => (
            <View
              style={styles.card}
              onTouchEnd={() =>
                navigation.navigate("BookRide", { cab: item })
              }
            >
              <Text style={styles.name}>{item.name}</Text>

              <View style={styles.row}>
                <Text style={styles.emoji}>🚗</Text>
                <Text style={styles.detail}>{item.carModel}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.emoji}>📍</Text>
                <Text style={styles.detail}>{item.city}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F2F4F7",
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 15,
  },
  card: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 4,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  emoji: {
    fontSize: 16,
    marginRight: 6,
  },
  detail: {
    fontSize: 14,
    color: "#666",
  },
});
