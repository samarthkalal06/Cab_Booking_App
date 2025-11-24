import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../firebase";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState(""); // ⭐ Phone number
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    (async () => {
      const savedName = await AsyncStorage.getItem("name");
      const savedGender = await AsyncStorage.getItem("gender");
      const savedAge = await AsyncStorage.getItem("age");
      const savedPhone = await AsyncStorage.getItem("phone");

      if (savedName) setName(savedName);
      if (savedGender) setGender(savedGender);
      if (savedAge) setAge(savedAge);
      if (savedPhone) setPhone(savedPhone);
    })();
  }, []);

  const save = async () => {
    await AsyncStorage.setItem("name", name);
    await AsyncStorage.setItem("gender", gender);
    await AsyncStorage.setItem("age", age);
    await AsyncStorage.setItem("phone", phone);
    setEditing(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>My Profile</Text>

        {/* NAME */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          editable={editing}
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Enter your name"
        />

        {/* PHONE NUMBER */}
        <Text style={styles.label}>Mobile Number</Text>

        <View style={styles.phoneRow}>
          <Text style={styles.prefix}>+91</Text>
          <TextInput
            editable={editing}
            value={phone}
            onChangeText={(t) => {
              if (/^\d{0,10}$/.test(t)) setPhone(t);
            }}
            keyboardType="number-pad"
            style={styles.phoneInput}
            placeholder="10-digit mobile number"
            maxLength={10}
          />
        </View>

        {/* GENDER RADIO BUTTONS */}
        <Text style={styles.label}>Gender</Text>
        <View style={styles.radioGroup}>
          {["Male", "Female", "Other"].map((g) => (
            <TouchableOpacity
              key={g}
              disabled={!editing}
              style={styles.radioOption}
              onPress={() => setGender(g)}
            >
              <View style={styles.radioCircle}>
                {gender === g && <View style={styles.radioDot} />}
              </View>
              <Text style={styles.radioLabel}>{g}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* AGE DROPDOWN */}
        <Text style={styles.label}>Age</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            enabled={editing}
            selectedValue={age}
            onValueChange={(v) => setAge(v)}
          >
            <Picker.Item label="Select age" value="" />
            {Array.from({ length: 89 }, (_, i) => i + 12).map((n) => (
              <Picker.Item key={n} label={`${n}`} value={`${n}`} />
            ))}
          </Picker>
        </View>

        {/* BUTTONS */}
        {editing ? (
          <TouchableOpacity style={styles.saveBtn} onPress={save}>
            <Text style={styles.btnText}>Save Details</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.editBtn} onPress={() => setEditing(true)}>
            <Text style={styles.btnText}>Edit Profile</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => signOut(auth)} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F2F4F7" },
  container: { padding: 20 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 15 },
  label: { marginTop: 10, marginBottom: 4, fontWeight: "600" },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  /* PHONE */
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  prefix: { fontSize: 16, marginRight: 10, fontWeight: "bold" },
  phoneInput: { flex: 1, padding: 12 },

  /* RADIO BUTTONS */
  radioGroup: { flexDirection: "row", marginTop: 5 },
  radioOption: { flexDirection: "row", alignItems: "center", marginRight: 20 },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  radioDot: {
    width: 10,
    height: 10,
    backgroundColor: "#0A79DF",
    borderRadius: 5,
  },
  radioLabel: { marginLeft: 6, fontSize: 16 },

  /* AGE DROPDOWN */
  pickerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  /* BUTTONS */
  editBtn: {
    marginTop: 20,
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
  },
  saveBtn: {
    marginTop: 20,
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
  logoutBtn: {
    marginTop: 20,
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
  },
  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
});
