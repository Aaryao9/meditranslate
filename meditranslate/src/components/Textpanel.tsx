import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface TextPanelProps {
  title: string;
  content: string;
  editable?: boolean;
  onEdit?: (text: string) => void;
  highlightAreas?: Array<{ id: string; text: string; confidence: number }>;
}

export const TextPanel: React.FC<TextPanelProps> = ({
  title,
  content,
  editable = false,
  onEdit,
  highlightAreas = []
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [editedText, setEditedText] = useState(content);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const getHighlightedText = () => {
    if (!highlightAreas || highlightAreas.length === 0) return content;

    let result = content;
    highlightAreas.forEach(area => {
      const regex = new RegExp(`(${area.text})`, 'g');
      result = result.replace(
        regex,
        `<mark style="background-color: #fef08a; border-bottom: 2px solid #eab308;">$1</mark>`
      );
    });
    return result;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <button
          onClick={handleCopy}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isCopied ? (
            <Check className="w-5 h-5 text-green-600" />
          ) : (
            <Copy className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {editable ? (
        <textarea
          value={editedText}
          onChange={(e) => {
            setEditedText(e.target.value);
            onEdit?.(e.target.value);
          }}
          className="flex-1 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm"
        />
      ) : (
        <div
          className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-lg text-gray-800 text-sm leading-relaxed whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: getHighlightedText() }}
        />
      )}

      {highlightAreas && highlightAreas.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-2">Low confidence areas:</p>
          <div className="flex flex-wrap gap-2">
            {highlightAreas.map(area => (
              <span
                key={area.id}
                className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded border border-yellow-300"
              >
                {area.text} ({Math.round(area.confidence * 100)}%)
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
