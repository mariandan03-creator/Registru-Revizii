# Server pentru Registrul de Revizii Echipamente

Acest server minim oferă două rute pe care aplicația (fișierul HTML) le folosește deja:

- `GET /api/equipment` — returnează lista de echipamente
- `POST /api/equipment` — salvează lista de echipamente

Ambele cer un header `x-api-key` cu o cheie secretă, setată de tine.

## Pasul 1 — Pune fișierele pe GitHub

Render are nevoie de un repo Git ca să facă deploy automat.

1. Creează un cont gratuit pe https://github.com (dacă nu ai deja).
2. Creează un repo nou, gol (ex: `revizii-server`).
3. Încarcă în el cele 3 fișiere din acest folder: `server.js`, `package.json`, `README.md`.
   - Cel mai simplu: pe pagina repo-ului, buton **Add file → Upload files**, tragi cele 3 fișiere, apoi **Commit changes**.

## Pasul 2 — Deploy pe Render (gratuit)

1. Creează un cont gratuit pe https://render.com (te poți loga direct cu contul de GitHub).
2. **New +** → **Web Service**.
3. Alege repo-ul `revizii-server` pe care l-ai creat mai sus (Render îți cere să conectezi contul de GitHub dacă nu ai făcut-o deja).
4. Completează:
   - **Name**: orice nume, ex. `revizii-server` (va apărea în URL-ul final)
   - **Region**: cea mai apropiată de tine
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: **Free**
5. Înainte de a apăsa **Create Web Service**, la secțiunea **Environment Variables**, adaugă:
   - `API_KEY` = o cheie secretă aleasă de tine (ex: un șir lung, random — nu folosi ceva ușor de ghicit)
6. Apasă **Create Web Service** și așteaptă câteva minute cât se face build-ul.
7. Când e gata, Render îți dă un URL de forma `https://revizii-server-xxxx.onrender.com`.

## Pasul 3 — Conectează aplicația

În aplicația HTML (Registru Revizii), apasă iconița de setări (roată dințată) și completează:

- **URL server**: URL-ul primit de la Render (fără `/` la final)
- **Cheie API**: exact valoarea pusă la `API_KEY` pe Render

Apasă **Salvează și sincronizează**. Dacă totul e corect, statusul de jos va arăta „Sincronizat cu serverul”.

Repetă acest pas (același URL + aceeași cheie) pe orice alt telefon/browser vrei să vezi aceleași date.

## De reținut

- **Planul gratuit Render „adoarme”** serverul după ~15 minute de inactivitate. Prima cerere după o pauză poate dura 20-50 de secunde până serverul „se trezește” — e normal, nu e o eroare.
- **Persistența datelor**: fără un disc persistent (funcție de plată pe Render), fișierul `data.json` poate fi resetat la un redeploy nou al serviciului (de exemplu dacă modifici și reîncarci codul). Pentru siguranță, folosește din când în când butonul **Exportă JSON/CSV** din aplicație ca backup.
- Nu distribui cheia API (`API_KEY`) public — oricine o are poate citi și modifica toate echipamentele.
