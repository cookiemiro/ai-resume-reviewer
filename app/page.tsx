import UploadForm from "@/components/UploadForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-10">AI 이력서 리뷰 & 꼬리질문 생성기</h1>
      <p className="text-gray-600 mt-2">PDF 또는 DOCX 형식의 이력서를 업로드하세요</p>
      <UploadForm />
    </main>
  );
}
