@echo off
echo Starting Task Tracker Lite...
echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "npm start"
echo Backend server starting on http://localhost:5000
echo.
echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm run dev"
echo Frontend server starting on http://localhost:3000
echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
pause 
