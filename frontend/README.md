# Golden Shadows Frontend

React + Vite + TypeScript + Tailwind UI para consumir la API NestJS.

## Requisitos
- Node 18+ (recomendado 20 LTS)
- API corriendo (por defecto en http://localhost:3000)

## Instalar y correr
```bash
npm i
cp .env.example .env
# (opcional) edita VITE_API_URL si tu API no está en localhost:3000
npm run dev
```

Abre: http://localhost:5173

## Rutas
- Dashboard: resumen de conteos
- Cases: lista, filtro por status, populate toggle, crear caso
- Victims: lista, filtro por familia, crear víctima
- Families: lista, crear, eliminar
- Methods: lista, crear, eliminar
