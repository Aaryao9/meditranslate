import React from 'react'
import { Card } from '../components/Card'
import { AlertCircle, Shield, Heart } from 'lucide-react'

const About: React.FC = () => {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Project Description */}
      <section>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Meditranslate</h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          Meditranslate is an innovative medical document translation platform designed to break language barriers in healthcare. Using advanced OCR and AI-powered translation technology, we help medical professionals and patients communicate more effectively across language boundaries.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
          Our mission is to ensure that everyone, regardless of their native language, has access to clear and accurate medical information in their preferred language.
        </p>
      </section>

      {/* Medical Safety Notice */}
      <Card className="border-2 border-red-200 bg-red-50">
        <div className="flex gap-4">
          <Heart className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-red-900 mb-2">Medical Safety Notice</h3>
            <p className="text-red-800 mb-3">
              <strong>IMPORTANT DISCLAIMER:</strong> Meditranslate is a translation and simplification tool designed to aid communication. It is NOT a substitute for professional medical advice, diagnosis, or treatment.
            </p>
            <ul className="list-disc list-inside space-y-2 text-red-800">
              <li>Always consult with qualified healthcare professionals for medical decisions</li>
              <li>Do not rely solely on automated translations for critical medical information</li>
              <li>In emergency situations, contact your local emergency services immediately</li>
              <li>Our translations should be reviewed by medical professionals before use in critical settings</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Privacy Policy */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy & Data Protection</h2>
        <div className="space-y-4">
          <Card>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Data Security
            </h3>
            <p className="text-gray-600">
              We employ industry-standard encryption and security measures to protect your sensitive medical documents. Your data is processed securely and never shared with third parties without your explicit consent.
            </p>
          </Card>

          <Card>
            <h3 className="font-semibold text-gray-900 mb-2">Data Retention</h3>
            <p className="text-gray-600">
              Documents are automatically deleted from our servers after 30 days. You can manually delete documents at any time from your history.
            </p>
          </Card>

          <Card>
            <h3 className="font-semibold text-gray-900 mb-2">User Rights</h3>
            <p className="text-gray-600">
              You have the right to access, modify, and delete your personal data at any time. For data access requests or concerns, please contact privacy@meditranslate.com
            </p>
          </Card>
        </div>
      </section>

      {/* Support & Contact */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Support & Contact</h2>
        <Card>
          <div className="space-y-2">
            <p className="text-gray-600"><strong>Email:</strong> support@meditranslate.com</p>
            <p className="text-gray-600"><strong>Phone:</strong> +977-1-4XXXX-XXX</p>
            <p className="text-gray-600"><strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM (Nepal Time)</p>
          </div>
        </Card>
      </section>

      {/* Disclaimer */}
      <Card className="border-2 border-amber-200 bg-amber-50">
        <div className="flex gap-4">
          <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-amber-900 mb-2">Terms of Service</h3>
            <p className="text-sm text-amber-800">
              By using Meditranslate, you agree to our terms of service. You acknowledge that this service is provided "as-is" without warranties. Meditranslate is not liable for any damages or losses resulting from the use of our service.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default About
