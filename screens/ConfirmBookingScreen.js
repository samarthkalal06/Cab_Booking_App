//ConfirmBookingScreen.js
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ConfirmBookingScreen({ route, navigation }) {
  const { cab, pickup, drop } = route.params;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Confirm Booking</Text>

        <Text style={styles.label}>Cab:</Text>
        <Text style={styles.value}>{cab.name}</Text>

        <Text style={styles.label}>Pickup:</Text>
        <Text style={styles.value}>{pickup}</Text>

        <Text style={styles.label}>Drop:</Text>
        <Text style={styles.value}>{drop}</Text>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Map", { pickup, drop })}
        >
          <Text style={styles.btnText}>Show Route & Fare</Text>
        </TouchableOpacity>
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
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },
  label: {
    marginTop: 10,
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
});
