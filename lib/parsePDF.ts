export async function parsePDF(buffer: Buffer): Promise<string> {
  try {
    // dynamic import — Next.js App Router (ESM)에서도 허용됨
    const { default: pdf } = await import("pdf-parse");
    const data = await pdf(buffer);
    return data.text;
  } catch (err) {
    console.error("❌ PDF 파싱 실패:", err);
    throw err;
  }
}