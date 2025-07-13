import Screen from "@/components/Screen";
import Colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Departments = () => {
  return (
    <Screen>
      <View style={[styles.content, { paddingTop: StatusBar.currentHeight }]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.title}>Departments</Text>
            <Text style={styles.paragraph}>
              The Faculty of Communication and Information Sciences comprises
              the following departments:
            </Text>
            <Text style={styles.departmentItem}>• Computer Science</Text>
            <Text style={styles.departmentItem}>• Information Technology</Text>
            <Text style={styles.departmentItem}>• Mass Communication</Text>
            <Text style={styles.departmentItem}>
              • Library and Information Science
            </Text>
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: { flex: 1, backgroundColor: "#F5F5F5" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#FFF",
    elevation: 2,
  },
  backButton: { padding: 4 },
  scrollContent: { flex: 1 },
  card: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 12,
  },
  departmentItem: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 8,
    paddingLeft: 10,
  },
});

export default Departments;
