@echo off
echo Installing dependencies locally...
call npm install

echo.
echo Installing EAS CLI globally just to be safe...
call npm install -g eas-cli

echo.
echo Starting Android Preview Build...
call npx eas-cli build --platform android --profile preview

echo.
echo Starting iOS Preview Build...
echo (Note: iOS builds require an Apple Developer account and may prompt you interactively if devices need to be registered)
call npx eas-cli build --platform ios --profile preview

echo.
echo Builds triggered successfully! 
echo You can download the install files from the Expo dashboard links provided above.
pause
