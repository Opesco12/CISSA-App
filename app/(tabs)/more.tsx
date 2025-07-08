import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Screen from "@/components/Screen";
import Colors from "@/constants/colors";
import { router } from "expo-router";

import _ from "lodash";

import HandBook from "../../assets/unilorin_handbook.json";

const MoreScreen = () => {
  const facultyOverview = [
    {
      name: "About CIS",
      title: "Description of the faculty vision and mission",
      path: "/other-screens/about-cis",
    },
    {
      name: "Mission & Vision",
      title: "CIS mission and vision statements",
      path: "/other-screens/mission",
    },
  ];

  const RenderMenuItem = ({ item, style, onPress }) => (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={onPress}
    >
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
      <Text style={styles.header}>Know your faculty</Text>

      <Text style={styles.sectionHeader}>Faculty Overview</Text>
      <View
        style={{ borderWidth: 1, borderColor: Colors.border, borderRadius: 8 }}
      >
        {facultyOverview?.map((item, index) => (
          <RenderMenuItem
            key={index}
            item={item}
            style={{
              borderBottomWidth: index !== facultyOverview.length - 1 ? 1 : 0,
              borderBottomColor: Colors.border,
            }}
            onPress={() => router.push(item?.path)}
          />
        ))}
      </View>

      <Text style={styles.sectionHeader}>Student Support & Resources</Text>
      <View
        style={{ borderWidth: 1, borderColor: Colors.border, borderRadius: 8 }}
      >
        {HandBook?.sections.map((section, index) => (
          <RenderMenuItem
            key={index}
            item={{
              name: _.startCase(_.toLower(section.title)),
              title: _.capitalize(_.toLower(section?.subtitle)),
            }}
            onPress={() =>
              router.push({
                pathname: "/other-screens/resources",
                params: {
                  title: section.title,
                  subtitle: section.subtitle,
                  content: section.content,
                },
              })
            }
          />
        ))}
      </View>

      {/* <Text style={styles.sectionHeader}>Emergency Contacts</Text>
      <View
        style={{ borderWidth: 1, borderColor: Colors.border, borderRadius: 8 }}
      >
        <RenderMenuItem
          item={{
            name: "Campus Emergency",
            title: "Contact details for campus security and emergencies",
          }}
        />
      </View> */}
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
    color: "#333",
  },
  sectionHeader: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.primary,
    paddingVertical: 8,
    marginBottom: 8,
    marginTop: 20,
  },
  textContainer: { flex: 1, gap: 5 },
  name: { fontSize: 16, fontWeight: "600", color: "#333" },
  title: { fontSize: 15, color: "#666" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
  },
});

export default MoreScreen;
