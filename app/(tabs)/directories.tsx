import Screen from "@/components/Screen";
import Colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Directories = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const facultyData = [
    {
      id: "1",
      name: "Prof. Azeez Adesina Lukman",
      title: "Dean",
      avatar:
        "https://cis.unilorin.edu.ng/wp-content/uploads/sites/200/2024/08/CIS-Dr-Saadueen-Azeez-Adesine-400x440.jpg",
    },
    {
      id: "2",
      name: "Prof. Oladele Rufus Olalere",
      title: "HOD • Computer Science",
      avatar: "",
    },
    {
      id: "3",
      name: "Dr. Muhtahir Oluwaseyi Oloyede",
      title: "HOD • Information Technology",
      avatar: "",
    },
    {
      id: "3",
      name: "Prof. Adeyinka Tella",
      title: "HOD • Library and Information Science",
      avatar: "",
    },
    {
      id: "3",
      name: "Dr. Patrick Udende",
      title: "HOD • Mass Communication",
      avatar: "",
    },
    {
      id: "3",
      name: "Dr. (Mrs.) Temitayo Caroline Adeniran",
      title: "HOD • Telecommunication Science",
      avatar: "",
    },
  ];

  const RenderFacultyItem = ({ item, style }) => (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={() =>
        router.push({
          pathname: "/other-screens/directory-details",
          params: item,
        })
      }
    >
      {item?.avatar === "" ? (
        <Ionicons
          name="person-circle-outline"
          size={40}
          color="#666"
          style={styles.avatar}
        />
      ) : (
        <Image
          src={item?.avatar}
          style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12 }}
        />
      )}

      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={20}
        color="#FFD700"
      />
    </TouchableOpacity>
  );

  const RenderDepartmentItem = ({ item, style }) => (
    <TouchableOpacity style={[styles.card, style]}>
      <Ionicons
        name="person-circle-outline"
        size={40}
        color="#666"
        style={styles.avatar}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={20}
        color="#FFD700"
      />
    </TouchableOpacity>
  );

  return (
    <Screen>
      <Text style={styles.header}>Faculty Directories</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Name, Phone Number, or Department"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Text style={styles.sectionHeader}>Faculty Directors</Text>

      <View
        style={{ borderWidth: 1, borderColor: Colors.border, borderRadius: 8 }}
      >
        {facultyData?.map((item, index) => (
          <RenderFacultyItem
            key={index}
            item={item}
            style={{
              borderBottomWidth: index !== facultyData.length - 1 ? 1 : 0,
              borderBottomColor: Colors.border,
            }}
          />
        ))}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
    color: "#333",
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 8,
    marginVertical: 16,
  },
  sectionHeader: {
    fontSize: 17,
    fontWeight: "600",
    color: "#8B4513",
    paddingVertical: 8,
    marginVertical: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
  },
  avatar: { marginRight: 12 },
  textContainer: { flex: 1, gap: 5 },
  name: { fontSize: 16, fontWeight: "600", color: "#333" },
  title: { fontSize: 14, color: "#666" },
});

export default Directories;
