import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  // ✅ รับ navigation เข้ามา
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://cis.kku.ac.th/api/classroom/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "f620980b5f9b7bce63610bc361d483b76954541ee73d0d9bf3e6c0bc64314f1d",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const text = await response.text();
      console.log("Raw response:", text);

      const data = JSON.parse(text);
      console.log("Parsed JSON:", data);

      if (response.ok) {
        console.log("Login success:", data);
        const token = data.data?.token;
        if (token) {
          await AsyncStorage.setItem("token", token);

          // ✅ ไปหน้า Home โดยไม่ต้องกดอะไร
          navigation.replace("Home");
        } else {
          console.warn("⚠️ Token not found in response:", data);
          alert("Login failed: token not found.");
        }
      } else {
        alert("Login failed: " + (data.message || "Invalid credentials"));
      }
    } catch (error) {
      alert("Network error");
      console.error("❌ Error detail:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KKU CIS Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <Button title="Sign In" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
});
