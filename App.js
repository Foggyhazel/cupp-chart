import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Line from "./src/Line";
import Area from "./src/Area";

export default function App() {
  const [state, setState] = useState("rest");
  const [log, setLog] = useState("");

  return (
    <View style={styles.container}>
      <Line />
      <Area />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    backgroundColor: "green",
    padding: 100,
  },
});
