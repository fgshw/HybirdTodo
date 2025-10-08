import React from "react";
import { View, Text, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Members"
        onPress={() => navigation.navigate("Members")}
      />
      <Button title="Go to Posts" onPress={() => navigation.navigate("Post")} />
    </View>
  );
}
