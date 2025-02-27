# Studienarbeit: 3D-Webanwendung mit React Fiber

## Projektbeschreibung

Diese Studienarbeit beschäftigt sich mit der Umsetzung einer 3D-Webanwendung mit **React Fiber**. Ziel ist es, eine interaktive Umgebung zu schaffen, die den DHBW Karlsruhe Campus visualisiert und dem Nutzer eine intuitive Navigation bietet. Das 3D-Modell des Campus wurde mit **Blender** modelliert und in die Webanwendung integriert.

## Funktionen & Features

- 3D-Visualisierung des DHBW Karlsruhe Campus
- Interaktive Navigation innerhalb der Umgebung
- Nutzung von **React Fiber** für eine performante Darstellung
- Integration von **Leva** zur Anpassung der Szeneneinstellungen
- 3D-Modellierung des Campus mit **Blender**

## Technologien & Abhängigkeiten

- **Frontend:** React, TypeScript
- **3D-Rendering:** Three.js, React Fiber
- **Werkzeuge:** Blender für Modellierung, Leva für UI-Controls

## Setup & Installation

### Voraussetzungen

- Node.js (>=16.x)
- React Entwicklungsumgebung

### Installation

```bash
# Repository klonen
git clone https://github.com/dein-repo/studienarbeit.git
cd studienarbeit

# Abhängigkeiten installieren
npm install
```

### Anwendung starten

```bash
npm run dev
```

## Nutzung der Anwendung

1. **Starten der Anwendung:** Öffne `http://localhost:3000`
2. **Interaktive Navigation:** Bewege dich durch die 3D-Umgebung.
3. **Anpassungen:** Nutze **Leva**, um die Szene zu modifizieren.

## Entwicklungsanleitung

- Komponenten befinden sich in `src/components`
- 3D-Modelle werden in `public/models` verwaltet
- Szeneneinstellungen sind über `Leva` steuerbar
- Das 3D-Modell wurde mit **Blender** erstellt und für Three.js exportiert

## Lizenz & Danksagungen

Dieses Projekt steht unter der **MIT-Lizenz**. Vielen Dank an alle Beteiligten, die zur Forschung und Umsetzung beigetragen haben!

