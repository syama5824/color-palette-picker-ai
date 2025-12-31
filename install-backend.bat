@echo off
echo Installing backend dependencies...
cd backend
call npm install
echo.
echo Backend dependencies installed successfully!
echo.
echo Next steps:
echo 1. Edit backend/.env with your AWS credentials
echo 2. Run start-backend.bat to start the API server
echo.
pause