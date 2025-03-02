"use client"
import { useState, useEffect } from 'react';
import { Copy } from "lucide-react";

function LogoItem({ name, url, icon }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [showWarning, setShowWarning] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");

  const description = ""
  useEffect(() => {
    const img = new Image();
    img.src = icon;
    img.onload = handleLoad;
    img.onerror = handleError;

    // Cleanup function
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [icon]);

  const handleLoad = () => {
    setLoading(false);
    // console.log('Complete: ', name);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
    // console.log('Error: ', name);
  };

  const handleClick = (event) => {
    event.preventDefault();
    setRedirectUrl(url);
    setShowWarning(true);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
   
  };

  const handleProceed = () => {
    window.open(redirectUrl, "_blank");
    setShowWarning(false);
  };
  return (
    <>
    <a
      href={url}
      target="_blank"
      onClick={handleClick}
      rel="noopener noreferrer"
      className="flex items-center bg-gray-800/50 backdrop-blur-lg rounded-lg shadow-2xl hover:shadow-3xl transition p-3 space-x-3 w-auto min-w-[120px] max-w-full border border-gray-700 hover:border-blue-500 hover:ring-2 hover:ring-blue-400"
    >
      {loading && <div className="animate-pulse w-10 h-10 bg-gray-300 rounded"></div>}

      {error && (
        <img
          src="/logos/default.svg"
          alt={name}
          className="w-10 h-10 object-contain rounded-full"
        />
      )}

      {!loading && !error && (
        <img
          src={icon}
          alt={name}
          className="w-10 h-10 object-contain rounded-full bg-white"
        />
      )}
      
      <span className="text-xs font-semibold text-white">{name}</span>
    </a>

    {showWarning && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-2xl max-w-md w-full text-center border border-gray-700">
            <h3 className="text-xl font-bold mb-4 text-red-400">You&apos;re leaving this site</h3>
            <img src={icon} alt={name} className="w-16 h-16 mx-auto mb-3 object-contain rounded-full bg-white p-2" />
            <p className="text-lg font-semibold mb-2 text-blue-300">{name}</p>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">{description}</p>
            
            <div className="bg-gray-800 p-2 rounded-md text-sm text-gray-300 flex items-center justify-between break-all mb-3">
              <span className="truncate">{url}</span>
              <button onClick={handleCopy} className="ml-2 text-gray-400 hover:text-white transition">
                <Copy size={16} />
              </button>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button onClick={() => setShowWarning(false)} className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition">Cancel</button>
              <button onClick={handleProceed} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition">Proceed</button>
            </div>
          </div>
        </div>
      )}
      </>
  );
}

export default LogoItem;
