import React, { useState } from 'react'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { User, Mic, Globe, Lock } from 'lucide-react'

const Profile: React.FC = () => {
  const [preferences, setPreferences] = useState({
    language: 'nepali',
    voice: 'female',
    notifications: true,
    dataSharing: false
  })

  const handleSavePreferences = () => {
    alert('Preferences saved successfully!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
        <p className="text-gray-600">
          Manage your preferences and privacy settings.
        </p>
      </div>

      {/* User Profile */}
      <Card>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Aarya Poudel</h2>
            <p className="text-gray-600">aarya@example.com</p>
          </div>
        </div>
        <Button variant="secondary">Edit Profile</Button>
      </Card>

      {/* Language Preference */}
      <Card>
        <div className="flex items-center gap-4 mb-4">
          <Globe className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Language Preferences</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Translation Language
            </label>
            <select
              value={preferences.language}
              onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="nepali">Nepali</option>
              <option value="english">English</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Voice Preference */}
      <Card>
        <div className="flex items-center gap-4 mb-4">
          <Mic className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Audio Preferences</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Voice
            </label>
            <select
              value={preferences.voice}
              onChange={(e) => setPreferences({ ...preferences, voice: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <div className="flex items-center gap-4 mb-4">
          <Lock className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Privacy Controls</h3>
        </div>
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={preferences.notifications}
              onChange={(e) => setPreferences({ ...preferences, notifications: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-gray-700">Enable email notifications</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={preferences.dataSharing}
              onChange={(e) => setPreferences({ ...preferences, dataSharing: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-gray-700">Allow usage analytics (helps improve service)</span>
          </label>
        </div>
      </Card>

      <Button onClick={handleSavePreferences} variant="primary" size="lg">
        Save Preferences
      </Button>
    </div>
  )
}

export default Profile
