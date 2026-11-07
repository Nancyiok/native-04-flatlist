import AllWords from "./screens/AllWords";
import AddWord from "./screens/AddWord";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "./constants";
import {
  SafeAreaProvider,
  SafeAreaView,
  initialWindowMetrics,
} from "react-native-safe-area-context";

const DEFAULT_METRICS = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

export default function App() {
  const [words, setWords] = useState([]);
  const [screen, switchScreen] = useState("");

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics || DEFAULT_METRICS}>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <View style={styles.container}>
          {screen === "add" ? (
            <AddWord setWords={setWords} switchScreen={switchScreen} />
          ) : (
            <AllWords
              words={words}
              setWords={setWords}
              switchScreen={switchScreen}
            />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
});