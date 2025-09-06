import http from 'http';

const port = process.env.PORT || 5050;

// Разрешённые источники (в НИЖНЕМ регистре)
const ALLOWED_ORIGINS = new Set([
  'https://narratioglobalteam-cell.github.io', // GitHub Pages (фронт)
  'http://127.0.0.1:8090',                      // локальный фронт
]);

const server = http.createServer((req, res) => {
  const originRaw = req.headers.origin || '';
  const origin = originRaw.toLowerCase();

  // CORS: разрешаем только явные origin
  if (ALLOWED_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', originRaw); // вернуть как пришёл
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

  if (req.url === '/api/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: true, service: 'narratio-backend' }));
    return;
  }

  if (req.url === '/api/test' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: true, service: 'narratio-backend', message: 'test endpoint works' }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ ok: false, error: 'Not found' }));
});

// Слушаем все интерфейсы (Render)
server.listen(port, '0.0.0.0', () => {
  console.log(`[narratio-backend] http://localhost:${port}`);
});
