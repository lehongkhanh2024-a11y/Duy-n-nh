
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzePhysiognomy = async (base64Image: string): Promise<AnalysisResult> => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `
    Hãy đóng vai một chuyên gia nhân tướng học phương Đông (physiognomy expert). 
    Phân tích ảnh chân dung này và dự đoán các đặc điểm của người bạn đời tương lai dựa trên các nguyên lý bù trừ và hòa hợp âm dương.
    
    Phân tích các đặc điểm sau của người trong ảnh:
    - Ngũ quan (mắt, mũi, miệng, tai, lông mày).
    - Tam đình (thượng, trung, hạ đình).
    
    Sau đó, hãy đề xuất một người bạn đời có các đặc điểm nhân tướng học tương trợ để tạo nên sự bền vững trong hôn nhân.
    
    Trả về kết quả dưới dạng JSON với cấu trúc sau:
    {
      "physiognomyAnalysis": "Chuỗi văn bản mô tả chi tiết các nét tướng của người dùng",
      "partnerDescription": "Chuỗi văn bản mô tả chi tiết về ngoại hình và tính cách người bạn đời tương lai",
      "compatibilityScore": số từ 1-100,
      "traits": ["danh sách 4-5 từ khóa về tính cách của bạn đời"],
      "partnerVisualPrompt": "Một mô tả ngắn bằng tiếng Anh (chỉ mô tả khuôn mặt) để dùng làm prompt vẽ chân dung phác thảo"
    }
  `;

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          physiognomyAnalysis: { type: Type.STRING },
          partnerDescription: { type: Type.STRING },
          compatibilityScore: { type: Type.NUMBER },
          traits: { type: Type.ARRAY, items: { type: Type.STRING } },
          partnerVisualPrompt: { type: Type.STRING }
        },
        required: ["physiognomyAnalysis", "partnerDescription", "compatibilityScore", "traits", "partnerVisualPrompt"]
      }
    }
  });

  return JSON.parse(response.text) as AnalysisResult;
};

export const generatePartnerSketch = async (visualPrompt: string): Promise<string> => {
  const model = 'gemini-2.5-flash-image';
  
  const refinedPrompt = `A minimal, clean charcoal pencil sketch of a person's face. ${visualPrompt}. Simple lines, artistic white background, hand-drawn look, single subject, front view, serene expression.`;

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [{ text: refinedPrompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("Không thể tạo bản phác thảo");
};
