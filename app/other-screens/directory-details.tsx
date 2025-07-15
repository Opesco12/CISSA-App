import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Screen from "@/components/Screen";
import Colors from "@/constants/app-colors";

const FacultyProfileScreen = () => {
  const data = useLocalSearchParams();

  const handleCall = () => {
    const phone = Array.isArray(data?.phoneNumber)
      ? data.phoneNumber[0]
      : data?.phoneNumber;
    if (phone) {
      Linking.openURL(`tel:${phone.trim()}`).catch((e) => console.error(e));
    }
  };

  const handleEmail = () => {
    const email = Array.isArray(data?.email) ? data.email[0] : data?.email;
    if (email) {
      Linking.openURL(`mailto:${email}`).catch((e) => console.error(e));
    }
  };

  return (
    <Screen>
      <View style={[styles.content, {}]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons
              name="arrow-back"
              size={24}
              color="#666"
              onPress={() => router.back()}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.profileContainer}>
          {data?.avatar === "" ? (
            <Ionicons
              name="person-circle-outline"
              size={150}
              color="#CCC"
              style={styles.avatar}
            />
          ) : (
            <Image
              src={Array.isArray(data?.avatar) ? data.avatar[0] : data?.avatar}
              style={{
                width: 150,
                height: 150,
                borderRadius: 75,
                marginBottom: 8,
              }}
            />
          )}

          <Text style={styles.name}>{data?.name}</Text>
          <View style={styles.contactIcons}>
            <TouchableOpacity
              style={[styles.contactIcon, { backgroundColor: "#28A745" }]}
              onPress={handleCall}
            >
              <Ionicons
                name="call"
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.contactIcon, { backgroundColor: "#007BFF" }]}
              onPress={handleEmail}
            >
              <Ionicons
                name="mail"
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.details}>
            <View style={{ alignItems: "center", gap: 5 }}>
              <Text style={styles.label}>Staff Role</Text>
              <Text style={styles.value}>{data?.title}</Text>
            </View>
          </View>

          <View style={styles.officeCard}>
            <Text style={styles.label}>Office Direction</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
                marginVertical: 8,
              }}
            >
              <Text style={[styles.value, { textAlign: "center" }]}>
                {data?.officeAddress}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  content: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#FFF",
  },
  backButton: { padding: 4 },
  reportIssue: { color: "#8B4513", fontSize: 16 },
  profileContainer: { alignItems: "center", padding: 16 },
  avatar: { marginBottom: 8 },
  name: { fontSize: 25, fontWeight: "600", color: "#333" },
  email: {
    fontSize: 17,
    color: "#666",
    paddingTop: 10,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  contactIcons: { flexDirection: "row", marginVertical: 16 },
  contactIcon: {
    padding: 8,
    marginHorizontal: 8,
    backgroundColor: "#FFF",
    borderRadius: 20,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  label: { fontSize: 14, color: "#666" },
  value: { fontSize: 16, fontWeight: "500", color: "#333", marginBottom: 8 },
  officeCard: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  officeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#808080",
    marginBottom: 8,
  },
  officeText: { fontSize: 14, color: "#333" },
  directionsButton: {
    backgroundColor: "#8B4513",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  directionsText: { color: "#FFF", fontWeight: "600" },
  bottomNav: { borderTopWidth: 1, borderTopColor: "#DDD" },
});

export default FacultyProfileScreen;
