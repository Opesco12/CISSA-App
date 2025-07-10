import Colors from "@/constants/colors-file";
import { Tabs } from "expo-router";
import { Home3, Map1, More, NotificationStatus } from "iconsax-react-nativejs";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarIconStyle: { marginBottom: 5 },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "700",
        },
        tabBarStyle: {
          height: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Home3 size={size ?? 25} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="maps"
        options={{
          title: "Maps",
          tabBarIcon: ({ color, size }) => (
            <Map1 size={size ?? 25} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="directories"
        options={{
          title: "Directories",
          tabBarIcon: ({ color, size }) => (
            <NotificationStatus size={size ?? 25} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color, size }) => (
            <More size={size ?? 25} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
