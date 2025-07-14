import Screen from "@/components/Screen";
import Colors from "@/constants/app-colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface FacultyItemProps {
  id: string;
  name: string;
  title: string;
  avatar: string;
  phoneNumber: string;
  email: string;
  officeAddress?: string;
}

const Directories = () => {
  const facultyData: FacultyItemProps[] = [
    {
      id: "1",
      name: "Prof. Azeez Adesina Lukman",
      title: "Dean",
      avatar:
        "https://cis.unilorin.edu.ng/wp-content/uploads/sites/200/2024/08/CIS-Dr-Saadueen-Azeez-Adesine-400x440.jpg",
      phoneNumber: "07067124477",
      email: "azeez.al@unilorin.edu.ng",
      officeAddress: "Room 69, Floor 2, CIS Building, University of Ilorin",
    },
    {
      id: "2",
      name: "Dr. Amos Orenyi Bajeh",
      title: "Sub-Dean",
      avatar:
        "https://csc.cis.unilorin.edu.ng/wp-content/uploads/sites/60/2024/08/DSC05820-280x345.jpg",
      phoneNumber: "07067124477",
      email: "bajehamos@unilorin.edu.ng",
      officeAddress: "Room 29, Floor 0, CIS Building, University of Ilorin",
    },
    {
      id: "3",
      name: "Prof. Oladele Rufus Olalere",
      title: "HOD • Computer Science",
      avatar:
        "https://csc.cis.unilorin.edu.ng/wp-content/uploads/sites/60/2024/08/prof_Oladele-1-280x344.jpg",
      phoneNumber: " 07064203812",
      email: "roladele@unilorin.edu.ng",
      officeAddress: "Room 53, 2nd Floor, CIS Building, University of Ilorin.",
    },
    {
      id: "4",
      name: "Dr. Muhtahir Oluwaseyi Oloyede",
      title: "HOD • Information Technology",
      avatar:
        "https://it.cis.unilorin.edu.ng/wp-content/uploads/sites/61/2024/08/MO-Oloyede-280x345.jpg",
      phoneNumber: "08105920003",
      email: "oloyede.om@unilorin.edu.ng",
      officeAddress:
        "Room 2, Ground Floor, CIS Lecture Theatre Building, University of Ilorin",
    },
    {
      id: "5",
      name: "Prof. Adeyinka Tella",
      title: "HOD • Library and Information Science",
      avatar:
        "https://lisc.cis.unilorin.edu.ng/wp-content/uploads/sites/62/2024/08/Tella-Photo-a6-280x345.jpg",
      phoneNumber: "07069793211",
      email: "tella.a@unilorin.edu.ng",
      officeAddress: "Room 5, 1st Floor, CIS Building, University of Ilorin",
    },
    {
      id: "6",
      name: "Dr. Patrick Udende",
      title: "HOD • Mass Communication",
      avatar:
        "https://mc.cis.unilorin.edu.ng/wp-content/uploads/sites/136/2024/08/DSC05796-280x345.jpg",
      phoneNumber: "08051518456",
      email: "udende.p@unilorin.edu.ng",
      officeAddress:
        "Room 57, Second Floor, FCIS Building, University of Ilorin, Ilorin",
    },
    {
      id: "7",
      name: "Dr. (Mrs.) Temitayo Caroline Adeniran",
      title: "HOD • Telecommunication Science",
      avatar:
        "https://tsc.cis.unilorin.edu.ng/wp-content/uploads/sites/66/2024/08/BeautyPlus_20241021232341851_save-280x345.jpg",
      phoneNumber: "08163857493",
      email: "adeniran.tc@unilorin.edu.ng",
      officeAddress: "Room 12, Floor, CIS Building, University of Ilorin",
    },
  ];

  const RenderFacultyItem = ({
    item,
    style,
  }: {
    item: FacultyItemProps;
    style?: any;
  }) => (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={() =>
        router.push({
          pathname: "/other-screens/directory-details",
          params: {
            id: item.id,
            name: item.name,
            title: item.title,
            avatar: item.avatar,
            phoneNumber: item.phoneNumber,
            email: item.email,
          },
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

  return (
    <Screen>
      <Text style={styles.header}>Faculty Directories</Text>

      <View
        style={{
          borderWidth: 1,
          borderColor: Colors.border,
          borderRadius: 8,
          marginVertical: 10,
        }}
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
