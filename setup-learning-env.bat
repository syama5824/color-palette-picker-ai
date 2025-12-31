@echo off
echo ========================================
echo   Color Palette Picker - Learning Setup
echo ========================================
echo.
echo This script will set up your AI-powered color palette picker for learning.
echo.
echo Step 1: Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed successfully!
echo.

echo Step 2: Installing access checker...
cd ..
call npm install @aws-sdk/client-bedrock-runtime dotenv
echo ✓ Access checker installed!
echo.

echo Step 3: Checking configuration...
if not exist "backend\.env" (
    echo WARNING: .env file not found!
    echo Please edit backend/.env with your AWS root credentials
    echo.
) else (
    echo ✓ Configuration file found
)

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Edit backend/.env with your AWS root credentials
echo 2. Run check-bedrock-access.bat to verify AWS setup
echo 3. Run start-learning-app.bat to start coding
echo.
echo Learning Resources:
echo - Frontend: http://localhost:5173
echo - Backend API: http://localhost:3001
echo - Health Check: http://localhost:3001/api/health
echo.
pause