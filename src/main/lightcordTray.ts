/*
 * LIGHTCORD — System Tray (injection mode)
 * Creates a LIGHTCORD system tray icon when injected into Discord Desktop.
 * Discord doesn't create a tray icon when injected — we create our own.
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import electron, { app, Menu, nativeImage, Tray } from "electron";
import { dirname, join } from "path";

/**
 * Initializes the LIGHTCORD system tray icon.
 * Should only be called on Windows, outside overlay mode.
 * @param injectorPath - Path to the injector entry point (require.main.filename)
 */
export function initLIGHTCORDTray(injectorPath: string) {
    if (process.platform !== "win32") return;

    app.whenReady().then(() => {
        try {
            const { existsSync } = require("original-fs");

            const discordLocalAppData = join(process.env.LOCALAPPDATA || "", "Discord");
            const iconCandidates = [
                join(discordLocalAppData, "app.ico"),
                join(process.resourcesPath, "..", "..", "app.ico"),
                join(process.resourcesPath, "app.ico"),
                join(dirname(injectorPath), "..", "..", "app.ico"),
            ];
            const iconPath = iconCandidates.find(p => existsSync(p));

            let icon: Electron.NativeImage;
            if (iconPath) {
                icon = nativeImage.createFromPath(iconPath);
            } else {
                const discordExe = join(discordLocalAppData, "Update.exe");
                if (existsSync(discordExe)) {
                    icon = nativeImage.createFromPath(discordExe);
                } else {
                    icon = nativeImage.createEmpty();
                }
            }

            const tray = new Tray(icon);
            tray.setToolTip("LIGHTCORD");

            const trayMenu = Menu.buildFromTemplate([
                {
                    label: "Open LIGHTCORD",
                    click() {
                        const wins = electron.BrowserWindow.getAllWindows();
                        const main = wins.find(w => !w.isDestroyed()) ?? wins[0];
                        if (main) { main.show(); main.focus(); }
                    }
                },
                { type: "separator" },
                {
                    label: "Uninstall LIGHTCORD",
                    click() {
                        const uninstallerCandidates = [
                            join(process.env.LOCALAPPDATA || "", "Programs", "LIGHTCORD", "Uninstall LIGHTCORD.exe"),
                            join(process.env.LOCALAPPDATA || "", "Programs", "LIGHTCORD", "Uninstall LIGHTCORD.exe"),
                            join(process.env.PROGRAMFILES || "", "LIGHTCORD", "Uninstall LIGHTCORD.exe"),
                        ];
                        const { existsSync: fsExists } = require("original-fs");
                        const uninstaller = uninstallerCandidates.find(p => fsExists(p));
                        if (uninstaller) {
                            const { spawn } = require("child_process");
                            spawn(uninstaller, [], { detached: true, stdio: "ignore" }).unref();
                            app.quit();
                        } else {
                            const { shell } = require("electron");
                            shell.openExternal("ms-settings:appsfeatures");
                        }
                    }
                },
                { type: "separator" },
                {
                    label: "Quit",
                    click() { app.quit(); }
                }
            ]);

            tray.setContextMenu(trayMenu);
            tray.on("click", () => {
                const wins = electron.BrowserWindow.getAllWindows();
                const main = wins.find(w => !w.isDestroyed()) ?? wins[0];
                if (main) {
                    if (main.isVisible()) main.focus();
                    else main.show();
                }
            });

            console.log("[LIGHTCORD] Tray created ✓", iconPath ?? "(icon from exe)");
        } catch (e) {
            console.error("[LIGHTCORD] Failed to create tray:", e);
        }
    });
}
