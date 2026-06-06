import express from 'express';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiUrl });
});

app.listen(port, () => {
  console.log(`Backend API listening on ${apiUrl}`);
});
