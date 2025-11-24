import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentScreen({ route, navigation }) {
  const { pickup, drop, cab, fare } = route.params;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Payment</Text>

        <View style={styles.box}>
          <Text style={styles.bold}>Fare: ₹{fare}</Text>
          <Text>Cab: {cab.name}</Text>
          <Text>Pickup: {pickup}</Text>
          <Text>Drop: {drop}</Text>
        </View>

        <TouchableOpacity
          style={styles.payBtn}
          onPress={() =>
            navigation.navigate("BookingSuccess", { pickup, drop, cab, fare })
          }
        >
          <Text style={styles.btnText}>Pay Now</Text>
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
    flex: 1,
    padding: 20,
    paddingTop: 15, // 👈 This moves the heading down
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bold: { fontWeight: "bold" },
  box: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 30,
    backgroundColor: "#fff",
  },
  payBtn: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
