@echo off
echo ========================================
echo   Starting AI Color Palette Picker
echo ========================================
echo.
echo Starting backend API server...
echo Backend will run at: http://localhost:3001
echo.
start "AI Backend API" cmd /k "cd backend && echo Starting backend server... && npm run dev"
echo.
echo ✓ Backend starting in new window
echo ✓ Frontend already running at: http://localhost:5173
echo.
echo ========================================
echo   Learning Environment Ready!
echo ========================================
echo.
echo Try these AI themes:
echo • sunset       → warm oranges and pinks
echo • cyberpunk    → neon purples and blues  
echo • ocean        → blues and teals
echo • coffee cafe  → warm browns and creams
echo • forest       → greens and earth tones
echo.
echo Troubleshooting:
echo • If AI unavailable: Check AWS credentials in backend/.env
echo • If backend fails: Run setup-learning-env.bat first
echo • If frontend issues: Refresh http://localhost:5173
echo.
echo Press any key to open the app in your browser...
pause > nul
start http://localhost:5173
echo.
echo Happy learning! 🎨
pause