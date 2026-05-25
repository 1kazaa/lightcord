@echo off
:: Wrapper .bat pour lancer LIGHTCORD-uninstall.ps1 facilement (double-clic)
title LIGHTCORD — Désinstallation
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0LIGHTCORD-uninstall.ps1"
if %errorlevel% neq 0 pause
