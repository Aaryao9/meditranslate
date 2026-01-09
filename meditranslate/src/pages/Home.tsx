import React from 'react'
import { Link } from 'react-router-dom'
import { Upload, Brain, Languages, Volume2 } from 'lucide-react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'

const Home: React.FC = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Smart OCR',
      description: 'Advanced optical character recognition for accurate document scanning'
    },
    {
      icon: <Languages className="w-8 h-8" />,
      title: 'Medical Translation',
      description: 'Accurate translation of medical documents into multiple languages'
    },
    {
      icon: <Volume2 className="w-8 h-8" />,
      title: 'Text-to-Speech',
      description: 'Listen to translations with natural-sounding audio'
    },
    {
      icon: <Upload className="w-8 h-8" />,
      title: 'Easy Upload',
      description: 'Support for PDF, images, and text files'
    }
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Meditranslate
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Breaking language barriers in medical care. Translate medical documents instantly with AI-powered accuracy.
        </p>
        <Link to="/upload">
          <Button variant="primary" size="lg">
            <Upload className="w-5 h-5" />
            Upload Medical Document
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <Card key={idx} className="flex flex-col items-center text-center">
              <div className="text-blue-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 rounded-lg p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-lg mb-6 opacity-90">
          Upload your medical documents and get accurate translations in seconds.
        </p>
        <Link to="/upload">
          <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Start Now
          </Button>
        </Link>
      </section>
    </div>
  )
}

export default Home
