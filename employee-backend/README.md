## Employee Backend (Express + SQLite + TypeScript)

### Setup
```
npm install
```

Create `.env`:
```
PORT=5000
FRONTEND_URL=http://localhost:5173
DB_PATH=Data_Base/employees.db
```

### Run (development - TS ESM)
```
npm run dev
```

### Build & Run (production)
```
npm run build
npm start
```

### Test (placeholder)
```
# add jest + supertest, then:
npm test
```

### Endpoints
- GET `/api/employees`
- POST `/api/employees`
- GET `/api/employees/:id`
- PUT `/api/employees/:id`
- DELETE `/api/employees/:id`


