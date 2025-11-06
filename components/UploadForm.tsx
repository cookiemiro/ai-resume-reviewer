"use client";
import { useState } from "react";
import ResultCard from "./ResultCard";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    if (!file) return alert("파일을 선택하세요!");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-8 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl font-bold mb-4 text-center">📄 이력서 업로드</h2>

      <input
        type="file"
        accept=".pdf,.docx"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full border rounded-lg p-2 mb-4"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        {loading ? "분석 중..." : "AI 분석 시작"}
      </button>

      {result && <ResultCard result={result} />}
    </div>
  );
}
