import {
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getWordInfo } from "../services/wordsHandler";
import { playSound } from "../services/soundHandler";
import { APP_SCREENS, COLORS } from "../constants";

const WordDetail = ({ wordInfo, setWords, switchScreen }) => {
  const { word, phonetics, audio, partOfSpeech, meaning } = wordInfo;

  const addHandler = () => {
    setWords((prev) => [...prev, wordInfo]);
    switchScreen(APP_SCREENS.LIST);
  };

  return (
    <View style={styles.detail}>
      <View style={styles.wordRow}>
        <Text style={styles.word}>{word}</Text>
        {!!audio && (
          <Pressable onPress={() => playSound(audio)} hitSlop={8}>
            <Ionicons
              name="volume-medium-outline"
              size={26}
              color={COLORS.primary}
            />
          </Pressable>
        )}
        {!!phonetics && <Text style={styles.phonetics}>{phonetics}</Text>}
      </View>
      {!!partOfSpeech && (
        <Text style={styles.partOfSpeech}>{partOfSpeech}</Text>
      )}
      <Text style={styles.meaning}>{meaning}</Text>
      <Pressable
        style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
        onPress={addHandler}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </Pressable>
    </View>
  );
};

const WordDetailsEmpty = () =>{
  return <Text>No data</Text>
}

function AddWord({ switchScreen, setWords }) {
  const [searchWord, onChangeSearchWord] = useState("");
  const [wordInfo, setWordInfo] = useState(null);

  useEffect(() => {
    if (!searchWord.trim()) {
      setWordInfo(null);
      return;
    }

    let cancelled = false;
    const timeoutId = setTimeout(async () => {
      const result = await getWordInfo(searchWord.trim());
      if (!cancelled) setWordInfo(result);
    }, 1000);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [searchWord]);

  return (
    <View style={styles.screen}>
      <Pressable
        style={styles.backButton}
        onPress={() => switchScreen(APP_SCREENS.LIST)}
        hitSlop={8}
      >
        <Ionicons name="arrow-back-outline" size={32} color={COLORS.primary} />
      </Pressable>
      <Image
        source={require("../assets/add.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.label}>Your word to search:</Text>
      <TextInput
        onChangeText={onChangeSearchWord}
        value={searchWord}
        style={styles.input}
        placeholder="type here.."
        placeholderTextColor={COLORS.muted}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {wordInfo?  (
        <WordDetail
          wordInfo={wordInfo}
          setWords={setWords}
          switchScreen={switchScreen}
        />
      ): <WordDetailsEmpty noData={!wordInfo}/>}
    </View>
  );
}

export default AddWord;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 16,
  },
  backButton: {
    alignSelf: "flex-start",
    padding: 8,
  },
  image: {
    alignSelf: "center",
    width: "60%",
    height: 150,
    marginBottom: 24,
  },
  label: {
    fontSize: 11,
    color: COLORS.muted,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 16,
    color: "black",
  },
  detail: {
    marginTop: 20,
  },
  wordRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 8,
  },
  word: {
    fontSize: 28,
    color: "black",
  },
  phonetics: {
    fontSize: 18,
    color: "black",
  },
  partOfSpeech: {
    fontSize: 18,
    color: "black",
    paddingHorizontal: 8,
  },
  meaning: {
    fontSize: 14,
    color: "black",
    marginTop: 12,
    paddingHorizontal: 8,
  },
  addButton: {
    marginTop: 16,
    backgroundColor: COLORS.addButton,
    borderRadius: 4,
    paddingVertical: 6,
    alignItems: "center",
  },
  pressed: {
    opacity: 0.8,
  },
  addButtonText: {
    color: "white",
    fontSize: 22,
  },
});
