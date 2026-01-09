import { UploadedFile, OCRResult, TranslationResult, HistoryItem, MockApiResponse } from '../types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
const mockOCRResult: OCRResult = {
  fileId: 'doc-001',
  extractedText: `Patient Medical Record
Date: January 2, 2026
Patient Name: Ramesh Kumar
Age: 45 years

Chief Complaint: Persistent headache and dizziness

History of Present Illness:
Patient reports experiencing severe headaches for the past 3 weeks. Associated symptoms include dizziness, mild nausea, and photophobia. Pain is rated 7/10 on the pain scale.

Past Medical History:
- Hypertension (controlled)
- Type 2 Diabetes Mellitus
- Asthma

Medications:
- Lisinopril 10mg daily
- Metformin 500mg twice daily
- Albuterol inhaler as needed

Physical Examination:
Blood Pressure: 142/92 mmHg
Heart Rate: 88 bpm
Temperature: 37.2°C
Neurological exam: Normal

Assessment:
Tension headache with possible migraine features

Plan:
1. Start prophylactic treatment with propranolol
2. Perform MRI brain to rule out structural abnormalities
3. Follow up in 2 weeks`,
  confidence: 0.92,
  lowConfidenceAreas: [
    {
      id: 'area-1',
      text: 'photophobia',
      confidence: 0.78,
      position: 180,
    }
  ]
};

const mockTranslationResult: TranslationResult = {
  jobId: 'trans-001',
  originalText: mockOCRResult.extractedText,
  translatedText: `रोगी चिकित्सा रिकर्ड
मिति: जनवरी २, २०२६
रोगीको नाम: रमेश कुमार
उमेर: ४५ वर्ष

मुख्य समस्या: लगातार सिरको दर्द र चक्कर आना

वर्तमान बीमारीको इतिहास:
रोगीले पछिल्लो ३ हप्ता गहिरो सिरको दर्द अनुभव गरेको कुरा बताउनुभएको छ।`,
  simplifiedText: `मेरो सिरमा दर्द र चक्कर आउँछ

मेरो स्वास्थ्य समस्या:
- सिरको दर्द - ३ हप्तादेखि
- चक्कर आना
- बिरामी अनुभव गर्ने

मेरो रगत चाप: उच्च छ
मेरो औषधि:
- उच्च रगत चाप (नियन्त्रण गरिएको)
- मधुमेह
- दमा

पत्ता लगाइएको कुरा:
सिरको साधारण दर्द

गर्न खोजेको काम:
- औषधि दिने
- दिमागको परीक्षण गर्ने
- २ हप्तामा फेरि आने`,
  language: 'nepali',
  audioUrl: 'https://example.com/audio/trans-001.mp3'
};

const mockHistory: HistoryItem[] = [
  {
    id: 'hist-1',
    filename: 'patient_report_jan2.pdf',
    uploadDate: '2026-01-02',
    status: 'completed',
    language: 'nepali'
  },
  {
    id: 'hist-2',
    filename: 'prescription_dec28.pdf',
    uploadDate: '2025-12-28',
    status: 'completed',
    language: 'nepali'
  },
  {
    id: 'hist-3',
    filename: 'lab_results_dec15.jpg',
    uploadDate: '2025-12-15',
    status: 'completed',
    language: 'nepali'
  }
];

// Mock API calls
export const mockApi = {
  uploadFile: async (file: File): Promise<MockApiResponse<UploadedFile>> => {
    await delay(1500);
    return {
      success: true,
      data: {
        id: `file-${Date.now()}`,
        name: file.name,
        type: 'pdf' as const,
        uploadedAt: new Date().toISOString(),
        preview: 'https://via.placeholder.com/200x300?text=Document+Preview'
      }
    };
  },

  performOCR: async (fileId: string): Promise<MockApiResponse<OCRResult>> => {
    await delay(3000);
    return {
      success: true,
      data: {
        ...mockOCRResult,
        fileId
      }
    };
  },

  translateText: async (text: string, targetLanguage: string): Promise<MockApiResponse<TranslationResult>> => {
    await delay(2500);
    return {
      success: true,
      data: {
        ...mockTranslationResult,
        originalText: text,
        language: targetLanguage as 'nepali' | 'english'
      }
    };
  },

  generateAudio: async (text: string): Promise<MockApiResponse<string>> => {
    await delay(2000);
    return {
      success: true,
      data: 'https://example.com/audio/sample.mp3'
    };
  },

  getHistory: async (): Promise<MockApiResponse<HistoryItem[]>> => {
    await delay(800);
    return {
      success: true,
      data: mockHistory
    };
  },

  deleteHistoryItem: async (id: string): Promise<MockApiResponse<boolean>> => {
    await delay(500);
    return {
      success: true,
      data: true
    };
  },

  getTranslation: async (jobId: string): Promise<MockApiResponse<TranslationResult>> => {
    await delay(500);
    return {
      success: true,
      data: mockTranslationResult
    };
  }
};
