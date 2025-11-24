// MyRidesScreen.js
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function MyRidesScreen() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // 🔥 Fetch rides for the logged-in user
    const q = query(
      collection(db, "rides"),
      where("userId", "==", user.uid),
      orderBy("timestamp", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const list = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setRides(list);
    });

    return () => unsub();
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.container}>
        <Text style={styles.title}>My Rides</Text>

        {rides.length === 0 ? (
          <Text style={styles.noRidesText}>No rides booked yet</Text>
        ) : (
          <FlatList
            contentContainerStyle={{ paddingBottom: 40 }}
            data={rides}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.name}>{item.cabName}</Text>

                <View style={styles.row}>
                  <Text style={styles.emoji}>📅</Text>
                  <Text style={styles.detail}>
                    {new Date(item.timestamp).toLocaleString()}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.emoji}>📍</Text>
                  <Text style={styles.detail}>
                    {item.pickup} → {item.drop}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.emoji}>💰</Text>
                  <Text style={styles.detail}>₹{item.fare}</Text>
                </View>
              </View>
            )}
          />
        )}
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
    marginBottom: 18,
    marginTop: 5,
  },
  noRidesText: {
    marginTop: 20,
    fontSize: 16,
    color: "#777",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    marginBottom: 14,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  row: {
    marginVertical: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  emoji: {
    fontSize: 16,
    marginRight: 6,
  },
  detail: {
    fontSize: 15,
    color: "#555",
  },
});
