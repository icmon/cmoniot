@echo off
setlocal enabledelayedexpansion enableextensions

:: =============================================================================
:: AnyDesk Universal ID Reset Script
:: Version: 1.2
:: =============================================================================

set "EnableLogging=0"
set "LogFile=%~dp0AnyDesk_Reset_Log.txt"

title AnyDesk ID Reset v1.2

:: Initialize Logging
if "%EnableLogging%"=="1" ( set "LOG_CMD=>> "%LogFile%" 2>&1" ) else ( set "LOG_CMD=>NUL 2>&1" )
if "%EnableLogging%"=="1" (
    (echo.&echo ==========================================================&echo  AnyDesk Reset Log v1.2 - Started on %DATE% at %TIME%&echo ==========================================================&echo.) > "%LogFile%"
)

:: Check Admin Privileges
reg query HKEY_USERS\S-1-5-19 >NUL 2>&1 || (
call :log "[ERROR] Administrator privileges required. Please run as administrator."
call :log "[INFO] Press any key to close this window..."
    pause >NUL
    exit /b 1
)

call :log "[INFO] Started AnyDesk ID reset process..."

:: Stop AnyDesk Service & Process
taskkill /f /im "AnyDesk.exe" %LOG_CMD%
sc query AnyDesk >NUL 2>&1 && sc stop AnyDesk %LOG_CMD%
call :log "[INFO] AnyDesk service and process stopped."

:: Backup Settings
if exist "%APPDATA%\AnyDesk" (
    if exist "%APPDATA%\AnyDesk\user.conf" (
        copy /y "%APPDATA%\AnyDesk\user.conf" "%temp%\user.conf" %LOG_CMD%
    )
    if exist "%APPDATA%\AnyDesk\thumbnails" (
        xcopy /s /e /y /i "%APPDATA%\AnyDesk\thumbnails" "%temp%\thumbnails\" %LOG_CMD%
    )
    call :log "[INFO] User settings backup completed."
) else (
    call :log "[WARN] AnyDesk profile folder not found. Skipping backup."
)

:: Delete All Config Files
if exist "%ALLUSERSPROFILE%\AnyDesk" rd /s /q "%ALLUSERSPROFILE%\AnyDesk" %LOG_CMD%
if exist "%APPDATA%\AnyDesk" rd /s /q "%APPDATA%\AnyDesk" %LOG_CMD%
call :log "[INFO] Deleted AnyDesk configuration files."

:: Restore User Settings
md "%APPDATA%\AnyDesk" %LOG_CMD%
if exist "%temp%\user.conf" (
    move /y "%temp%\user.conf" "%APPDATA%\AnyDesk\user.conf" %LOG_CMD%
)
if exist "%temp%\thumbnails\" (
    xcopy /s /e /y /i "%temp%\thumbnails\" "%APPDATA%\AnyDesk\thumbnails\" %LOG_CMD%
    rd /s /q "%temp%\thumbnails" %LOG_CMD%
)
call :log "[INFO] User settings restored."

:: Final Message
call :log "[SUCCESS] The process is complete."

call :log "."
call :log "*****************************************************"
call :log "* AnyDesk ID Reset Complete.                        *"
call :log "*                                                   *"
call :log "* You can now start AnyDesk to get a new ID.        *"
call :log "* Your address book and favorites are preserved.    *"
call :log "*****************************************************"
call :log "."
pause
endlocal
exit /b 0

:: ========================
:: Subroutines
:: ========================

:log
set "message=%~1"
echo %message%
if "%EnableLogging%"=="1" (echo [%DATE% %TIME%] %message% >> "%LogFile%")
exit /b 0