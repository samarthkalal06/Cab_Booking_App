//RegisterScreen.js 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../firebase";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (!email || !password) return alert("Fill all fields");

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
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

      <Text style={styles.title}>Join Coastal Cab</Text>
      <Text style={styles.subtitle}>Create your account</Text>

      <View style={styles.card}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={setEmail}
          placeholderTextColor="#444"
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          onChangeText={setPassword}
          placeholderTextColor="#444"
        />

        <TouchableOpacity style={styles.button} onPress={register}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Register</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.link}>← Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFD93D",
    alignItems: "center",
    paddingTop: 70,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#000",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#000",
    marginTop: 10,
  },
  subtitle: {
    color: "#333",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    width: "88%",
    borderRadius: 15,
    padding: 25,
    elevation: 10,
  },
  input: {
    backgroundColor: "#F4F4F4",
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
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
    textAlign: "center",
    color: "#000",
    fontWeight: "600",
  },
});
