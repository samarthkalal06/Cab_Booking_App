//LoginScreen.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { auth } from "../firebase";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) return alert("Fill both fields");

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      alert(e.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/coastal_cab_logo.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>Coastal Cab</Text>
      <Text style={styles.subtitle}>Ride Safe. Ride Smart.</Text>

      <View style={styles.card}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#555"
          style={styles.input}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#555"
          style={styles.input}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={login}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Create Account →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFD93D", // Yellow Theme
    alignItems: "center",
    paddingTop: 80,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#000",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#000",
  },
  subtitle: {
    color: "#333",
    marginBottom: 25,
    fontSize: 14,
  },
  card: {
    width: "88%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 15,
    elevation: 10,
  },
  input: {
    backgroundColor: "#F4F4F4",
    padding: 12,
    marginVertical: 8,
    borderRadius: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 12,
    color: "#000",
    fontWeight: "600",
    textAlign: "center",
  },
});
