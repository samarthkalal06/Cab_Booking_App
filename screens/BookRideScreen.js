import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookRideScreen({ route, navigation }) {
  const { cab } = route.params;

  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");

  const goToMap = () => {
    if (!pickup || !drop) {
      alert("Please enter both pickup and drop location");
      return;
    }

    navigation.navigate("Map", {
      cab,
      pickup,
      drop,
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Book Your Ride</Text>

        <Text style={styles.label}>Cab Selected:</Text>
        <Text style={styles.value}>{cab.name}</Text>

        <TextInput
          placeholder="Enter Pickup Location"
          style={styles.input}
          onChangeText={setPickup}
        />

        <TextInput
          placeholder="Enter Drop Location"
          style={styles.input}
          onChangeText={setDrop}
        />

        <TouchableOpacity style={styles.btn} onPress={goToMap}>
          <Text style={styles.btnText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F2F4F7" },
  container: { padding: 20 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  label: { marginTop: 10, fontWeight: "600" },
  value: { fontSize: 16, marginBottom: 15 },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  btn: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
});
