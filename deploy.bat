@echo off
echo Building the application...
call npm run build

echo.
echo Deployment completed successfully
echo Note: For full deployment, you'll need to configure your web server to handle the proxy properly.
echo Add this to your Nginx configuration:
echo.
echo location /api/ {
echo   proxy_pass http://14.225.23.190:3638/app/rest/v2/;
echo   proxy_set_header Host $host;
echo   proxy_set_header X-Real-IP $remote_addr;
echo   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
echo   proxy_set_header X-Forwarded-Proto $scheme;
echo } 