import React from 'react';

export default function Modal({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-2xl max-w-md w-full">{children}</div>
    </div>
  );
}
