import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center p-4">
      <div className="bg-white border-[8px] border-[#1e2756] rounded-[2.5rem] shadow-2xl p-12 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-[#1e2756] mb-3">Welcome! 🎉</h1>
        <p className="text-gray-500 mb-8">
          This is a demo dashboard page. You have successfully logged in.
        </p>
        <button
          onClick={() => navigate('/')}
          className="w-full bg-[#f17a41] hover:bg-[#e66a2e] text-white py-3 rounded-lg font-medium shadow-[0_4px_14px_rgba(241,122,65,0.3)] transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
};