import * as THREE from "three";

const verticesOfCube: readonly number[] = [
  -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1,
  1, 1,
];

const indicesOfFaces: number[] = [
  2, 1, 0, 0, 3, 2, 0, 4, 7, 7, 3, 0, 0, 1, 5, 5, 4, 0, 1, 2, 6, 6, 5, 1, 2, 3,
  7, 7, 6, 2, 4, 5, 6, 6, 7, 4,
];

function _randomGeometry() {
  const scale = Math.random();
  const scaledVertices = verticesOfCube.map((vert) => 5 * scale * vert);
  const randomVertices = scaledVertices.map(
    (coord) => coord * (1 + (2 * Math.random() - 1))
  );

  return new THREE.PolyhedronGeometry(randomVertices, indicesOfFaces, 1, 2);
}

const loader = new THREE.TextureLoader();

const crystalMetalMaps = {
  map: loader.load(`../../assets/crystal_metal/basecolor.jpg`),
  aoMap: loader.load(`../../assets/crystal_metal/ambientOcclusion.jpg`),
  roughnessMap: loader.load(`../../assets/crystal_metal/roughness.jpg`),
  displacementMap: loader.load(`../../assets/crystal_metal/height.png`),
  normalMap: loader.load(`../../assets/crystal_metal/normal.jpg`),
};

const lavaMaps = {
  map: loader.load(`../../assets/lava/basecolor.jpg`),
  aoMap: loader.load(`../../assets/lava/ambientOcclusion.jpg`),
  roughnessMap: loader.load(`../../assets/lava/roughness.jpg`),
  displacementMap: loader.load(`../../assets/lava/height.png`),
  normalMap: loader.load(`../../assets/lava/normal.jpg`),
};

const greenCrystalMaps = {
  map: loader.load(`../../assets/green_crystal/basecolor.jpg`),
  aoMap: loader.load(`../../assets/green_crystal/ambientOcclusion.jpg`),
  roughnessMap: loader.load(`../../assets/green_crystal/roughness.jpg`),
  displacementMap: loader.load(`../../assets/green_crystal/height.png`),
  normalMap: loader.load(`../../assets/green_crystal/normal.jpg`),
};

const lapisLazuliMaps = {
  map: loader.load(`../../assets/lapis_lazuli/basecolor.jpg`),
  aoMap: loader.load(`../../assets/lapis_lazuli/ambientOcclusion.jpg`),
  roughnessMap: loader.load(`../../assets/lapis_lazuli/roughness.jpg`),
  displacementMap: loader.load(`../../assets/lapis_lazuli/height.png`),
  normalMap: loader.load(`../../assets/lapis_lazuli/normal.jpg`),
};

function _randomAsteroidMaterial() {
  const decider = Math.random();
  let maps = {};
  if (decider < 0.25) {
    maps = { ...crystalMetalMaps };
  } else if (decider < 0.5) {
    maps = { ...lavaMaps };
  } else if (decider < 0.75) {
    maps = { ...greenCrystalMaps };
  } else {
    maps = { ...lapisLazuliMaps };
  }

  return new THREE.MeshStandardMaterial(maps);
}

export function addAsteroids(
  scene: THREE.Scene
): [
  THREE.Mesh<THREE.PolyhedronGeometry, THREE.MeshStandardMaterial>,
  THREE.Scene
] {
  const geometry = _randomGeometry();
  const material = _randomAsteroidMaterial();
  const asteroid = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3)
    .fill(0)
    .map(() => THREE.MathUtils.randFloatSpread(100));
  asteroid.position.set(x, y, z);

  scene.add(asteroid);
  return [asteroid, scene];
}

export function addSpaceBackground(scene: THREE.Scene) {
  const galaxyTexture = new THREE.TextureLoader().load(
    "../../assets/large_space.jpg"
  );
  scene.background = galaxyTexture;
}

type AddSpaceBodyReturn = [
  THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>,
  THREE.Scene
];

export function addMars(scene: THREE.Scene): AddSpaceBodyReturn {
  const mars = new THREE.Mesh(
    new THREE.SphereGeometry(10, 64, 64),
    new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load("../../assets/8k_mars.jpg"),
      normalMap: new THREE.TextureLoader().load(
        "../../assets/12k_mars_normal.jpg"
      ),
      roughness: 2,
    })
  );
  mars.position.set(-20, 0, 50);
  scene.add(mars);
  return [mars, scene];
}

export function addJupiter(scene: THREE.Scene): AddSpaceBodyReturn {
  const jupiter = new THREE.Mesh(
    new THREE.SphereGeometry(25, 64, 64),
    new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load("../../assets/8k_jupiter.jpg"),
    })
  );
  jupiter.position.set(50, 0, 70);
  scene.add(jupiter);
  return [jupiter, scene];
}

export function addNeptune(scene: THREE.Scene): AddSpaceBodyReturn {
  const neptune = new THREE.Mesh(
    new THREE.SphereGeometry(15, 64, 64),
    new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load("../../assets/2k_neptune.jpg"),
    })
  );
  neptune.position.set(30, 0, -40);
  scene.add(neptune);
  return [neptune, scene];
}

export function addSun(scene: THREE.Scene): AddSpaceBodyReturn {
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(40, 64, 64),
    new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load("../../assets/8k_sun.jpg"),
    })
  );
  sun.position.set(-60, 0, -70);
  scene.add(sun);
  return [sun, scene];
}
