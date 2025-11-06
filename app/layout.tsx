import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 이력서 리뷰어",
  description: "AI가 PDF/DOC 이력서를 분석하고 면접 질문을 생성합니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
