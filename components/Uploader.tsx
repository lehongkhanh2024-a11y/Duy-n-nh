
import React, { useRef } from 'react';

interface UploaderProps {
  onImageSelect: (base64: string) => void;
}

const Uploader: React.FC<UploaderProps> = ({ onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        onImageSelect(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-xl border border-stone-100">
      <div className="text-center mb-6">
        <div className="inline-block p-3 bg-amber-50 rounded-full mb-4">
          <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-stone-800">Tải Lên Chân Dung</h3>
        <p className="text-stone-500 mt-2">Hãy chọn một bức ảnh rõ mặt để AI bắt đầu phân tích nhân tướng</p>
      </div>

      <div 
        onClick={() => fileInputRef.current?.click()}
        className="relative group cursor-pointer border-2 border-dashed border-stone-200 hover:border-amber-400 rounded-xl p-12 transition-all duration-300 bg-stone-50 hover:bg-amber-50/30 flex flex-col items-center justify-center"
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange}
        />
        <svg className="w-12 h-12 text-stone-300 group-hover:text-amber-500 mb-4 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span className="text-stone-600 font-medium group-hover:text-amber-700">Bấm để chọn ảnh hoặc chụp mới</span>
        <span className="text-stone-400 text-sm mt-1">Hỗ trợ JPG, PNG, WEBP</span>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4">
        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg text-blue-700 text-sm">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p>Mọi dữ liệu hình ảnh chỉ được sử dụng để phân tích tạm thời và không được lưu trữ trên máy chủ của chúng tôi.</p>
        </div>
      </div>
    </div>
  );
};

export default Uploader;
