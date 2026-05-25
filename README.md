<div align="center">
  <img src="./lightcord.ico" width="96" height="96" alt="Lightcord Logo">

  # Lightcord

  **Le client Discord custom ultime — optimisé, sécurisé et riche en fonctionnalités.**

  [![License](https://img.shields.io/badge/license-GPL--3.0-a855f7)](./LICENSE)
  [![Platform](https://img.shields.io/badge/platform-Windows-3b82f6.svg?logo=windows&logoColor=white)](.)

</div>

---

Lightcord est un fork optimisé d'[Equicord](https://github.com/Equicord/Equicord), conçu pour offrir une expérience Discord fluide avec un moteur de plugins avancé, des mises à jour silencieuses et des améliorations audio/UI exclusives.

---

## Prérequis

Avant de commencer, assure-toi d'avoir installé :

| Outil | Version minimale | Lien |
|-------|-----------------|------|
| **Git** | Dernière version | [git-scm.com](https://git-scm.com/download) |
| **Node.js** | 18 LTS ou plus | [nodejs.org](https://nodejs.org) |
| **pnpm** | 10.30.3 ou plus | `npm install -g pnpm` |
| **Discord** | Installé sur le PC | [discord.com](https://discord.com/download) |

> Pour compiler l'installeur : **dotnet SDK** ou **.NET Framework 4.x** (déjà présent sur Windows)

---

## Installation des dépendances

> **Important :** toutes les commandes ci-dessous doivent être exécutées **depuis le dossier du projet**. Ouvre PowerShell et place-toi dedans avant tout :
>
> ```powershell
> cd C:\Users\priva\Desktop\lightcord\lightcord
> ```

Puis installe les dépendances :

```powershell
pnpm install
```

---

## Lancer Lightcord

### Mode développement (avec rechargement automatique)

```powershell
pnpm start:dev
```

Lance Electron directement avec le build de développement. Les modifications au code se rechargent automatiquement.

### Mode normal

```powershell
pnpm start
```

Compile le desktop + le standalone, puis ouvre Electron.

### Injecter dans Discord (sans lancer Electron séparément)

```powershell
pnpm inject
```

Injecte Lightcord dans ton Discord installé. Lance Discord normalement ensuite.

Pour revenir au Discord d'origine :

```powershell
pnpm uninject
```

---

## Compiler un setup (installeur)

### Option 1 — Installeur `.exe` (recommandé)

Compile un installeur Windows autonome avec le script PowerShell :

```powershell
.\build-installer.ps1
```

Ou via le fichier batch :

```bat
build-installer.bat
```

L'exécutable est généré dans `release\installer\Lightcord-Installer.exe`.

> Nécessite **dotnet SDK** (ou .NET Framework 4.x — déjà présent sur Windows par défaut).

---

### Option 2 — Version portable (sans installation)

```powershell
.\build-portable.ps1
```

Génère un dossier `release\Lightcord-dist\` avec Discord pré-patché, prêt à l'emploi sans installation.

---

### Option 3 — Package Electron complet

```powershell
pnpm package
```

Utilise `electron-builder` pour créer une distribution complète dans `release\`.

---

## Résumé des commandes

| Commande | Description |
|----------|-------------|
| `pnpm install` | Installe les dépendances |
| `pnpm start:dev` | Lance en mode dev (watch) |
| `pnpm start` | Compile et lance Electron |
| `pnpm build` | Compile uniquement (sans lancer) |
| `pnpm inject` | Injecte dans Discord |
| `pnpm uninject` | Supprime l'injection |
| `pnpm repair` | Répare une installation Discord |
| `.\build-installer.ps1` | Compile l'installeur `.exe` |
| `.\build-portable.ps1` | Crée une version portable |
| `pnpm package` | Package Electron complet |

---

## Structure du projet

```
lightcord/
├── src/
│   ├── lightcord/          # Moteur principal Lightcord
│   ├── lightcordplugins/   # Plugins communautaires intégrés
│   ├── plugins/            # Plugins Vencord/Equicord
│   ├── main/               # Processus principal Electron
│   ├── renderer/           # Processus de rendu
│   └── preload/            # Scripts preload
├── installer-src/          # Code C# de l'installeur Windows
├── scripts/                # Scripts de build
├── static/                 # Assets statiques (icônes, binaires)
├── lightcord-index.js      # Point d'entrée Electron
├── lightcord-preload.js    # Script preload principal
├── lightcord-install.ps1   # Script d'installation rapide
├── build-installer.ps1     # Compilation de l'installeur
└── build-portable.ps1      # Build de la version portable
```

---

## Crédits

Basé sur [Equicord](https://github.com/Equicord/Equicord) et [Vencord](https://github.com/Vendicated/Vencord).

---

## Avertissement légal

*Lightcord n'est pas affilié à Discord Inc.* L'utilisation de clients tiers est techniquement contraire aux CGU de Discord. Utilisation à vos propres risques.
