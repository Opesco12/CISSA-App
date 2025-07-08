import { Ionicons } from "@expo/vector-icons";
import { ArrowCircleRight2, Notification } from "iconsax-react-nativejs";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Screen from "@/components/Screen";
import Colors from "@/constants/colors";
import { router } from "expo-router";

const deviceWidth = Dimensions.get("window").width;
const HomeScreen = () => {
  const RenderMenuItem = ({ item, style }) => (
    <TouchableOpacity style={[styles.card, style]}>
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

  const Item = ({ text, onPress }) => {
    return (
      <Pressable onPress={onPress}>
        <View
          style={{
            borderWidth: 1,
            borderColor: Colors.border,
            borderRadius: 8,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 15,
          }}
        >
          <Text
            style={[
              {
                paddingVertical: 20,
                fontSize: 19,
                fontWeight: "600",
                color: Colors.primary,
              },
            ]}
          >
            {text}
          </Text>
          <ArrowCircleRight2
            size={25}
            color={Colors.primary}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <Screen>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.header}>Welcome, Cissaites👋</Text>
        <View style={styles.iconContainer}>
          <Notification size={24} />
        </View>
      </View>

      <Pressable onPress={() => router.push("/(tabs)/maps")}>
        <Image
          source={require("@/assets/images/Map.png")}
          style={{ width: deviceWidth - 30, height: 200 }}
          resizeMode="contain"
        />
      </Pressable>

      <View style={{ gap: 20 }}>
        <Item
          text={"Find Locations"}
          onPress={() => router.push("/(tabs)/maps")}
        />
        <Item
          text={"Faculty Directors"}
          onPress={() => router.push("/(tabs)/directories")}
        />
        <Item
          text={"Student Support and Resources"}
          onPress={() => router.push("/(tabs)/more")}
        />
        <Item
          text={"About CIS"}
          onPress={() => router.push("/(tabs)/more")}
        />
      </View>
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
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 34,
    height: 34,
    borderRadius: 17,
    borderColor: Colors.border,
    borderWidth: 2,
  },
  textContainer: { flex: 1, gap: 5 },
  name: { fontSize: 19, marginVertical: 8, fontWeight: "600", color: "#333" },
  title: { fontSize: 15, color: "#666" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
  },
  sectionHeader: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.primary,
    marginTop: 15,
  },
});

export default HomeScreen;

//  <View
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "space-between",
//           marginTop: 20,
//           marginBottom: 10,
//         }}
//       >
//         <Text
//           style={[styles.sectionHeader, { color: "#3f3f3f", marginTop: 0 }]}
//         >
//           Important Announcement
//         </Text>
//         <Text style={[styles.title, { color: "#E9B82D" }]}>View All</Text>
//       </View>
//       <View
//         style={{
//           borderWidth: 1,
//           borderColor: Colors.border,
//           borderRadius: 8,
//           padding: 15,
//         }}
//       >
//         <Text style={[styles.sectionHeader, { marginTop: 0, fontSize: 17 }]}>
//           CIS URGENT: Event Hall Change For All 100-Level Students
//         </Text>
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             marginVertical: 5,
//             marginTop: 10,
//             gap: 3,
//           }}
//         >
//           <Location
//             size={14}
//             color="black"
//           />
//           <Text style={{ fontSize: 14, color: "#3f3f3f" }}>
//             New Location: Lecture Room 3
//           </Text>
//         </View>
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             marginVertical: 5,
//             gap: 3,
//           }}
//         >
//           <Calendar size={14} />
//           <Text style={{ fontSize: 14, color: "#3f3f3f" }}>
//             Monday 12th February, 2025
//           </Text>
//         </View>
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             marginVertical: 5,
//             gap: 3,
//           }}
//         >
//           <Timer1 size={14} />
//           <Text style={{ fontSize: 14, color: "#3f3f3f" }}>8:00 AM</Text>
//         </View>
//       </View>
