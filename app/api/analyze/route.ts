import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { parsePDF } from "@/lib/parsePDF";
import { parseDOC } from "@/lib/parseDOC";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file)
      return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    let text = "";

    if (file.name.endsWith(".pdf")) text = await parsePDF(buffer);
    else if (file.name.endsWith(".docx")) text = await parseDOC(buffer);
    else
      return NextResponse.json(
        { error: "지원하지 않는 파일 형식입니다." },
        { status: 400 }
      );

    const prompt = `
당신은 IT 기업의 시니어 면접관입니다.
아래는 지원자의 이력서 내용입니다.

[요청사항]
1️⃣ 강점 3가지
2️⃣ 개선할 점 3가지
3️⃣ 기술 면접 꼬리질문 5개 생성

이력서 내용:
${text.slice(0, 8000)}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const result = completion.choices[0].message?.content ?? "분석 실패";
    return NextResponse.json({ result });
  } catch (error) {
    console.error("❌ 분석 중 오류:", error);
    return NextResponse.json(
      { error: "파일 분석 중 서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
