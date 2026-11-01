@echo off
setlocal
cd /d "%~dp0"

echo.
echo ==========================================
echo        PulseBeat - Windows Build
echo ==========================================
echo.

if not exist "frontend\node_modules" (
  echo Frontend packages are missing. Installing...
  cd frontend
  call npm install
  if errorlevel 1 goto :error
  cd ..
)

if not exist "Backend\node_modules" (
  echo Backend packages are missing. Installing...
  cd Backend
  call npm install
  if errorlevel 1 goto :error
  cd ..
)

if not exist "Backend\.env" (
  echo Backend\.env is missing.
  echo Create it from Backend\.env.example before building.
  pause
  exit /b 1
)

cd frontend
call npm run desktop:build
if errorlevel 1 goto :error

echo.
echo ==========================================
echo Build complete.
echo Check frontend\release for the installer.
echo ==========================================
pause
exit /b 0

:error
echo.
echo Build failed. Read the npm/electron-builder error above.
pause
exit /b 1
