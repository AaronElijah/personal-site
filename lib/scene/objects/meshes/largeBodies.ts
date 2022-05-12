import * as THREE from 'three'
import { clientSideOnly, StaticImages } from '~/lib/utils'

interface IAddSpaceBody {
  scene: THREE.Scene
  spaceBody: 'mars' | 'sun' | 'neptune' | 'jupiter'
  options: {
    position: [number, number, number]
  }
}

type RAddSpaceBody = [
  THREE.Mesh<THREE.BufferGeometry, THREE.Material>,
  THREE.Scene
]

export const addSpaceBody = clientSideOnly(
  async ({
    scene,
    spaceBody,
    options: { position },
  }: IAddSpaceBody): Promise<RAddSpaceBody> => {
    let mesh: THREE.Mesh<THREE.BufferGeometry, THREE.Material>
    const loader = new THREE.TextureLoader()
    switch (spaceBody) {
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
        throw new Error(`No large body with name, ${spaceBody}`)
      }
    }
    mesh.position.set(...position)
    scene.add(mesh)
    return [mesh, scene]
  }
)

export const addProfileBox = clientSideOnly(
  async (scene: THREE.Scene): Promise<RAddSpaceBody> => {
    const aaron = new THREE.Mesh(
      new THREE.BoxGeometry(5, 5, 5),
      new THREE.MeshStandardMaterial({
        map: await new THREE.TextureLoader().loadAsync(StaticImages.profile),
      })
    )
    scene.add(aaron)
    return [aaron, scene]
  }
)
