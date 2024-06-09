import { CylinderGeometry, Mesh, MeshStandardMaterial, MeshPhysicalMaterial, Color, Group } from "three";

function createHourglass(scale) {
    const hourglass = new Group();


    const topCapGeometry = new CylinderGeometry(4*scale, 4*scale, 2*scale, 32);
    const topHourglassGeomertry = new CylinderGeometry(4*scale, 1*scale, 8*scale, 32);
    const bottomHourglassGeometry = new CylinderGeometry(1*scale, 4*scale, 8*scale, 32);
    const bottomCapGeometry = new CylinderGeometry(4*scale, 4*scale, 2*scale, 32);

    const materialCap = new MeshStandardMaterial();
    materialCap.color = new Color("#0f381a");

    const materialHourglass = new MeshPhysicalMaterial();
    materialHourglass.transparent = true;
    materialHourglass.opacity = 0.25;
    materialHourglass.premultipliedAlpha = true;

    const topCap = new Mesh(topCapGeometry, materialCap);
    topCap.position.y = 9*scale;
    hourglass.add(topCap);

    const topHourglass = new Mesh(topHourglassGeomertry, materialHourglass);
    topHourglass.position.y = 4*scale;
    hourglass.add(topHourglass);

    const bottomHourglass = new Mesh(bottomHourglassGeometry, materialHourglass);
    bottomHourglass.position.y = -4*scale;
    hourglass.add(bottomHourglass);

    const bottomCap = new Mesh(bottomCapGeometry, materialCap);
    bottomCap.position.y = -9*scale;
    hourglass.add(bottomCap);

    return hourglass;

}

export { createHourglass };