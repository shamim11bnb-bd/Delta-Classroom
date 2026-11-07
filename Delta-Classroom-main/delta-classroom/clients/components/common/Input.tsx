import React from 'react';

export default function Input({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`w-full p-3 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} {...props} />;
}
