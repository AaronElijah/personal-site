import * as THREE from "three";

const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128, {
  format: THREE.RGBFormat,
  generateMipmaps: true,
  minFilter: THREE.LinearMipmapLinearFilter,
  encoding: THREE.sRGBEncoding,
});

const cubeCamera = new THREE.CubeCamera(1, 10000, cubeRenderTarget);

export function addDonut(scene: THREE.Scene) {
  const loader = new THREE.TextureLoader();
  const chosenMaterial = "damascus_steel";
  const baseColour = loader.load(
    `../../assets/${chosenMaterial}/basecolor.jpg`
  );
  const metalness = loader.load(`../../assets/${chosenMaterial}/metallic.jpg`);
  const normal = loader.load(`../../assets/${chosenMaterial}/normal.jpg`);
  const height = loader.load(`../../assets/${chosenMaterial}/height.png`);
  const ambientOcclusion = loader.load(
    `../../assets/${chosenMaterial}/ambientOcclusion.jpg`
  );
  const roughness = loader.load(`../../assets/${chosenMaterial}/roughness.jpg`);
  // Shapes in threejs require a geometry (set of coords) and a material
  const geometry = new THREE.TorusGeometry(200, 3, 16, 100);
  const material = new THREE.MeshStandardMaterial({
    map: baseColour,
    metalnessMap: metalness,
    normalMap: normal,
    aoMap: ambientOcclusion,
    roughnessMap: roughness,
    displacementMap: height,
    envMap: cubeRenderTarget.texture,
  });
  const torus = new THREE.Mesh(geometry, material);
  torus.geometry.attributes.uv2 = torus.geometry.attributes.uv;
  torus.add(cubeCamera);
  scene.add(torus);
  return [torus, scene];
}
