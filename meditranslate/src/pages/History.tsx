import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { LoadingSpinner } from '../components/Loadingspinner'
import { mockApi } from '../mocks/api'
import { HistoryItem } from '../types'
import { Trash2, Eye, Calendar } from 'lucide-react'

const History: React.FC = () => {
  const navigate = useNavigate()
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const result = await mockApi.getHistory()
        if (result.success && result.data) {
          setHistory(result.data)
        }
      } finally {
        setLoading(false)
      }
    }

    loadHistory()
  }, [])

  const handleDelete = async (id: string) => {
    setDeleting(id)
    try {
      await mockApi.deleteHistoryItem(id)
      setHistory(history.filter(item => item.id !== id))
    } finally {
      setDeleting(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) return <LoadingSpinner message="Loading history..." fullScreen />

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Translation History</h1>
        <p className="text-gray-600">
          View and manage your previous translations.
        </p>
      </div>

      {history.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-600 mb-4">No translation history yet.</p>
          <Button onClick={() => navigate('/upload')} variant="primary">
            Upload Your First Document
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {history.map(item => (
            <Card key={item.id} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="font-semibold text-gray-900">{item.filename}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {item.uploadDate}
                  </span>
                  <span>Language: {item.language}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => navigate(`/result/${item.id}`)}
                  variant="secondary"
                  size="sm"
                >
                  <Eye className="w-4 h-4" />
                  View
                </Button>
                <Button
                  onClick={() => handleDelete(item.id)}
                  variant="outline"
                  size="sm"
                  disabled={deleting === item.id}
                >
                  <Trash2 className="w-4 h-4" />
                  {deleting === item.id ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default History
