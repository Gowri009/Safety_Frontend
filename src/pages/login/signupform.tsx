import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SignupForm: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Email validation
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  // Password requirements
  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>_\-+=~`[\];'\\/]/.test(password),
  };

  const isPasswordValid =
    passwordChecks.length &&
    passwordChecks.uppercase &&
    passwordChecks.number &&
    passwordChecks.special;

  // Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    // Name validation
    if (!name.trim()) {
      setNameError('Please enter your name');
      hasError = true;
    } else {
      setNameError('');
    }

    // Email validation
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      hasError = true;
    } else {
      setEmailError('');
    }

    // Password validation
    if (!isPasswordValid) {
      setPasswordError(
        'Password does not meet the requirements'
      );
      hasError = true;
    } else {
      setPasswordError('');
    }

    // Confirm password validation
    if (!confirmPassword) {
      setConfirmPasswordError(
        'Please confirm your password'
      );
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      hasError = true;
    } else {
      setConfirmPasswordError('');
    }

    // Stop if error
    if (hasError) {
      return;
    }

    // Loading
    setIsLoading(true);

    // Demo account creation
    setTimeout(() => {
      const existingUsers = JSON.parse(
        localStorage.getItem('demo_users') || '[]'
      );

      existingUsers.push({
        name,
        email,
        password,
      });

      localStorage.setItem(
        'demo_users',
        JSON.stringify(existingUsers)
      );

      setIsLoading(false);

      // Go back to login
      navigate('/');
    }, 1000);
  };

  // Password requirement component
  const Requirement = ({
    met,
    label,
  }: {
    met: boolean;
    label: string;
  }) => {
    return (
      <span
        className={`flex items-center gap-1 whitespace-nowrap text-[11px] ${
          met ? 'text-green-600' : 'text-gray-400'
        }`}
      >
        <span>{met ? '✓' : '•'}</span>
        {label}
      </span>
    );
  };

  return (
    <div className="w-full">

      <form
        className="space-y-5"
        onSubmit={handleSubmit}
        noValidate
      >

        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-600">
            Full name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);

              if (nameError) {
                setNameError('');
              }
            }}
            placeholder="Alex Smith"
            className={`w-full px-4 py-3 bg-[#f4f5f7] border ${
              nameError
                ? 'border-red-400 focus:border-red-400'
                : 'border-transparent focus:border-[#f17a41]'
            } focus:bg-white focus:ring-1 focus:ring-[#f17a41] rounded-lg outline-none transition-all text-sm placeholder-gray-400`}
          />

          {nameError && (
            <p className="text-[12px] text-red-500 font-medium">
              {nameError}
            </p>
          )}
        </div>


        {/* Email */}
        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-600">
            Email address
          </label>

          <div className="relative flex">

            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);

                if (emailError) {
                  setEmailError('');
                }
              }}
              placeholder="alex@email.com"
              className={`flex-1 px-4 py-3 bg-[#f4f5f7] border ${
                emailError
                  ? 'border-red-400 focus:border-red-400'
                  : 'border-transparent focus:border-[#f17a41]'
              } focus:bg-white focus:ring-1 focus:ring-[#f17a41] rounded-l-lg outline-none transition-all text-sm placeholder-gray-400`}
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
            <p className="text-[12px] text-red-500 font-medium">
              {emailError}
            </p>
          )}
        </div>


        {/* Password */}
        <div className="space-y-1.5">

          <label className="block text-[13px] font-medium text-gray-600">
            Password
          </label>

          <div className="relative flex">

            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);

                if (passwordError) {
                  setPasswordError('');
                }
              }}
              onFocus={() => setPasswordFocused(true)}
              placeholder="Create a password"
              className={`flex-1 px-4 py-3 bg-[#f4f5f7] border ${
                passwordError
                  ? 'border-red-400'
                  : 'border-transparent'
              } focus:bg-white focus:border-[#f17a41] focus:ring-1 focus:ring-[#f17a41] rounded-l-lg outline-none transition-all text-sm placeholder-gray-400`}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              className="w-12 bg-[#f17a41] rounded-r-lg flex items-center justify-center text-white shrink-0"
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


          {/* Password Requirements - Single Line */}
          {(passwordFocused || password.length > 0) && (
            <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 overflow-x-auto">

              <Requirement
                met={passwordChecks.length}
                label="8+ characters"
              />

              <Requirement
                met={passwordChecks.uppercase}
                label="1 capital letter"
              />

              <Requirement
                met={passwordChecks.number}
                label="1 number"
              />

              <Requirement
                met={passwordChecks.special}
                label="1 special character"
              />

            </div>
          )}

          {passwordError && (
            <p className="text-[12px] text-red-500 font-medium">
              {passwordError}
            </p>
          )}

        </div>


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

              if (confirmPasswordError) {
                setConfirmPasswordError('');
              }
            }}
            placeholder="Confirm your password"
            className={`w-full px-4 py-3 bg-[#f4f5f7] border ${
              confirmPasswordError
                ? 'border-red-400 focus:border-red-400'
                : 'border-transparent focus:border-[#f17a41]'
            } focus:bg-white focus:ring-1 focus:ring-[#f17a41] rounded-lg outline-none transition-all text-sm placeholder-gray-400`}
          />

          {confirmPasswordError && (
            <p className="text-[12px] text-red-500 font-medium">
              {confirmPasswordError}
            </p>
          )}

        </div>


        {/* Create Account Button */}
        <div className="pt-2">

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#f17a41] hover:bg-[#e66a2e] text-white py-3 rounded-lg font-medium shadow-[0_4px_14px_rgba(241,122,65,0.3)] transition-all"
          >
            {isLoading
              ? 'Creating account...'
              : 'Create account'}
          </button>

        </div>


        {/* OR */}
        <div className="relative my-6">

          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>

          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-white text-gray-400">
              OR
            </span>
          </div>

        </div>


        {/* Back to Login */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-full border-2 border-[#f17a41] text-[#f17a41] hover:bg-orange-50 py-3 rounded-lg font-medium transition-all bg-white"
        >
          Back to login
        </button>

      </form>

    </div>
  );
};