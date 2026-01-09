import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-white font-semibold mb-4">About Meditranslate</h4>
            <p className="text-sm">Bridging language barriers in medical care through advanced translation technology.</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="text-sm space-y-2">
              <li><a href="/about" className="hover:text-blue-400">Privacy Policy</a></li>
              <li><a href="/about" className="hover:text-blue-400">Terms of Service</a></li>
              <li><a href="/about" className="hover:text-blue-400">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <p className="text-sm">Have questions? Contact us at support@meditranslate.com</p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; 2026 Meditranslate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
