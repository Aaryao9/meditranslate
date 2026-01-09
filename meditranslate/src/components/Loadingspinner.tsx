import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Processing...',
  fullScreen = false
}) => {
  const spinnerContent = (
    <div className="flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mb-4" />
      <p className="text-gray-700 font-semibold">{message}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 shadow-lg">
          {spinnerContent}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-12">
      {spinnerContent}
    </div>
  );
};
