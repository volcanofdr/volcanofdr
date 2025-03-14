import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface WarningModalProps {
  warningText: string;
  onAccept: () => void;
}

function WarningModal({ warningText, onAccept }: WarningModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[rgba(0,0,0,0.8)] p-8 rounded-xl max-w-md w-full mx-4">
        <div className="flex flex-col items-center text-center">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">WARNING</h2>
          <p className="text-gray-300 mb-6">{warningText}</p>
          <button
            onClick={onAccept}
            className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-yellow-800 hover:from-yellow-700 hover:to-yellow-900 text-white rounded-lg transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

export default WarningModal;