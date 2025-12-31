@echo off
echo Starting Color Palette Picker with AI...
echo.
echo Starting backend API server...
start "Backend API" cmd /k "cd backend && npm run dev"
echo.
echo Backend starting at http://localhost:3001
echo Frontend running at http://localhost:5173
echo.
echo Make sure you have configured AWS credentials in backend/.env
echo.
pause