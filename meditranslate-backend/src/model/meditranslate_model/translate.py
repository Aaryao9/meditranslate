# translate.py
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch
import sys
import json

# 1️⃣ Load model once at startup
MODEL_NAME = "rujengelal/my_awesome_english_to_nepali_tst"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)
device = "cuda" if torch.cuda.is_available() else "cpu"
model.to(device)
model.eval()

# 2️⃣ Translation function
def translate_en_to_ne(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True).to(device)
    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_new_tokens=128,
            num_beams=4,
            early_stopping=True
        )
    return tokenizer.decode(outputs[0], skip_special_tokens=True)

# 3️⃣ Node.js communication via stdin/stdout
if __name__ == "__main__":
    try:
        input_text = sys.stdin.read()
        data = json.loads(input_text)
        text = data.get("text", "")
        result = translate_en_to_ne(text)
        print(json.dumps({"translation": result}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
