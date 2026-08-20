import React, { useState } from 'react';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Login attempt with: ' + email);
    }, 1500);
  };

  return (
    <div className="w-full">
      <form className="space-y-5" onSubmit={handleSubmit}>
        
        {/* Email Input */}
        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-600">
            Email address
          </label>
          <div className="relative flex">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@email.com"
              className="flex-1 px-4 py-3 bg-[#f4f5f7] border border-transparent focus:bg-white focus:border-[#f17a41] focus:ring-1 focus:ring-[#f17a41] rounded-l-lg outline-none transition-all text-sm placeholder-gray-400"
            />
            <div className="w-12 bg-[#f17a41] rounded-r-lg flex items-center justify-center text-white shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Password Input */}
        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-600">
            Password
          </label>
          <div className="relative flex">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="flex-1 px-4 py-3 bg-[#f4f5f7] border border-transparent focus:bg-white focus:border-[#f17a41] focus:ring-1 focus:ring-[#f17a41] rounded-l-lg outline-none transition-all text-sm placeholder-gray-400"
            />
            <div className="w-12 bg-[#f17a41] rounded-r-lg flex items-center justify-center text-white shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
            </div>
          </div>
          <div className="flex justify-end pt-1">
            <a href="#" className="text-[12px] font-medium text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>
        </div>

        <div className="pt-2">
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#f17a41] hover:bg-[#e66a2e] text-white py-3 rounded-lg font-medium shadow-[0_4px_14px_rgba(241,122,65,0.3)] transition-all"
          >
            {isLoading ? 'Logging in...' : 'Login now'}
          </button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-white text-gray-400">OR</span>
          </div>
        </div>

        <button 
          type="button" 
          className="w-full border-2 border-[#f17a41] text-[#f17a41] hover:bg-orange-50 py-3 rounded-lg font-medium transition-all bg-white"
        >
          Signup now
        </button>
      </form>
    </div>
  );
};
