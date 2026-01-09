import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileUpload } from '../components/Fileupload'
import { Button } from '../components/Button'
import { LoadingSpinner } from '../components/Loadingspinner'
import { mockApi } from '../mocks/api'

const Upload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setError(null)
  }

  const handleStartOCR = async () => {
    if (!selectedFile) {
      setError('Please select a file first')
      return
    }

    setLoading(true)
    try {
      const result = await mockApi.uploadFile(selectedFile)
      if (result.success && result.data) {
        navigate(`/ocr/${result.data.id}`)
      }
    } catch (err) {
      setError('Failed to upload file. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Document</h1>
        <p className="text-gray-600">
          Upload your medical document for translation. Supported formats: PDF, JPG, PNG, TXT
        </p>
      </div>

      {loading && <LoadingSpinner message="Uploading document..." />}

      {!loading && (
        <>
          <FileUpload onFileSelect={handleFileSelect} loading={loading} />

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {selectedFile && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-900 font-semibold">Ready to proceed?</p>
                <p className="text-blue-800 text-sm">
                  Click "Start OCR" to extract text from your document.
                </p>
              </div>

              <Button
                onClick={handleStartOCR}
                variant="primary"
                size="lg"
                className="w-full"
                loading={loading}
              >
                Start OCR
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Upload
