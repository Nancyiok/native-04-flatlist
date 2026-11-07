import {
  FlatList,
  Image,
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { APP_SCREENS, COLORS } from "../constants";
import { playSound } from "../services/soundHandler";

const ShortWordItemInfo = ({ item, onDelete }) => {
  const playHandler = () => {
    if (item.audio) playSound(item.audio);
  };

  return (
    <View style={styles.wordItem}>
      <Pressable onPress={playHandler} hitSlop={8}>
        <Ionicons name="play-outline" size={28} color={COLORS.primary} />
      </Pressable>
      <View style={styles.wordInfo}>
        <Text style={styles.wordText}>{item.word}</Text>
        <Text style={styles.meaningText}>{item.meaning}</Text>
      </View>
      <Pressable onPress={onDelete} hitSlop={8}>
        <Ionicons name="trash-outline" size={24} color={COLORS.danger} />
      </Pressable>
    </View>
  );
};

const AddButton = ({ switchScreen }) => (
  <Pressable
    style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
    onPress={() => switchScreen(APP_SCREENS.ADD)}
  >
    <Ionicons name="add-outline" size={40} color="white" />
  </Pressable>
);

const EmptyWordList = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyWordText}>No words yet</Text>
  </View>
);

function AllWords({ words, switchScreen, setWords }) {
  const deleteHandler = (index) => {
    setWords((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Image
          source={require("../assets/title-reading-side.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <FlatList
        style={styles.wordList}
        contentContainerStyle={styles.wordListContent}
        data={words}
        keyExtractor={(item, index) => `${item.word}-${index}`}
        renderItem={({ item, index }) => (
          <ShortWordItemInfo item={item} onDelete={() => deleteHandler(index)} />
        )}
        ListEmptyComponent={<EmptyWordList />}
      />
      <AddButton switchScreen={switchScreen} />
    </View>
  );
}

export default AllWords;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    height: 230,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  image: {
    width: "60%",
    height: 160,
  },
  addButton: {
    position: "absolute",
    right: 32,
    top: 186, 
    zIndex: 40,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.8,
  },
  wordList: {
    flex: 1,
  },
  wordListContent: {
    paddingTop: 28,
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  wordItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  wordInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  wordText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  meaningText: {
    fontSize: 14,
    color: "#222",
  },
  emptyContainer: {
    height: 270,
    marginHorizontal: -8,
    marginTop: -28,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyWordText: {
    fontSize: 32,
    color: COLORS.muted,
  },
});
