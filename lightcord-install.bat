@echo off
:: Wrapper .bat pour lancer LIGHTCORD-install.ps1 facilement (double-clic)
title LIGHTCORD — Installation
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0LIGHTCORD-install.ps1"
if %errorlevel% neq 0 pause
