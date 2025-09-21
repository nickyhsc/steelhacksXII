GenAI Proxy (local)
===================

This folder contains a minimal Express proxy to call Google Generative Language / GenAI from a browser widget without exposing your API key.

Files
- `genai-proxy.js` — minimal Express server that forwards `{ model, prompt }` to Google GenAI and returns `{ text }`.

Quick start (PowerShell / Node 18+)
1. Create a package.json and install dependencies:

```powershell
cd C:\path\to\CRTL+SHE
npm init -y
npm install express dotenv cors
```

2. Set your API key in the environment (do NOT commit this key):

```powershell
$env:GOOGLE_API_KEY = "YOUR_KEY_HERE"
node genai-proxy.js
```

3. Serve your static site (in a separate shell) from the same folder so the frontend widget can POST to `/api/genai`:

```powershell
# Simple static server using Python
python -m http.server 8000
# or use a Node static server
npx serve . -l 8000
```

4. Browse to `http://localhost:8000/python.html`, type a prompt in the widget, and press Send.

Security notes
- Keep your `GOOGLE_API_KEY` in environment variables on the server.
- Add rate limiting/auth if you expose the proxy publicly.
- Use Google Cloud service accounts + IAM for production workloads; the SDK (`@google/genai`) may support service account credentials.
