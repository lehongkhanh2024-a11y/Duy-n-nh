
import React, { useState } from 'react';
import { AppState } from './types';
import { analyzePhysiognomy, generatePartnerSketch } from './services/geminiService';
import Uploader from './components/Uploader';
import ResultDisplay from './components/ResultDisplay';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    image: null,
    loading: false,
    loadingStep: '',
    result: null,
    sketchUrl: null,
    error: null,
  });

  const handleImageSelect = async (base64: string) => {
    setState(prev => ({ 
      ...prev, 
      image: base64, 
      loading: true, 
      loadingStep: 'Đang giải mã ngũ quan...', 
      error: null 
    }));

    try {
      // Step 1: Analyze physiognomy
      const analysis = await analyzePhysiognomy(base64);
      setState(prev => ({ 
        ...prev, 
        result: analysis, 
        loadingStep: 'Đang phác họa chân dung duyên định...' 
      }));

      // Step 2: Generate sketch based on analysis
      const sketch = await generatePartnerSketch(analysis.partnerVisualPrompt);
      setState(prev => ({ 
        ...prev, 
        sketchUrl: sketch, 
        loading: false 
      }));
    } catch (err: any) {
      console.error(err);
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: 'Có lỗi xảy ra trong quá trình phân tích. Vui lòng thử lại sau.' 
      }));
    }
  };

  const handleReset = () => {
    setState({
      image: null,
      loading: false,
      loadingStep: '',
      result: null,
      sketchUrl: null,
      error: null,
    });
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] selection:bg-amber-100 selection:text-amber-900">
      {/* Navigation / Header */}
      <nav className="border-b border-stone-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-stone-800 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-serif text-2xl">D</span>
              </div>
              <span className="text-2xl font-serif font-bold text-stone-800 tracking-tight">Duyên Định</span>
            </div>
            <div className="hidden md:flex space-x-8 text-stone-500 font-medium text-sm">
              <a href="#" className="hover:text-amber-600 transition-colors">Về Nhân Tướng Học</a>
              <a href="#" className="hover:text-amber-600 transition-colors">Cách Hoạt Động</a>
              <a href="#" className="hover:text-amber-600 transition-colors">Bảo Mật</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section (Only visible on start) */}
      {!state.image && !state.loading && (
        <div className="max-w-4xl mx-auto px-4 pt-16 pb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-stone-900 mb-6 leading-tight">
            Khám Phá <span className="text-amber-600 italic">Duyên Phận</span><br />
            Qua Nhân Tướng Học
          </h1>
          <p className="text-lg text-stone-600 mb-10 max-w-2xl mx-auto">
            Sử dụng sức mạnh của AI tiên tiến kết hợp với thuật xem tướng phương Đông cổ xưa để dự đoán những nét tướng của người bạn đời tương lai của bạn.
          </p>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {state.error && (
          <div className="max-w-lg mx-auto mb-8 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>{state.error}</span>
          </div>
        )}

        {!state.image && !state.loading && (
          <Uploader onImageSelect={handleImageSelect} />
        )}

        {state.loading && (
          <Loader step={state.loadingStep} />
        )}

        {state.result && !state.loading && (
          <ResultDisplay 
            result={state.result} 
            sketchUrl={state.sketchUrl} 
            userImage={state.image} 
            onReset={handleReset}
          />
        )}
      </main>

      {/* Features Info Section */}
      {!state.image && !state.loading && (
        <section className="bg-stone-900 text-white py-20 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">AI Nhân Tướng Học</h3>
                <p className="text-stone-400 text-sm leading-relaxed">Mô phỏng kiến thức từ hàng ngàn tài liệu cổ về nhân tướng để phân tích ngũ quan chính xác.</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3c1.268 0 2.47.235 3.578.663m1.41 1.41a10.003 10.003 0 011.53 12.193m-2.618 2.618A8.959 8.959 0 0112 21c-4.97 0-9-4.03-9-9 0-1.566.402-3.036 1.11-4.312m14.333 1.11L14.5 11.5m0 0V14m0-2.5l2.5 2.5" /></svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Phác Họa Chân Dung</h3>
                <p className="text-stone-400 text-sm leading-relaxed">Tạo ra bản vẽ phác thảo độc bản về ngoại hình của người phù hợp nhất với bạn theo nguyên lý âm dương.</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Bảo Mật Tuyệt Đối</h3>
                <p className="text-stone-400 text-sm leading-relaxed">Dữ liệu khuôn mặt của bạn được xử lý an toàn và bị xóa ngay sau khi phiên làm việc kết thúc.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 bg-stone-50 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-stone-400 text-sm">
            &copy; 2024 Duyên Định. Kết quả chỉ mang tính chất giải trí và tham khảo dựa trên thuật nhân tướng học cổ truyền.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
