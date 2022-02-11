import * as THREE from 'three'
import { clientSideOnly, StaticImages } from '~/lib/utils'
import { randomAsteroidMaterial } from '~/lib/space/texture'
import { randomGeometry } from '~/lib/space/geometry'

type AddSpaceBodyReturn = [
  THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>,
  THREE.Scene
]

const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128, {
  format: THREE.RGBAFormat,
  generateMipmaps: true,
  minFilter: THREE.LinearMipmapLinearFilter,
  encoding: THREE.sRGBEncoding,
})

const cubeCamera = new THREE.CubeCamera(1, 10000, cubeRenderTarget)

export const addDonut = clientSideOnly((scene: THREE.Scene) => {
  const loader = new THREE.TextureLoader()

  // Shapes in threejs require a geometry (set of coords) and a material
  const geometry = new THREE.TorusGeometry(200, 3, 16, 100)
  const material = new THREE.MeshStandardMaterial({
    map: loader.load(StaticImages.damascusSteel.basecolor),
    metalnessMap: loader.load(StaticImages.damascusSteel.metal),
    normalMap: loader.load(StaticImages.damascusSteel.normal),
    aoMap: loader.load(StaticImages.damascusSteel.ao),
    roughnessMap: loader.load(StaticImages.damascusSteel.roughness),
    displacementMap: loader.load(StaticImages.damascusSteel.displacement),
    envMap: cubeRenderTarget.texture,
  })
  const torus = new THREE.Mesh(geometry, material)
  torus.geometry.attributes.uv2 = torus.geometry.attributes.uv
  torus.add(cubeCamera)
  scene.add(torus)
  return [torus, scene]
})

export const addMars = clientSideOnly(
  (scene: THREE.Scene): AddSpaceBodyReturn => {
    const mars = new THREE.Mesh(
      new THREE.SphereGeometry(10, 64, 64),
      new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load(StaticImages.mars.basecolor),
        normalMap: new THREE.TextureLoader().load(StaticImages.mars.normal),
        roughness: 2,
      })
    )
    mars.position.set(-20, 0, 50)
    scene.add(mars)
    return [mars, scene]
  }
)

export function addJupiter(scene: THREE.Scene): AddSpaceBodyReturn {
  const jupiter = new THREE.Mesh(
    new THREE.SphereGeometry(25, 64, 64),
    new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load(StaticImages.jupiter),
    })
  )
  jupiter.position.set(50, 0, 70)
  scene.add(jupiter)
  return [jupiter, scene]
}

export function addNeptune(scene: THREE.Scene): AddSpaceBodyReturn {
  const neptune = new THREE.Mesh(
    new THREE.SphereGeometry(15, 64, 64),
    new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load(StaticImages.neptune),
    })
  )
  neptune.position.set(30, 0, -40)
  scene.add(neptune)
  return [neptune, scene]
}

export function addSun(scene: THREE.Scene): AddSpaceBodyReturn {
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(40, 64, 64),
    new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load(StaticImages.sun),
    })
  )
  sun.position.set(-60, 0, -70)
  scene.add(sun)
  return [sun, scene]
}

export function addAsteroid(
  scene: THREE.Scene
): [
  THREE.Mesh<THREE.PolyhedronGeometry, THREE.MeshStandardMaterial>,
  THREE.Scene
] {
  const geometry = randomGeometry()
  const material = randomAsteroidMaterial()
  const asteroid = new THREE.Mesh(geometry, material)
  const [x, y, z] = Array(3)
    .fill(0)
    .map(() => THREE.MathUtils.randFloatSpread(100))
  asteroid.position.set(x, y, z)

  scene.add(asteroid)
  return [asteroid, scene]
}

export function addProfileBox(scene: THREE.Scene) {
  const aaron = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 5),
    new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load(StaticImages.profile),
    })
  )
  scene.add(aaron)
  return scene
}
