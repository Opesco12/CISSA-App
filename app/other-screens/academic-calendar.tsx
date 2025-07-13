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

import Calendar from "../../assets/academic_calendar.json";

type CalendarEvent = {
  [key: string]: string;
};

type AcademicCalendarType = {
  Academic_Calendar: CalendarEvent;
};

const AcademicCalendar: React.FC = () => {
  const renderTableSection = (title: string, events: CalendarEvent) => (
    <View style={styles.section}>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCell, styles.headerCell]}>Event</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>Details</Text>
        </View>
        {Object.entries(events).map(([event, details]) => (
          <View
            key={event}
            style={styles.tableRow}
          >
            <Text style={styles.tableCell}>{event.replace(/_/g, " ")}</Text>
            <Text style={styles.tableCell}>{details}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <Screen style={{ flex: 1 }}>
      <View style={[styles.content, {}]}>
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
            <Text style={styles.title}>Academic Calendar</Text>
            {renderTableSection(
              "Academic Calendar",
              (Calendar as AcademicCalendarType)["Academic_Calendar"]
            )}
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
  section: {
    marginBottom: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableCell: {
    flex: 1,
    padding: 10,
    color: "#333",
    fontSize: 15,
  },
  headerCell: {
    fontWeight: "bold",
    color: "#fff",
  },
});

export default AcademicCalendar;
