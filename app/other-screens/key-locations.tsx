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

const KeyLocations = () => {
  return (
    <Screen style={{ flex: 1 }}>
      <View style={styles.content}>
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
        <ScrollView
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <Text style={styles.title}>Key Offices and Lecture Halls</Text>

            <Text style={styles.sectionTitle}>Ground Floor</Text>
            <View style={styles.floorSection}>
              <Text style={styles.paragraph}>Conference Room</Text>
              <Text style={styles.paragraph}>News Room</Text>
              <Text style={styles.paragraph}>CISSA Exec Office</Text>
            </View>

            <Text style={styles.sectionTitle}>First Floor</Text>
            <View style={styles.floorSection}>
              <Text style={styles.paragraph}>Department Offices</Text>
              <Text style={styles.paragraph}>UI/UX Lab</Text>
              <Text style={styles.paragraph}>Faculty Office</Text>
              <Text style={styles.paragraph}>Dean's Office</Text>
              <Text style={styles.paragraph}>Sub-Dean's Office</Text>
            </View>

            <Text style={styles.sectionTitle}>Second Floor</Text>
            <View style={styles.floorSection}>
              <Text style={styles.paragraph}>Nacoss Exec Office</Text>
            </View>

            <Text style={styles.sectionTitle}>Third Floor</Text>
            <View style={styles.floorSection}>
              <Text style={styles.paragraph}>Lectures Room(1-5)</Text>
              <Text style={styles.paragraph}>Computer Lab</Text>
              <Text style={styles.paragraph}>TCS Lab</Text>
              <Text style={styles.paragraph}>Photo Lab</Text>
            </View>
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
  backButton: {
    // padding: 4,
  },
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
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.primary,
    marginTop: 8,
    marginBottom: 4,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    lineHeight: 24,
    marginBottom: 12,
    textAlign: "justify",
  },
  floorSection: {
    marginBottom: 16,
  },
  highlight: {
    fontWeight: "500",
    color: Colors.primary,
  },
});

export default KeyLocations;
