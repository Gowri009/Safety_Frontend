import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordError, setPasswordError] = useState('');
  const [success, setSuccess] = useState('');

  const validatePassword = (value: string) => {
    return (
      value.length >= 8 &&
      /[A-Z]/.test(value) &&
      /[0-9]/.test(value) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(value)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setPasswordError('');
    setSuccess('');

    // Password validation
    if (!validatePassword(password)) {
      setPasswordError(
        '8+ characters, 1 capital letter, 1 number and 1 special character required'
      );
      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    // Get reset email
    const resetEmail = localStorage.getItem('reset_email');

    if (!resetEmail) {
      setPasswordError(
        'Reset session expired. Please try again.'
      );
      return;
    }

    // Get existing users
    const existingUsers = JSON.parse(
      localStorage.getItem('demo_users') || '[]'
    );

    // Update password
    const updatedUsers = existingUsers.map(
      (user: { email: string; password: string }) => {
        if (
          user.email.toLowerCase() ===
          resetEmail.toLowerCase()
        ) {
          return {
            ...user,
            password: password,
          };
        }

        return user;
      }
    );

    // Save updated users
    localStorage.setItem(
      'demo_users',
      JSON.stringify(updatedUsers)
    );

    // Remove reset email
    localStorage.removeItem('reset_email');

    // Success
    setSuccess('Password reset successfully!');

    // Go to login
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Logo */}
        <div className="text-center mb-7">
          <img
            src="/safety-logo.png"
            alt="Safety Management Logo"
            className="w-14 h-14 object-contain mx-auto mb-3"
          />

          <h2 className="text-2xl font-bold text-[#1e2756]">
            Reset Password
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Create a new password for your account
          </p>
        </div>

        <form
          className="space-y-5"
          onSubmit={handleSubmit}
          noValidate
        >

          {/* New Password */}
          <div className="space-y-1.5">
            <label className="block text-[13px] font-medium text-gray-600">
              New Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
                setSuccess('');
              }}
              placeholder="Enter new password"
              className={`w-full px-4 py-3 bg-[#f4f5f7] border ${
                passwordError
                  ? 'border-red-400'
                  : 'border-transparent focus:border-[#f17a41]'
              } focus:bg-white focus:ring-1 focus:ring-[#f17a41] rounded-lg outline-none transition-all text-sm`}
            />
          </div>

          {/* Password Requirements */}
          <p className="text-[12px] text-gray-500">
            8+ characters • 1 capital letter • 1 number • 1 special character
          </p>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="block text-[13px] font-medium text-gray-600">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordError('');
                setSuccess('');
              }}
              placeholder="Confirm new password"
              className={`w-full px-4 py-3 bg-[#f4f5f7] border ${
                passwordError
                  ? 'border-red-400'
                  : 'border-transparent focus:border-[#f17a41]'
              } focus:bg-white focus:ring-1 focus:ring-[#f17a41] rounded-lg outline-none transition-all text-sm`}
            />
          </div>

          {/* Error */}
          {passwordError && (
            <p className="text-[12px] text-red-500 font-medium">
              {passwordError}
            </p>
          )}

          {/* Success */}
          {success && (
            <p className="text-[12px] text-green-600 font-medium">
              {success}
            </p>
          )}

          {/* Reset Button */}
          <button
            type="submit"
            className="w-full bg-[#f17a41] hover:bg-[#e66a2e] text-white py-3 rounded-lg font-medium"
          >
            Reset Password
          </button>

          {/* Back */}
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