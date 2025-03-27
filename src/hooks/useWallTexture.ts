import { useTexture } from "@react-three/drei";

export function useWallTexture() {
    const [wallAlbedo, wallNormal, wallRoughness, wallDisplacement] = useTexture([
        "textures/wall/painted_plaster_color.jpg",
        "textures/wall/painted_plaster_normal.jpg",
        "textures/wall/painted_plaster_roughness.jpg",
        "textures/wall/painted_plaster_displacement.jpg",
    ]);

    return { wallAlbedo, wallNormal, wallRoughness, wallDisplacement };
}
