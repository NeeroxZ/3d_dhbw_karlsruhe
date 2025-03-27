import * as THREE from "three";

// Klont das Material eines Meshes – egal ob Array oder einzelnes Material
export function cloneMeshMaterial(mesh: THREE.Mesh): void {
    mesh.material = Array.isArray(mesh.material)
        ? mesh.material.map((mat) => mat.clone())
        : mesh.material.clone();
}

// Wendet fensterspezifische Einstellungen an

export function applyWindowMaterial(
    material: THREE.Material | THREE.Material[],
    useTransmission: boolean = false // Standard: Opacity-Ansatz
): void {
    // Variante 1: Klassischer Transparenz-Ansatz
    const setWindowPropsOpacity = (m: any) => {
        m.transparent = true;   // Transparenz aktivieren
        m.opacity = 0.2;          // 0 = vollkommen durchsichtig (hier: 20% Sichtbarkeit)
        m.color.set("#ffffff");   // Setzt den Farbstich (bei voller Transparenz unwichtig)
        m.roughness = 0.5;        // Matte Oberfläche
        m.metalness = 0.0;        // Nicht metallisch
        m.depthWrite = false;     // Verhindert Tiefen-Sortierungsprobleme
        m.blending = THREE.NormalBlending;
        m.refractionRatio = 0.98; // Leichte Brechungseffekte
    };

    // Variante 2: Physikalisch basierter Ansatz (echte Transmission)
    const setWindowPropsTransmission = (m: any) => {
        m.transparent = true;       // Transparenz aktivieren
        m.opacity = 0.9;            // Optional: Ein leichtes Verdunkeln (wird bei Transmission weniger beachtet)
        m.color.set("#ffffff");
        m.roughness = 0.1;          // Für glänzende Glasoberfläche (je nach gewünschtem Look anpassen)
        m.metalness = 0.75;          // Nicht metallisch
        m.depthWrite = false;
        m.blending = THREE.AmbientLight;
        m.refractionRatio = 0.9;

    };

    // Wähle je nach Parameter die passende Variante
    const setWindowProps = (m: any) => {
        if (useTransmission) {
            console.log("Sind wir ier ?");
            setWindowPropsTransmission(m);
        } else {
            setWindowPropsOpacity(m);
        }
    };

    // Wende die Funktion auf das Material bzw. alle Materialien im Array an
    if (Array.isArray(material)) {
        material.forEach((mat) => {
            setWindowProps(mat);
            mat.side = THREE.DoubleSide;
        });
    } else {
        setWindowProps(material);
        material.side = THREE.DoubleSide;
    }
}

// Wendet generelle Einstellungen an (z. B. DoubleSide) und aktiviert Schatten
export function applyGenericMaterial(mesh: THREE.Mesh): void {
    if (Array.isArray(mesh.material)) {
        mesh.material.forEach((mat) => (mat.side = THREE.DoubleSide));
    } else {
        mesh.material.side = THREE.DoubleSide;
    }
    mesh.castShadow = true;
    mesh.receiveShadow = true;
}
