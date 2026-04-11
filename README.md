# Mini Project React + TypeScript + Vite

Project ini dibuat menggunakan **React + TypeScript + Vite** sebagai boilerplate, dengan setup minimal untuk development yang cepat dan Hot Module Replacement (HMR).

---

## Daftar Library yang Digunakan

**Dependencies:**

- `react` & `react-dom` – library inti React
- `react-router-dom` – routing client-side SPA
- `axios` – HTTP client untuk request API
- `react-hot-toast` – untuk notifikasi toast interaktif
- `tailwindcss` & `@tailwindcss/vite` – utility-first CSS framework

**DevDependencies:**

- `vite` – build tool dan dev server
- `@vitejs/plugin-react` – plugin React untuk Vite
- `typescript` – type safety di project
- `eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `typescript-eslint` – linting rules dan type-aware linting
- `@types/node`, `@types/react`, `@types/react-dom`, `globals` – type definitions

---

## Fitur Tambahan (Di luar requirement utama)

- Notifikasi interaktif menggunakan **react-hot-toast**
- Styling menggunakan **TailwindCSS** dengan Vite plugin
- Struktur project siap deploy ke **Vercel**, termasuk handling SPA routing dengan `vercel.json`

---

## Cara Menjalankan

```bash
# install dependencies
npm install

# jalankan development server
npm run dev

# build project untuk production
npm run build

# preview hasil build
npm run preview
```
