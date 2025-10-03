# 🧑‍💼 Employee Data Management

Employee Data Management is a **full-stack CRUD application** for managing employees.
It uses an **Express + SQLite (TypeScript)** backend and a **React + Vite (TypeScript)** frontend, following a clean monorepo structure.

---

## 🚀 Live Demo

- **Frontend:** [https://employee-frontend-nrnv.onrender.com](https://employee-frontend-nrnv.onrender.com)
- **Backend API:** [https://employee-backend-o6uz.onrender.com](https://employee-backend-o6uz.onrender.com)

---
  
## 🧠 Tech Stack

| Layer    | Technology                            |
| -------- | ------------------------------------- |
| Backend  | Node.js, Express, SQLite3, TypeScript |
| Frontend | React, Vite, TypeScript               |
| Database | SQLite                                |
| Hosting  | Render                                |

---

## 📦 Monorepo Structure

```
Employee Data Management/
├── employee-backend/       # Express + SQLite API (TypeScript)
└── employee-frontend/      # React + Vite App (TypeScript)
```

---

## ✅ Prerequisites

- Node.js **v18+**

---

## ⚙️ Setup Instructions

### 1. Install Dependencies

```bash
cd employee-backend && npm install
cd ../employee-frontend && npm install
```

---

### 2. Environment Variables (Backend)

Create `employee-backend/.env`:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
DB_PATH=Data_Base/employees.db
```

The database and table will be created automatically if they don’t exist.

---

### 3. Run Locally

#### Backend (Development - ESM with ts-node)

```bash
cd employee-backend
npm run dev
```

#### Backend (Production)

```bash
cd employee-backend
npm run build
npm start
```

---

### 🖥️ Frontend Setup (React + Vite + TypeScript)

#### 1. Install Dependencies

```bash
cd employee-frontend
npm install
```

---

#### 2. Environment Variables (Frontend)

Create a `.env` file inside **employee-frontend**:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_TITLE=Employee Management System
```

> 💡 `VITE_API_BASE_URL` points to your backend API.
> In production, update it to your hosted backend URL, for example:
>
> ```env
> VITE_API_BASE_URL=https://employee-backend-o6uz.onrender.com/api
> ```

---

#### 3. Run Locally

```bash
cd employee-frontend
npm run dev
```

Then open the app in your browser at:

👉 [http://localhost:5173](http://localhost:5173)

---

#### 4. Production Build

To build for production:

```bash
cd employee-frontend
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Environment Configuration

| File              | Variable            | Description                  |
| ----------------- | ------------------- | ---------------------------- |
| `.env` (backend)  | `PORT`              | Server port (e.g., 5000)     |
|                   | `FRONTEND_URL`      | Allowed CORS origin          |
|                   | `DB_PATH`           | Path to SQLite database file |
| `.env` (frontend) | `VITE_API_BASE_URL` | Backend API base URL         |

For **production frontend**, set:

```env
VITE_API_BASE_URL=https://employee-backend-o6uz.onrender.com/api
```

---

## 🧪 Tests

Once configured, you can run tests as:

```bash
cd employee-backend && npm test
cd employee-frontend && npm test
```

- Prefer `jest` + `supertest` for backend
- Prefer `vitest` for frontend

---

## 📡 API Endpoints

| Method | Endpoint             | Description     |
| ------ | -------------------- | --------------- |
| GET    | `/api/employees`     | List employees  |
| POST   | `/api/employees`     | Create employee |
| GET    | `/api/employees/:id` | Get employee    |
| PUT    | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |

---

## 📝 Assumptions & Design Choices

- ✅ Uses **SQLite** for simplicity and portability
- ✅ Auto-creates database and `employees` table on startup
- ✅ Uses `.env` to configure CORS via `FRONTEND_URL`
- ✅ Backend uses TypeScript with **NodeNext** + **ESM imports**
- ✅ Dev uses `ts-node` loader; production uses compiled JS in `dist/`
- ✅ Axios is used for API calls with `VITE_API_BASE_URL`

---

## ✨ Bonus Features

- 🔍 Search / filter bar on frontend with **debounce**
- ✅ Form validation before submission
- 🧠 Modular hooks and components for cleaner code structure
- 🌈 Professional folder organization (frontend + backend)

---

## ⚠️ Common Issues

- ❌ **ESM Import Errors** — Run backend with `npm run dev` (uses ts-node ESM) or use the build+start flow.
- ❌ **Database Path Issues** — The app auto-creates `Data_Base/`. Ensure the directory is writable.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👤 Author

**Varad Pawar**
🎓 BCA Graduate | 💻 Full Stack Developer
🌐 [GitHub](https://github.com/varad-pawar1/Employee-Data-Management)
