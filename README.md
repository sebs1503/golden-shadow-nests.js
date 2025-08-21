Golden Shadows — API & Frontend

Investigación de crímenes de alto perfil en Las Caris.
Stack: NestJS 11 + MongoDB (Mongoose 8) para el backend y React + Vite + Tailwind para el frontend.

🔥 Demo rápida

API: http://localhost:3000

Swagger: http://localhost:3000/docs

Frontend (Vite): http://localhost:5173

📁 Estructura
golden-shadows-api/
├─ src/
│ ├─ app.module.ts
│ ├─ main.ts
│ ├─ common/
│ │ └─ dto/pagination-query.dto.ts
│ ├─ families/ # Familias (Calles, Bonet, Garzón…)
│ ├─ murder-methods/ # Métodos (ahorcamiento dorado, etc.)
│ ├─ victims/ # Víctimas (relación con familia, método, caso)
│ ├─ cases/ # Casos (familias, método, víctimas, pistas…)
│ └─ seed/ # Módulo de seed
│
├─ .env # MONGO_URI, DB_NAME, PORT
├─ package.json # incluye script "seed"
└─ frontend/ # React + Vite + Tailwind

✅ Requisitos

Node.js: recomendado v20 LTS (funciona con 22, pero algunos plugins avisan warning).

MongoDB: Atlas o local.

npm o pnpm (usa npm si tienes dudas).

⚙️ Configuración del Backend

Instala dependencias:

npm i

Crea .env en la raíz:

# Si tu password tiene \*, codifícala como %2A

MONGO_URI=mongodb+srv://<user>:<pass_codificado>@<cluster>.mongodb.net
DB_NAME=golden_shadows
PORT=3000

Ejemplo real:

MONGO_URI=mongodb+srv://adminapp:sebas123%2A@cluster0.tsdqsvt.mongodb.net
DB_NAME=golden_shadows
PORT=3000

Levanta el backend:

npm run start:dev

(Opcional) Poblar datos de la historia (familias, métodos, casos, víctimas):

npm run seed

Documentación interactiva:

http://localhost:3000/docs

🧩 Entidades principales

Family: name, description, city

MurderMethod: name, description, symbolism, displayPattern

Victim: firstName, lastName, age, family, mannerOfDeath, case, bodyDiscoveryDetails, dateOfDeath

CaseFile: title, description, location, date, status(OPEN|INVESTIGATING|CLOSED),
families[], murderMethod, victims[], clues[], investigatorName, mediaLinks[]

🛣️ Endpoints principales (REST)
Families

GET /families — listado (paginado: ?limit=&page=)

GET /families/:id

POST /families

{ "name": "García-Cuevas", "city": "Las Caris", "description": "Linaje bancario" }

PATCH /families/:id — actualiza campos parciales

DELETE /families/:id

Murder Methods

GET /murder-methods, GET /murder-methods/:id

POST /murder-methods

PATCH /murder-methods/:id

DELETE /murder-methods/:id

Victims

GET /victims — soporta ?family=<FAMILY_ID>

GET /victims/:id

POST /victims

{
"firstName":"Lucía","lastName":"García-Cuevas","family":"<FAMILY_ID>",
"mannerOfDeath":"<METHOD_ID>","case":"<CASE_ID>","occupation":"Banquera",
"bodyDiscoveryDetails":"Hallada junto a lingotes","dateOfDeath":"2025-08-18T03:10:00.000Z"
}

PATCH /victims/:id

DELETE /victims/:id

Cases

GET /cases — filtros: ?status=OPEN|INVESTIGATING|CLOSED y ?family=<FAMILY_ID>
?populate=true para nombres y relaciones.

GET /cases/:id — ?populate=true soportado

POST /cases

{
"title":"La bóveda sin aire",
"status":"INVESTIGATING",
"families":["<FAMILY_ID>"],
"murderMethod":"<METHOD_ID>",
"clues":["Llave duplicada","Huella parcial"],
"investigatorName":"Clara Rolín"
}

PATCH /cases/:id

DELETE /cases/:id

🖥️ Frontend (React + Vite + Tailwind)

En otra terminal:

cd frontend
npm i

Configura el .env del frontend:

Copy-Item .env.example .env # en PowerShell (o cp en bash)

# Edita .env:

VITE_API_URL=http://localhost:3000

Levanta el frontend:

npm run dev

# http://localhost:5173

Si el puerto 5173 está ocupado:

npx vite --port 5174

Páginas incluidas

Dashboard: conteo de familias, métodos, víctimas y casos.

Cases: listado con filtro por status y toggle populate; formulario para crear.

Victims: listado con filtro por family; formulario para crear.

Families / Methods: listado + crear + eliminar.

🧪 Scripts útiles (backend)
npm run start:dev # modo watch (desarrollo)
npm run seed # carga datos de ejemplo (3 familias, 3 métodos, 3 víctimas, 3 casos)
npm run build # compila a dist/
npm run start:prod # corre dist/main.js

(Opcional) Levantar front + back juntos desde la raíz con concurrently:

"scripts": {
"dev": "nest start --watch",
"web": "cd frontend && vite",
"dev:all": "concurrently -n API,WEB -c blue,magenta \"npm run dev\" \"npm run web\""
}

npm i -D concurrently cross-env
npm run dev:all

🧯 Troubleshooting

EADDRINUSE: 3000
El puerto 3000 está ocupado:

npx kill-port 3000

# o

PORT=3001 npm run start:dev

Recuerda actualizar VITE_API_URL si cambias el puerto.

Mongo Atlas — Acceso denegado / Auth

Agrega tu IP en Network Access.

Si tu contraseña tiene caracteres especiales (_, @, #…), URL-encódalos
Ej: _ → %2A.

Warning Console Ninja (Node 22 + Nest 11)
Es solo un mensaje del plugin; la app funciona. Si molesta, usa Node 20 LTS (con nvm).

CORS
Ya está habilitado (app.enableCors()). Si quieres restringir:

app.enableCors({ origin: ['http://localhost:5173'] });

🧰 Utilidades

Swagger: http://localhost:3000/docs

Colección Postman y archivo .http (si estás usando este proyecto desde el chat):

golden-shadows.postman_collection.json

golden-shadows.requests.http
