@echo off
echo Configurando ambiente para build do APK...

REM Verifica se JDK está instalado
set "JDK_PATH="
for /d %%i in ("C:\Program Files\Eclipse Adoptium\jdk-*") do set "JDK_PATH=%%i"
if not defined JDK_PATH (
    for /d %%i in ("C:\Program Files\Java\jdk-*") do set "JDK_PATH=%%i"
)

if not defined JDK_PATH (
    echo ERRO: JDK não encontrado!
    echo Por favor, instale o JDK 17 de: https://adoptium.net/temurin/releases/?version=17
    pause
    exit /b 1
)

echo JDK encontrado em: %JDK_PATH%
set JAVA_HOME=%JDK_PATH%
set PATH=%JAVA_HOME%\bin;%PATH%

echo Limpando cache do Gradle...
cd android
call gradlew clean

echo Fazendo build do APK...
call gradlew assembleRelease

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ APK criado com sucesso!
    echo Localização: android\app\build\outputs\apk\release\app-release.apk
) else (
    echo.
    echo ❌ Falha no build do APK
)

pause