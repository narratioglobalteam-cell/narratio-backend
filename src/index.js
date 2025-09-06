import http from 'http';

const port = process.env.PORT || 5050;

// Разрешённые источники (Origin) — БЕЗ звёздочки
const ALLOWED_ORIGINS = new Set([
  'https://narratioglobalteam-cell.github.io',   // GitHub Pages (фронт)
  'http://127.0.0.1:8090',                       // локальный фронт (на всякий)
]);

const server = http.createServer((req, res) => {
  const origin = req.headers.origin || '';

  // Если origin разрешён — выставляем CORS под него
  if (ALLOWED_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  // Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: true, service: 'narratio-backend' }));
    return;
  }

  if (req.url === '/api/test') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: true, service: 'narratio-backend', message: 'test endpoint works' }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ ok: false, error: 'Not found' }));
});

// Слушаем все интерфейсы (под Render)
server.listen(port, '0.0.0.0', () => {
  console.log(`[narratio-backend] http://localhost:${port}`);
});
