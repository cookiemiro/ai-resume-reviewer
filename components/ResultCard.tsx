interface Props {
  result: string;
}

export default function ResultCard({ result }: Props) {
  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg whitespace-pre-wrap">
      <h3 className="font-semibold text-lg mb-2">🧠 분석 결과</h3>
      <div className="text-gray-800 leading-relaxed">{result}</div>
    </div>
  );
}
