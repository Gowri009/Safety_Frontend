import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  rightElement?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, rightElement, className = '', id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className="space-y-1.5">
        <label htmlFor={inputId} className="block text-sm font-bold text-gray-900">
          {label}
        </label>
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            className={`appearance-none block w-full px-4 py-3 border ${
              error ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-brand-dark focus:border-brand-dark'
            } rounded-xl shadow-sm placeholder-gray-400 focus:outline-none transition-shadow duration-200 sm:text-sm bg-gray-50 ${
              rightElement ? 'pr-14' : ''
            } ${className}`}
            {...props}
          />
          {rightElement && (
            <div className="absolute inset-y-0 right-0 flex items-center">
              {rightElement}
            </div>
          )}
        </div>
        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
