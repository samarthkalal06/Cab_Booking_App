//BookingSuccessScreen.js
import { addDoc, collection } from "firebase/firestore";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../firebase";

export default function BookingSuccessScreen({ route, navigation }) {
  const { pickup, drop, cab, fare } = route.params;

  useEffect(() => {
    addDoc(collection(db, "rides"), {
      userId: auth.currentUser.uid,
      cabName: cab.name,
      pickup,
      drop,
      fare,
      status: "Paid",
      timestamp: Date.now()
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.big}>🎉 Booking Confirmed!</Text>

      <View style={styles.box}>
        <Text>Cab: {cab.name}</Text>
        <Text>Pickup: {pickup}</Text>
        <Text>Drop: {drop}</Text>
        <Text>Paid: ₹{fare}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Tabs", { screen: "Home" })}
      >
        <Text style={styles.btnText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  big: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  box: { padding: 15, borderWidth: 1, borderRadius: 10, marginBottom: 20, width: "100%" },
  button: { backgroundColor: "green", padding: 15, borderRadius: 10, width: "100%" },
  btnText: { color: "white", fontWeight: "bold", textAlign: "center" }
});
