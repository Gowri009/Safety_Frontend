import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    const existingUsers = JSON.parse(
      localStorage.getItem('demo_users') || '[]'
    );

    const user = existingUsers.find(
      (user: { email: string }) =>
        user.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      setEmailError('Account not found');
      return;
    }

    setEmailError('');

    localStorage.setItem('reset_email', email);

    navigate('/reset-password');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <div className="text-center mb-7">
          <img
            src="/safety-logo.png"
            alt="Safety Management Logo"
            className="w-14 h-14 object-contain mx-auto mb-3"
          />

          <h2 className="text-2xl font-bold text-[#1e2756]">
            Forgot Password?
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Enter your registered email address
          </p>
        </div>

        <form
          className="space-y-5"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="space-y-1.5">
            <label className="block text-[13px] font-medium text-gray-600">
              Email address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
              placeholder="alex@email.com"
              className={`w-full px-4 py-3 bg-[#f4f5f7] border ${
                emailError
                  ? 'border-red-400'
                  : 'border-transparent focus:border-[#f17a41]'
              } focus:bg-white focus:ring-1 focus:ring-[#f17a41] rounded-lg outline-none transition-all text-sm`}
            />

            {emailError && (
              <p className="text-[12px] text-red-500 font-medium">
                {emailError}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#f17a41] hover:bg-[#e66a2e] text-white py-3 rounded-lg font-medium"
          >
            Continue
          </button>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full border-2 border-[#f17a41] text-[#f17a41] hover:bg-orange-50 py-3 rounded-lg font-medium"
          >
            Back to login
          </button>
        </form>

      </div>
    </div>
  );
};