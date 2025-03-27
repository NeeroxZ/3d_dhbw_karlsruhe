import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export function useGrassGroundTexture() {
    const texture = useTexture("textures/asphalt.jpg");
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);
    texture.anisotropy = 16;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
}
