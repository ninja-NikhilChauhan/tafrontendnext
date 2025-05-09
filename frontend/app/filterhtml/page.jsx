'use client'; // This is needed since we're using client-side interactivity

import { useState } from 'react';

export default function FilterHtml() {
  const [htmlInput, setHtmlInput] = useState('');
  const [filteredText, setFilteredText] = useState('');
  const [copied, setCopied] = useState(false);

  const filterHtmlTags = () => {
    // Remove HTML tags using regex (simple approach)
    const textWithoutTags = htmlInput.replace(/<[^>]*>/g, '');
    // Replace multiple spaces/newlines with single ones
    const cleanedText = textWithoutTags.replace(/\s+/g, ' ').trim();
    setFilteredText(cleanedText);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(filteredText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">HTML Filter Tool</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="htmlInput" className="block text-sm font-medium text-gray-700 mb-2">
            Paste HTML Content
          </label>
          <textarea
            id="htmlInput"
            className="w-full h-64 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            placeholder="Paste your HTML content here..."
          />
          <button
            onClick={filterHtmlTags}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Filter HTML Tags
          </button>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="filteredOutput" className="block text-sm font-medium text-gray-700">
              Filtered Text
            </label>
            <button
              onClick={copyToClipboard}
              disabled={!filteredText}
              className={`px-3 py-1 text-sm rounded-md ${filteredText ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <textarea
            id="filteredOutput"
            readOnly
            className="w-full h-64 p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none"
            value={filteredText}
            placeholder="Filtered text will appear here..."
          />
        </div>
      </div>
    </div>
  );
}