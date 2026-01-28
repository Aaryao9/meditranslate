# MediTranslate
English to Nepali Medical Report Translation System

MediTranslate is a domain-adapted English-to-Nepali medical machine translation system designed to improve healthcare accessibility in Nepal. It enhances translation accuracy for medical terminology using Low-Rank Adaptation (LoRA) on top of a pre-trained neural machine translation model. The system also supports scanned and image-based medical reports through Optical Character Recognition (OCR) and provides a web-based interface for easy access.

---

## Abstract

Medical reports in Nepal are commonly written in English using complex medical terminology, making them difficult for many Nepali-speaking patients to understand. MediTranslate addresses this challenge by providing accurate, domain-specific translations from English to Nepali. By applying LoRA-based fine-tuning, the system improves medical translation quality while remaining efficient for low-resource settings. Integrated OCR enables translation of scanned and image-based reports, increasing accessibility and usability.

---

## Features

- English to Nepali medical report translation
- Domain adaptation using Low-Rank Adaptation (LoRA)
- Improved medical terminology accuracy
- OCR support for scanned and image-based reports
- Web-based frontend and backend
- Suitable for low-resource language environments

---

## System Architecture

- Pre-trained Transformer-based machine translation model
- LoRA fine-tuned medical domain adapter
- OCR module for extracting text from images and PDFs
- Backend API for translation and processing
- Web-based frontend for user interaction

---

## Technologies Used

- Python
- Transformers
- Low-Rank Adaptation (LoRA)
- Neural Machine Translation (NMT)
- Optical Character Recognition (OCR)
- FastAPI or Flask
- HTML, CSS, JavaScript
- Git and GitHub

---

## Project Structure

```text
MediTranslate/
│
├── models/                 # Pre-trained and LoRA-adapted models
├── ocr/                    # OCR processing modules
├── translation/            # Translation pipeline
├── backend/                # Backend server and APIs
├── frontend/               # Web user interface
├── data/                   # Medical translation datasets
├── notebooks/              # Training and evaluation notebooks
├── requirements.txt
└── README.md
```
## Installation

Clone the repository and set up the environment.

git clone https://github.com/your-username/MediTranslate.git  
cd MediTranslate  
python -m venv venv  
source venv/bin/activate        # Linux / macOS  
venv\Scripts\activate           # Windows  
pip install -r requirements.txt  

## Running the Application

Backend:

python backend/app.py  

Backend runs at:  
http://localhost:8000  

Frontend:

cd frontend  
npm install  
npm start  

Frontend runs at:  
http://localhost:3000  

## Usage

1. Open the web application in a browser.  
2. Upload a medical report (plain text, image, or scanned PDF).  
3. OCR extracts text from image-based or scanned documents.  
4. The translation model converts English text into Nepali.  
5. The translated medical report is displayed to the user.  

## API Endpoints

POST /ocr  
Input: Image or scanned PDF  
Output: Extracted English text  

POST /translate  
Input: English medical text  
Output: Nepali translation  

## Evaluation

- Automatic evaluation using BLEU score  
- Manual evaluation by native Nepali speakers  
- Medical terminology accuracy analysis  

## Configuration

Configuration file location:  
backend/config.yaml  

Example configuration:

model_name: pretrained_mt_model  
use_lora: true  
lora_rank: 8  
ocr_engine: tesseract  

## Deployment

Production server:

uvicorn backend.app:app --host 0.0.0.0 --port 8000  

Docker deployment:

docker build -t meditranslate .  
docker run -p 8000:8000 meditranslate  

## Limitations

- OCR quality directly affects translation accuracy  
- Handwritten medical reports are not fully supported  
- Rare or highly specialized medical terms may have lower accuracy  

## Future Work

- Nepali voice synthesis for translated output  
- Medical named entity recognition  
- Mobile application support  
- Improved OCR for handwritten medical documents  

