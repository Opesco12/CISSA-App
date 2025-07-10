import Screen from "@/components/Screen";
import Colors from "@/constants/app-colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const VisionMission = () => {
  return (
    <Screen>
      <View style={[styles.content]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#666" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.title}>Vision and Mission</Text>
            <Text style={styles.sectionTitle}>Vision Statement</Text>
            <Text style={styles.paragraph}>
              The vision of the Faculty is to become the flagship faculty in the
              University, and to sustain its uniqueness and its topmost position
              in the scholarship of communication and information processes in
              Nigeria.
            </Text>
            <Text style={styles.sectionTitle}>Mission Statement</Text>
            <Text style={styles.paragraph}>
              The mission of the Faculty is to produce highly skilled
              professional communication and information experts by providing,
              within the University’s philosophical framework, quality
              theoretical and practical education and training in communication
              technology and process.
            </Text>
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#FFF",
  },
  backButton: { padding: 4 },
  scrollContent: { flex: 1 },
  card: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.primary,
    marginVertical: 12,
  },
  paragraph: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 12,
    textAlign: "justify",
  },
});

export default VisionMission;
