import * as THREE from 'three'
import { clientSideOnly, StaticImages } from '~/lib/utils'
import { randomAsteroidMaterial } from '~/lib/space/texture'
import { randomGeometry } from '~/lib/space/geometry'

interface IAddLargeBody {
  scene: THREE.Scene
  largeBody: 'mars' | 'sun' | 'neptune' | 'jupiter'
  options: {
    position: [number, number, number]
  }
}

type RAddSpaceBody = [
  THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>,
  THREE.Scene
]

const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128, {
  format: THREE.RGBAFormat,
  generateMipmaps: true,
  minFilter: THREE.LinearMipmapLinearFilter,
  encoding: THREE.sRGBEncoding,
})

const cubeCamera = new THREE.CubeCamera(1, 10000, cubeRenderTarget)

export const addDonut = clientSideOnly(
  async (scene: THREE.Scene): Promise<RAddSpaceBody> => {
    const loader = new THREE.TextureLoader()

    // Shapes in threejs require a geometry (set of coords) and a material
    const geometry = new THREE.TorusGeometry(200, 3, 16, 100)
    const material = new THREE.MeshStandardMaterial({
      map: await loader.loadAsync(StaticImages.damascusSteel.basecolor),
      metalnessMap: await loader.loadAsync(StaticImages.damascusSteel.metal),
      normalMap: await loader.loadAsync(StaticImages.damascusSteel.normal),
      aoMap: await loader.loadAsync(StaticImages.damascusSteel.ao),
      roughnessMap: await loader.loadAsync(
        StaticImages.damascusSteel.roughness
      ),
      displacementMap: await loader.loadAsync(
        StaticImages.damascusSteel.displacement
      ),
      envMap: cubeRenderTarget.texture,
    })
    const torus = new THREE.Mesh(geometry, material)
    // torus.geometry.attributes.uv2 = torus.geometry.attributes.uv
    torus.add(cubeCamera)
    scene.add(torus)
    return [torus, scene]
  }
)

export const addLargeBody = clientSideOnly(
  async ({
    scene,
    largeBody,
    options: { position },
  }: IAddLargeBody): Promise<RAddSpaceBody> => {
    let mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>
    const loader = new THREE.TextureLoader()
    switch (largeBody) {
      case 'mars': {
        mesh = new THREE.Mesh(
          new THREE.SphereGeometry(10, 64, 64),
          new THREE.MeshStandardMaterial({
            map: await loader.loadAsync(StaticImages.mars.basecolor),
            normalMap: await loader.loadAsync(StaticImages.mars.normal),
            roughness: 2,
          })
        )
        break
      }
      case 'sun': {
        mesh = new THREE.Mesh(
          new THREE.SphereGeometry(40, 64, 64),
          new THREE.MeshStandardMaterial({
            map: await loader.loadAsync(StaticImages.sun),
          })
        )
        break
      }
      case 'jupiter': {
        mesh = new THREE.Mesh(
          new THREE.SphereGeometry(25, 64, 64),
          new THREE.MeshStandardMaterial({
            map: await loader.loadAsync(StaticImages.jupiter),
          })
        )
        break
      }
      case 'neptune': {
        mesh = new THREE.Mesh(
          new THREE.SphereGeometry(15, 64, 64),
          new THREE.MeshStandardMaterial({
            map: await loader.loadAsync(StaticImages.neptune),
          })
        )
        break
      }
      default: {
        throw new Error(`No large body with name, ${largeBody}`)
      }
    }
    mesh.position.set(...position)
    scene.add(mesh)
    return [mesh, scene]
  }
)

export const addAsteroid = clientSideOnly(
  async (
    scene: THREE.Scene
  ): Promise<
    [
      THREE.Mesh<THREE.PolyhedronGeometry, THREE.MeshStandardMaterial>,
      THREE.Scene
    ]
  > => {
    const geometry = randomGeometry()
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

export const addProfileBox = clientSideOnly(async (scene: THREE.Scene) => {
  const aaron = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 5),
    new THREE.MeshStandardMaterial({
      map: await new THREE.TextureLoader().loadAsync(StaticImages.profile),
    })
  )
  scene.add(aaron)
  return scene
})
