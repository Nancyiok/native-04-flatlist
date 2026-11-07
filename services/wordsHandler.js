import axios from "axios";

import { BASE_URL } from "../constants";

export async function getWordInfo(word) {
  try {
    const response = await axios.get(`${BASE_URL}/${word}`);
    const wordInfo = response.data[0];

    if (!wordInfo) return null;

    return {
      word: wordInfo.word,
      phonetics:
        wordInfo.phonetic ?? wordInfo.phonetics?.find((item) => item.text)?.text,
      audio:
        wordInfo.phonetics?.find((item) => item.audio)?.audio ??
        wordInfo.phonetics?.[0]?.audio,
      partOfSpeech: wordInfo.meanings?.[0]?.partOfSpeech,
      meaning: wordInfo.meanings?.[0]?.definitions?.[0]?.definition,
    };
  } catch (error) {
    console.error("Failed to fetch word:", error.message);
    return null;
  }
}
