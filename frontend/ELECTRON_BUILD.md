# PulseBeat Electron Build

## Development

From this folder:

```bash
npm install
npm run desktop
```

Electron waits for both the Vite frontend and Express backend before opening.

## Production Windows installer

From this folder:

```bash
npm run desktop:build
```

The React app is built first and Electron Builder creates the Windows NSIS installer in `release/`.

The backend is copied into the packaged app and started automatically by Electron.

Keep `Backend/.env` configured before building. The desktop app expects the backend to run on port `3000`.
