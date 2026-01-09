import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { TextPanel } from '../components/Textpanel'
import { Button } from '../components/Button'
import { LoadingSpinner } from '../components/Loadingspinner'
import { Card } from '../components/Card'
import { mockApi } from '../mocks/api'
import { TranslationResult } from '../types'
import { AlertCircle } from 'lucide-react'

const Translation: React.FC = () => {
  const { fileId } = useParams<{ fileId: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const [translationResult, setTranslationResult] = useState<TranslationResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState<'nepali' | 'english'>('nepali')

  const extractedText = location.state?.extractedText || 'Patient medical record data...'

  useEffect(() => {
    const loadTranslation = async () => {
      try {
        const result = await mockApi.translateText(extractedText, selectedLanguage)
        if (result.success && result.data) {
          setTranslationResult(result.data)
        }
      } finally {
        setLoading(false)
      }
    }

    loadTranslation()
  }, [selectedLanguage, extractedText])

  const handleGenerateAudio = async () => {
    if (!translationResult) return
    
    setLoading(true)
    try {
      const result = await mockApi.generateAudio(translationResult.simplifiedText)
      if (result.success) {
        navigate(`/result/${fileId}`, { state: { translationResult } })
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner message="Translating document..." fullScreen />

  if (!translationResult) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Failed to translate document. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Translation</h1>
        <p className="text-gray-600">
          Compare original and translated medical documents
        </p>
      </div>

      {/* Medical Disclaimer */}
      <Card className="border-2 border-amber-200 bg-amber-50">
        <div className="flex gap-4">
          <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-1">Medical Disclaimer</h3>
            <p className="text-sm text-amber-800">
              These translations are for informational purposes only and should not replace professional medical advice. 
              Always consult with qualified healthcare professionals for medical decisions.
            </p>
          </div>
        </div>
      </Card>

      {/* Language Selector */}
      <div className="flex gap-4 items-center">
        <label className="font-semibold text-gray-700">Target Language:</label>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value as 'nepali' | 'english')}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="nepali">Nepali</option>
          <option value="english">English</option>
        </select>
      </div>

      {/* Text Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
        <TextPanel
          title="Original Text"
          content={translationResult.originalText}
          editable={false}
        />
        
        <TextPanel
          title="Translated Text"
          content={translationResult.translatedText}
          editable={false}
        />
        
        <TextPanel
          title="Simplified (Patient-Friendly)"
          content={translationResult.simplifiedText}
          editable={false}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        <Button onClick={() => navigate('/upload')} variant="outline">
          Upload Different Document
        </Button>
        <Button onClick={handleGenerateAudio} variant="primary" size="lg" loading={loading}>
          Generate Audio
        </Button>
      </div>
    </div>
  )
}

export default Translation
