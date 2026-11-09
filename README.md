# STEP UP AI Notes Generator — Integration Demo

This demo preserves your existing Notes Builder HTML and adds a Gemini-powered input panel.

## Requirements
- Node.js 20 or newer
- A Gemini API key from https://aistudio.google.com/apikey

## Setup
1. Extract this ZIP.
2. Open the extracted folder in Terminal / Command Prompt.
3. Run `npm install`.
4. Copy `.env.example` to `.env.local`.
5. Put your key in `.env.local`: `GEMINI_API_KEY=your_actual_key`
6. Run `npm run dev`.
7. Open the Vite URL shown in the terminal (usually http://localhost:5173).

The browser UI calls `/api/generate-notes`; the Express server calls Gemini. The API key is never sent to the browser.

## Demo features
- Generate notes from a topic.
- Upload a PDF (up to 15 MB recommended) and generate notes from it.
- Hindi + English, Hindi-only, or English output.
- AI output uses the original renderer's tags: [H], [IMP], [CONCEPT:color], [FORMULA], [TABLE], [EXAMPLE], [FACTS], [Q].
- Generated text is inserted into the existing Notes Builder and rendered by its existing page-design engine.
- PDF export uses a browser download instead of the original Claude-only downloads API.

## Important limitations
- This is a local proof-of-concept, not a production multi-user deployment.
- AI-generated scientific content must be reviewed before publishing.
- The PDF upload is sent to Gemini for processing; do not upload confidential or sensitive files.
- DOCX/PPTX export is not added in this demo.
- The original builder uses external CDN assets; internet access is needed for those assets.

## Model
Default: `gemini-2.5-flash`. Override with `GEMINI_MODEL` in `.env.local` if available to your API account.
