
import React from 'react';

interface LoaderProps {
  step: string;
}

const Loader: React.FC<LoaderProps> = ({ step }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-amber-100 rounded-full"></div>
        <div className="absolute top-0 left-0 w-24 h-24 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
           <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
           </svg>
        </div>
      </div>
      <h3 className="mt-8 text-xl font-medium text-stone-800 animate-pulse">{step}</h3>
      <p className="mt-2 text-stone-500 text-sm">Quá trình này có thể mất vài giây...</p>
    </div>
  );
};

export default Loader;
