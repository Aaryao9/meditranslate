import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { TextPanel } from '../components/Textpanel'
import { Button } from '../components/Button'
import { LoadingSpinner } from '../components/Loadingspinner'
import { mockApi } from '../mocks/api'
import { OCRResult } from '../types'

const OCRReview: React.FC = () => {
  const { fileId } = useParams<{ fileId: string }>()
  const navigate = useNavigate()
  const [ocrResult, setOcrResult] = useState<OCRResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [editedText, setEditedText] = useState<string>('')

  useEffect(() => {
    const loadOCR = async () => {
      if (!fileId) return
      
      try {
        const result = await mockApi.performOCR(fileId)
        if (result.success && result.data) {
          setOcrResult(result.data)
          setEditedText(result.data.extractedText)
        }
      } finally {
        setLoading(false)
      }
    }

    loadOCR()
  }, [fileId])

  const handleConfirm = () => {
    navigate(`/translate/${fileId}`, { state: { extractedText: editedText } })
  }

  if (loading) return <LoadingSpinner message="Performing OCR..." fullScreen />

  if (!ocrResult) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Failed to load document. Please try again.</p>
        <Button onClick={() => navigate('/upload')} variant="primary" className="mt-4">
          Upload Another Document
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Review Extracted Text</h1>
        <p className="text-gray-600">
          Review and edit the extracted text before translation. Areas with low confidence are highlighted.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-96">
        <div className="bg-white rounded-lg shadow-md p-4">
          <img
            src="https://via.placeholder.com/400x500?text=Document+Preview"
            alt="Document preview"
            className="w-full h-full object-contain rounded"
          />
        </div>

        <TextPanel
          title="Extracted Text"
          content={editedText}
          editable={true}
          onEdit={setEditedText}
          highlightAreas={ocrResult.lowConfidenceAreas}
        />
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-900 font-semibold">Confidence Score: {Math.round(ocrResult.confidence * 100)}%</p>
        <p className="text-yellow-800 text-sm">
          Areas highlighted in yellow have lower confidence scores. Please review them carefully.
        </p>
      </div>

      <div className="flex gap-4 justify-end">
        <Button onClick={() => navigate('/upload')} variant="outline">
          Upload Different Document
        </Button>
        <Button onClick={handleConfirm} variant="primary" size="lg">
          Confirm & Translate
        </Button>
      </div>
    </div>
  )
}

export default OCRReview
