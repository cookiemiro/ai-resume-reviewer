export async function parseDOC(buffer: Buffer): Promise<string> {
  try {
    const mammoth = await import("mammoth");
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (err) {
    console.error("❌ DOC 파싱 실패:", err);
    throw err;
  }
}
