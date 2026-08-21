import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setEmail(value);

    if (emailError) {
      setEmailError('');
    }
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setPassword(value);

    if (passwordError) {
      setPasswordError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    // Email validation
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      hasError = true;
    } else {
      setEmailError('');
    }

    // Password validation
    if (!password.trim()) {
      setPasswordError('Please enter a password');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (hasError) {
      return;
    }

    // Get registered users
    const existingUsers = JSON.parse(
      localStorage.getItem('demo_users') || '[]'
    );

    // Find user
    const user = existingUsers.find(
      (user: { email: string; password: string }) =>
        user.email.toLowerCase() === email.toLowerCase()
    );

    // Account not found
    if (!user) {
      setEmailError(
        'Account not found. Please create an account.'
      );
      return;
    }

    // Wrong password
    if (user.password !== password) {
      setPasswordError('Incorrect password');
      return;
    }

    // Login successful
    setEmailError('');
    setPasswordError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="w-full">
      <form
        className="space-y-5"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Email Input */}
        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-600">
            Email address
          </label>

          <div className="relative flex">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="alex@email.com"
              className={`flex-1 px-4 py-3 bg-[#f4f5f7] border ${
                emailError
                  ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
                  : 'border-transparent focus:border-[#f17a41] focus:ring-[#f17a41]'
              } focus:bg-white focus:ring-1 rounded-l-lg outline-none transition-all text-sm placeholder-gray-400`}
            />

            <div className="w-12 bg-[#f17a41] rounded-r-lg flex items-center justify-center text-white shrink-0">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {emailError && (
            <p className="text-[12px] text-red-500 font-medium pt-0.5">
              {emailError}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-600">
            Password
          </label>

          <div className="relative flex">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              className={`flex-1 px-4 py-3 bg-[#f4f5f7] border ${
                passwordError
                  ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
                  : 'border-transparent focus:border-[#f17a41] focus:ring-[#f17a41]'
              } focus:bg-white focus:ring-1 rounded-l-lg outline-none transition-all text-sm placeholder-gray-400`}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              className="w-12 bg-[#f17a41] rounded-r-lg flex items-center justify-center text-white shrink-0"
              aria-label={
                showPassword
                  ? 'Hide password'
                  : 'Show password'
              }
            >
              {showPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          </div>

          {passwordError && (
            <p className="text-[12px] text-red-500 font-medium pt-0.5">
              {passwordError}
            </p>
          )}

          {/* Forgot Password */}
          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-[12px] font-medium text-blue-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>
        </div>

        {/* Login Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#f17a41] hover:bg-[#e66a2e] text-white py-3 rounded-lg font-medium shadow-[0_4px_14px_rgba(241,122,65,0.3)] transition-all"
          >
            {isLoading ? 'Logging in...' : 'Login now'}
          </button>
        </div>

        {/* Create Account */}
        <div className="text-center pt-3">
          <p className="text-[13px] text-gray-500">
            Don't have an account?{' '}

            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="font-medium text-[#f17a41] hover:underline"
            >
              Create account
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};