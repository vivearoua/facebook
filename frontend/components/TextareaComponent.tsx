import React from "react";

interface TextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextareaComponent: React.FC<TextareaProps> = ({ value, onChange }) => {
  return (
    <div className="w-full p-6 pb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        What's on your mind?
      </label>
      <div className="relative">
        <textarea
          className="w-full p-4 pr-12 whitespace-pre-line outline-none min-h-[120px] 
          rounded-2xl border border-gray-300 focus:border-blue-500 focus:ring-2 
          focus:ring-blue-200 transition-all duration-200 resize-none
          placeholder-gray-400 text-gray-700 bg-white shadow-sm"
          placeholder="Share your thoughts, ideas, or experiences..."
          value={value}
          onChange={onChange}
          maxLength={500}
        />
        <div className="absolute bottom-3 right-4 text-xs text-gray-400">
          {value.length}/500
        </div>
      </div>
    </div>
  );
};

export default TextareaComponent;