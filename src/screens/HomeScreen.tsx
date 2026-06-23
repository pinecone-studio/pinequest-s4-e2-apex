import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

export default function HomeScreen() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to PineQuest!</Text>
        <Text style={styles.subtitle}>Start building your mobile app</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Next Steps:</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  section: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#333",
  },
  counterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  countText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333",
    minWidth: 80,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  inputDisplay: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
    fontStyle: "italic",
  },
  infoBox: {
    backgroundColor: "#E3F2FD",
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1976D2",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
});
