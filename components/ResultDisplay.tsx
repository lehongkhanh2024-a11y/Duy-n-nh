
import React from 'react';
import { AnalysisResult } from '../types';

interface ResultDisplayProps {
  result: AnalysisResult;
  sketchUrl: string | null;
  userImage: string | null;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, sketchUrl, userImage, onReset }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Result */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-stone-900 mb-2">Kết Quả Duyên Định</h2>
        <p className="text-stone-600">Sự hòa hợp giữa nhân tướng và vận mệnh</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sketch Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-stone-100 flex flex-col items-center">
          <h3 className="text-xl font-semibold text-stone-800 mb-4 border-b pb-2 w-full text-center">Bản Phác Thảo Bạn Đời</h3>
          <div className="relative w-full aspect-square bg-stone-50 rounded-lg overflow-hidden border border-stone-200 mb-6">
            {sketchUrl ? (
              <img src={sketchUrl} alt="Partner Sketch" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="w-12 h-12 bg-stone-200 rounded-full mb-2"></div>
                  <div className="w-24 h-4 bg-stone-200 rounded"></div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {result.traits.map((trait, idx) => (
              <span key={idx} className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full uppercase tracking-wider">
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* Comparison/Score Section */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-stone-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-stone-800">Độ Hòa Hợp</h3>
              <span className="text-3xl font-bold text-amber-600">{result.compatibilityScore}%</span>
            </div>
            <div className="w-full bg-stone-100 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-400 to-amber-600 h-full rounded-full transition-all duration-1000" 
                style={{ width: `${result.compatibilityScore}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-stone-100">
            <h3 className="text-xl font-semibold text-stone-800 mb-3">Phân Tích Nhân Tướng</h3>
            <p className="text-stone-600 leading-relaxed text-sm italic">
              "{result.physiognomyAnalysis}"
            </p>
          </div>
        </div>
      </div>

      {/* Full Description Section */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100">
        <h3 className="text-2xl font-bold text-stone-900 mb-4">Dự Đoán Người Bạn Đời</h3>
        <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed">
          {result.partnerDescription.split('\n').map((para, i) => (
            <p key={i} className="mb-4">{para}</p>
          ))}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex justify-center pt-4">
        <button 
          onClick={onReset}
          className="px-8 py-3 bg-stone-800 text-white font-semibold rounded-full hover:bg-stone-900 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Thử Lại Với Ảnh Khác
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;
