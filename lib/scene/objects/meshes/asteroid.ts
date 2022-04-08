import * as THREE from 'three'
import { clientSideOnly, randomBetween, StaticImages } from '~/lib/utils'

export async function randomAsteroidMaterial() {
  const loader = new THREE.TextureLoader()

  const decider = Math.random()
  let maps = {}
  if (decider < 0.25) {
    maps = {
      map: await loader.loadAsync(StaticImages.crystalMetal.basecolor),
      aoMap: await loader.loadAsync(StaticImages.crystalMetal.ao),
      roughnessMap: await loader.loadAsync(StaticImages.crystalMetal.roughness),
      displacementMap: await loader.loadAsync(
        StaticImages.crystalMetal.displacement
      ),
      normalMap: await loader.loadAsync(StaticImages.crystalMetal.normal),
    }
  } else if (decider < 0.5) {
    maps = {
      map: await loader.loadAsync(StaticImages.lava.basecolor),
      aoMap: await loader.loadAsync(StaticImages.lava.ao),
      roughnessMap: await loader.loadAsync(StaticImages.lava.roughness),
      displacementMap: await loader.loadAsync(StaticImages.lava.displacement),
      normalMap: await loader.loadAsync(StaticImages.lava.normal),
    }
  } else if (decider < 0.75) {
    maps = {
      map: await loader.loadAsync(StaticImages.greenCrystal.basecolor),
      aoMap: await loader.loadAsync(StaticImages.greenCrystal.ao),
      roughnessMap: await loader.loadAsync(StaticImages.greenCrystal.roughness),
      displacementMap: await loader.loadAsync(
        StaticImages.greenCrystal.displacement
      ),
      normalMap: await loader.loadAsync(StaticImages.greenCrystal.normal),
    }
  } else {
    maps = {
      map: await loader.loadAsync(StaticImages.lapisLazuli.basecolor),
      aoMap: await loader.loadAsync(StaticImages.lapisLazuli.ao),
      roughnessMap: await loader.loadAsync(StaticImages.lapisLazuli.roughness),
      displacementMap: await loader.loadAsync(
        StaticImages.lapisLazuli.displacement
      ),
      normalMap: await loader.loadAsync(StaticImages.lapisLazuli.normal),
    }
  }

  return new THREE.MeshStandardMaterial(maps)
}

// Coordinates of the 8 vertices of a cube object in normal space
// 24 elements in array = 8 vertices * 3 dimensional normal space
const verticesOfCube: readonly number[] = [
  -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1,
  1, 1,
]

const indicesOfFaces: number[] = [
  2, 1, 0, 0, 3, 2, 0, 4, 7, 7, 3, 0, 0, 1, 5, 5, 4, 0, 1, 2, 6, 6, 5, 1, 2, 3,
  7, 7, 6, 2, 4, 5, 6, 6, 7, 4,
]

export const randomAsteroidGeometry = clientSideOnly(() => {
  const scale = randomBetween(0.9, 1)
  const scaledVertices = verticesOfCube.map((vert) => scale * vert)
  const randomVertices = scaledVertices.map(
    (coord) => coord * (1 + (2 * Math.random() - 1))
  )
  return new THREE.PolyhedronGeometry(randomVertices, indicesOfFaces, 1, 2)
})

export const addAsteroid = clientSideOnly(
  async (
    scene: THREE.Scene
  ): Promise<
    [
      THREE.Mesh<THREE.PolyhedronGeometry, THREE.MeshStandardMaterial>,
      THREE.Scene
    ]
  > => {
    const geometry = randomAsteroidGeometry()
    const material = await randomAsteroidMaterial()
    const asteroid = new THREE.Mesh(geometry, material)
    const [x, y, z] = Array(3)
      .fill(0)
      .map(() => THREE.MathUtils.randFloatSpread(100))
    asteroid.position.set(x, y, z)

    scene.add(asteroid)
    return [asteroid, scene]
  }
)
