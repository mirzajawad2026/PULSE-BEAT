@echo off
setlocal
cd /d "%~dp0"

echo.
echo ==========================================
echo        PulseBeat - First Time Setup
echo ==========================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed or is not in PATH.
  echo Install Node.js LTS and run this file again.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo npm is not available in PATH.
  pause
  exit /b 1
)

echo [1/4] Installing frontend packages...
cd frontend
call npm install
if errorlevel 1 goto :error

echo.
echo [2/4] Installing backend packages...
cd ..\Backend
call npm install
if errorlevel 1 goto :error

echo.
echo [3/4] Checking environment file...
if not exist ".env" (
  copy ".env.example" ".env" >nul
  echo Created Backend\.env from .env.example
  echo IMPORTANT: Open Backend\.env and add your MongoDB/ImageKit/JWT values.
)

echo.
echo [4/4] Setup complete.
echo.
echo To start the web + backend + Electron development app:
echo    cd frontend
echo    npm run desktop
echo.
pause
exit /b 0

:error
echo.
echo Setup failed. Read the npm error above.
pause
exit /b 1
