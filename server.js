
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json({ limit: "22mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/generate-notes", async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(503).json({ error: "GEMINI_API_KEY missing. Add it to .env.local and restart the server." });
    const { topic="", exam="", language="Hindi + English bilingual", detail="Detailed exam-oriented notes", instructions="", pdfBase64, pdfName } = req.body || {};
    if (!topic.trim() && !pdfBase64) return res.status(400).json({ error: "Enter a topic or upload a PDF." });
    if (pdfBase64 && pdfBase64.length > 20 * 1024 * 1024) return res.status(413).json({ error: "PDF is too large for this demo. Please use a PDF under 15 MB." });

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are an expert Indian competitive-exam notes author. Generate accurate, well-structured content for an existing notes-rendering application. Output ONLY plain text using these exact supported tags, with each tag on a new line:
[H] chapter heading
[IMP] exam insights
[CONCEPT:teal] or [CONCEPT:blue] concept explanations
[FORMULA] formulas; use KaTeX-compatible $...$ or $$...$$
[TABLE] comparison table; use | separated header and rows
[EXAMPLE] solved examples with clear steps
[FACTS] concise revision facts
[Q] MCQs with options (A)-(D), followed by ANS: and EXPLANATION:
Use only these tags. Do not use Markdown code fences. Do not invent references or claim facts came from a PDF unless present in it. If a reference PDF is supplied, prioritize its content and terminology; if information is unclear, say so in the notes. Preserve correct scientific notation and units.
Topic: ${topic || "Derive the chapter/topic from the supplied PDF"}
Target exam: ${exam}
Language: ${language}. For bilingual output, write each explanation in Hindi followed by its English equivalent in parentheses.
Detail level: ${detail}
Additional instructions: ${instructions || "Include core concepts, definitions, formulas where relevant, one solved example if relevant, key facts and 8-10 exam-level MCQs with answers and explanations."}
Make the notes sufficiently detailed but avoid repetition.`;
    const contents = [{ text: prompt }];
    if (pdfBase64) contents.push({ inlineData: { mimeType: "application/pdf", data: pdfBase64 } });

    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const result = await ai.models.generateContent({ model, contents, config: { temperature: 0.35 } });
    const notes = result.text || "";
    if (!notes.trim()) return res.status(502).json({ error: "Gemini returned an empty response. Try again." });
    res.json({ notes, model, source: pdfName ? "pdf+prompt" : "topic" });
  } catch (err) {
    console.error("Gemini generation error:", err);
    res.status(500).json({ error: err?.message || "AI generation failed." });
  }
});

const port = Number(process.env.PORT || 3001);
app.listen(port, () => console.log(`STEP UP AI demo server running at http://localhost:${port}`));
