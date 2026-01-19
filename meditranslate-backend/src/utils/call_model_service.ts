import axios from "axios";

/**
 * Sends text to the Python model microservice and returns the translated text
 * @param text The OCR-extracted English medical text
 * @returns Nepali translated text
 */
export const translateMedicalText = async (text: string): Promise<string> => {
  try {
    const response = await axios.post("http://localhost:8000/translate", { text });
    return response.data.translated_text;
  } catch (err) {
    console.error("Error calling Python model service:", err);
    return "Translation failed";
  }
};
