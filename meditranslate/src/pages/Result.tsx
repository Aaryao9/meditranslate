import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { AudioPlayer } from '../components/Audioplayer'
import { TextPanel } from '../components/Textpanel'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Download, Share2, File } from 'lucide-react'
import { TranslationResult } from '../types'
import { mockApi } from '../mocks/api'

const Result: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const [translationResult, setTranslationResult] = useState<TranslationResult | null>(null)
  const [shareLink, setShareLink] = useState<string>('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const loadResult = async () => {
      if (location.state?.translationResult) {
        setTranslationResult(location.state.translationResult)
      } else if (jobId) {
        const result = await mockApi.getTranslation(jobId)
        if (result.success && result.data) {
          setTranslationResult(result.data)
        }
      }

      const link = `${window.location.origin}/result/${jobId}?shared=true`
      setShareLink(link)
    }

    loadResult()
  }, [jobId, location.state])

  const handleDownloadPDF = () => {
    const element = document.createElement('a')
    const file = new Blob(
      [translationResult?.simplifiedText || ''],
      { type: 'text/plain' }
    )
    element.href = URL.createObjectURL(file)
    element.download = `translation-${jobId}.pdf`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleDownloadTXT = () => {
    const element = document.createElement('a')
    const file = new Blob(
      [translationResult?.simplifiedText || ''],
      { type: 'text/plain' }
    )
    element.href = URL.createObjectURL(file)
    element.download = `translation-${jobId}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!translationResult) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading result...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Translation Complete!</h1>
        <p className="text-gray-600">
          Your medical document has been successfully translated and simplified.
        </p>
      </div>

      {/* Audio Player */}
      <AudioPlayer
        audioUrl={translationResult.audioUrl}
        title="Listen to Simplified Translation"
        text={translationResult.simplifiedText}
      />

      {/* Simplified Text Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TextPanel
          title="Original Medical Text"
          content={translationResult.originalText}
        />
        
        <TextPanel
          title="Patient-Friendly Translation"
          content={translationResult.simplifiedText}
        />
      </div>

      {/* Download Section */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Download Options</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button onClick={handleDownloadPDF} variant="outline" className="justify-center">
            <File className="w-4 h-4" />
            Download PDF
          </Button>
          <Button onClick={handleDownloadTXT} variant="outline" className="justify-center">
            <File className="w-4 h-4" />
            Download TXT
          </Button>
          <Button variant="outline" className="justify-center">
            <Download className="w-4 h-4" />
            Download Audio
          </Button>
        </div>
      </Card>

      {/* Share Section */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Result</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={shareLink}
            readOnly
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
          />
          <Button
            onClick={handleCopyLink}
            variant="primary"
            className="justify-center"
          >
            <Share2 className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
        </div>
      </Card>

      {/* Next Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button onClick={() => navigate('/upload')} variant="secondary" size="lg" className="justify-center">
          Upload New Document
        </Button>
        <Button onClick={() => navigate('/history')} variant="primary" size="lg" className="justify-center">
          View History
        </Button>
      </div>
    </div>
  )
}

export default Result
