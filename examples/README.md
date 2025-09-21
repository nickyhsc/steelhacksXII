GenAI SDK example

This folder contains a minimal ESM example that shows how to call the Google GenAI SDK in Node.js.

Prerequisites
- Node.js v18 or newer
- Run `npm install @google/genai` in the project root
- Set your API key in the environment variable `GEMINI_API_KEY`

PowerShell example
```
Set-Location 'C:\Users\angel\Downloads\Angelina_Portfolio-main\Angelina_Portfolio-main\CRTL+SHE'
$env:GEMINI_API_KEY = "your_api_key_here"
npm install @google/genai
node --input-type=module examples/genai-quickstart.mjs
```

Notes
- The example uses ESM imports. If you prefer CommonJS, rename to `.cjs` and use `require` instead.
- Do not commit real API keys to version control. Use environment variables or a secret manager.
