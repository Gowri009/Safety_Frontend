import React from 'react';

export const LoginLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center p-4 sm:p-8 font-sans relative overflow-hidden">
      
      {/* Background Decorative Elements (Inspired by Figma) */}
      <div className="absolute right-0 top-0 bottom-0 w-[30vw] bg-[#f17a41] z-0"></div>
      
      {/* Centered Main Card with Thick Dark Blue Border */}
      <div className="w-full max-w-[1100px] flex flex-col lg:flex-row bg-white border-[8px] border-[#1e2756] rounded-[2.5rem] overflow-hidden shadow-2xl min-h-[650px] relative z-10">
        
        {/* Left Section - Illustration (Was on the right) */}
        <div 
          className="hidden lg:flex lg:w-[55%] relative flex-col justify-center items-center bg-[#f4f5f7] p-12 overflow-hidden border-r border-gray-100"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white rounded-full blur-[60px] opacity-70"></div>
          
          <img 
            src="/login-illustration.png" 
            alt="Dashboard Illustration" 
            className="w-full max-w-[450px] object-contain z-10 relative"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.style.display = 'none';
              if (e.currentTarget.parentElement) {
                e.currentTarget.parentElement.innerHTML += `
                  <div class="z-10 text-center">
                    <h3 class="text-2xl font-bold text-[#1e2756] mb-4">Welcome to Safety Mgmt</h3>
                    <p class="text-gray-500">End-to-end safety tracking and reporting.</p>
                  </div>
                `;
              }
            }}
          />
        </div>
        
        {/* Right Section - Form Container (Was on the left) */}
        <div className="w-full lg:w-[45%] flex flex-col py-12 px-8 sm:px-14 lg:px-16 bg-white relative z-10">
          
          {/* Logo and Header */}
          <div className="text-center mb-10">
            <div className="flex flex-col items-center justify-center gap-2 mb-3">
              <img src="/safety-logo.png" alt="Safety Management Logo" className="w-16 h-16 object-contain" />
              <span className="text-[#1e2756] font-bold text-3xl tracking-tight mt-1">Safety Management</span>
            </div>
            <p className="text-gray-500 font-medium text-sm">
              Login into your account
            </p>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            {children}
          </div>
        </div>
        
      </div>
    </div>
  );
};
