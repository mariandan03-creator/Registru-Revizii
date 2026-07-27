const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Pe Render, dacă adaugi un "Persistent Disk" montat pe /data, setează
// variabila de mediu DATA_DIR=/data ca datele să supraviețuiască redeploy-urilor.
// Fără disc persistent (planul gratuit standard), fișierul ține datele
// între repornirile normale, dar se poate reseta la un redeploy nou.
const DATA_DIR = process.env.DATA_DIR || __dirname;
const DATA_FILE = path.join(DATA_DIR, 'data.json');

// Cheia API — seteaz-o din dashboard-ul Render (Environment -> API_KEY).
// Dacă nu setezi nimic, se folosește cheia de mai jos (schimb-o!).
const API_KEY = process.env.API_KEY || 'schimba-aceasta-cheie';

app.use(cors());
app.use(express.json({ limit: '2mb' }));

function readItems() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}
function writeItems(items) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2));
}

function checkAuth(req, res, next) {
  const key = req.header('x-api-key');
  if (!key || key !== API_KEY) {
    return res.status(401).json({ error: 'Cheie API lipsă sau greșită' });
  }
  next();
}

app.get('/', (req, res) => {
  res.send('Registru Revizii - server activ.');
});

app.get('/api/equipment', checkAuth, (req, res) => {
  res.json(readItems());
});

app.post('/api/equipment', checkAuth, (req, res) => {
  const items = req.body && Array.isArray(req.body.items) ? req.body.items : null;
  if (!items) {
    return res.status(400).json({ error: 'Corpul cererii trebuie să conțină { items: [...] }' });
  }
  writeItems(items);
  res.json({ ok: true, count: items.length });
});

app.listen(PORT, () => {
  console.log(`Server pornit pe portul ${PORT}`);
});
