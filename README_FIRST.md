# PulseBeat

PulseBeat is a beginner-friendly React + Vite music app with a Node/Express/MongoDB backend and Electron desktop support.

## First time setup

1. Make sure Node.js LTS is installed.
2. Put your MongoDB and ImageKit values in `Backend/.env`.
3. Run `SETUP_WINDOWS.bat`.
4. For development, open a terminal in `frontend` and run:

```bash
npm run desktop
```

This starts:
- React/Vite frontend on http://localhost:5173
- Express backend on http://localhost:3000
- Electron desktop window

## Web only

```bash
cd frontend
npm run dev
```

In another terminal:

```bash
cd Backend
npm start
```

## Windows desktop installer

Run:

```text
BUILD_WINDOWS.bat
```

or:

```bash
cd frontend
npm run desktop:build
```

The installer is created in:

```text
frontend/release
```

## Important

The backend needs these values in `Backend/.env`:

- MONGO_URI
- JWT_PASSWORD
- PRIVATE_IMAGE_KIT
- PUBLIC_KEY

Do not upload real `.env` secrets to GitHub.
