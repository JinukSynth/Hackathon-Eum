import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 앱 색상에 맞춰 커스텀 컬러 추가
        primary: "#FF5E5E",  // 메인 핑크 색상
        secondary: "#FFA6A6",  // 서브 핑크 색상
        accent: "#FFD1D1",  // 강조 색상
        background: "#FFF4F4",  // 배경 색상
        textPrimary: "#333333",  // 메인 텍스트 색상
        textSecondary: "#555555",  // 서브 텍스트 색상
        buttonText: "#FFFFFF",  // 버튼 텍스트 색상
      },
      borderRadius: {
        // 둥근 모서리 추가
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },
      boxShadow: {
        // 부드러운 그림자 추가
        'soft': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'soft-lg': '0 8px 16px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
