const express = require('express');

const app = express();

// --- CORS для фронта на домене ---
const allowOrigin = (req, res, next) => {
  const ORIGINS = [
    'https://narratioglobalteam.com',
    'https://www.narratioglobalteam.com'
  ];
  const origin = req.headers.origin;
  if (ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    // можно открыть всем на тестовый период
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
};
app.use(allowOrigin);

// --- Маршруты проверки ---
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/test', (_req, res) => {
  res.json({ message: 'test ok' });
});

// корень (на всякий)
app.get('/', (_req, res) => {
  res.send('Narratio backend is running');
});

// --- Старт сервера ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
