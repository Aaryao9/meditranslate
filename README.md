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
