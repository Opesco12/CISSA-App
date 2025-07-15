import React, { ReactNode } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

const Screen = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: object;
}) => {
  return (
    <View style={styles.container}>
      {Platform.OS === "ios" ? (
        <SafeAreaView style={[styles.content, style]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        </SafeAreaView>
      ) : (
        <View
          style={[
            styles.content,
            { paddingTop: StatusBar.currentHeight },
            style,
          ]}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", paddingHorizontal: 10 },
  content: { flex: 1 },
});

export default Screen;
