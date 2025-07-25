import { Ionicons } from "@expo/vector-icons";
import { ArrowCircleRight2 } from "iconsax-react-nativejs";
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
import Colors from "@/constants/app-colors";
import { RenderMenuItemProps } from "@/constants/types";
import { router } from "expo-router";

const deviceWidth = Dimensions.get("window").width;
const HomeScreen = () => {
  const RenderMenuItem = ({ item, style }: RenderMenuItemProps) => (
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

  const Item = ({ text, onPress }: { text: string; onPress: () => void }) => {
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("@/assets/images/unilorin_logo.png")}
            style={styles.logo}
          />
          <Image
            source={require("@/assets/images/cis.png")}
            style={styles.logo}
          />
        </View>
      </View>

      <Pressable onPress={() => router.push("/(tabs)/maps")}>
        <Image
          source={require("@/assets/images/Map.png")}
          style={{ width: deviceWidth - 20, height: 200 }}
          resizeMode="contain"
        />
      </Pressable>

      <View style={{ gap: 15 }}>
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
          text="Academic Calendar"
          onPress={() => router.push("/other-screens/academic-calendar")}
        />
        <Item
          text="Key Offices and Lecture Halls"
          onPress={() => router.push("/other-screens/key-locations")}
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
  logo: {
    height: 35,
    width: 35,
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
