import * as THREE from 'three'
import { clientSideOnly, StaticImages } from '~/lib/utils'

export const addSpaceBackground = clientSideOnly(
  async (scene: THREE.Scene): Promise<[THREE.Scene]> => {
    const galaxyTexture = await new THREE.TextureLoader().loadAsync(
      StaticImages.interstellarSpace
    )
    scene.background = galaxyTexture
    return [scene]
  }
)

export const addNebulaBackground = clientSideOnly(
  async (scene: THREE.Scene): Promise<[THREE.Scene]> => {
    const geometry = new THREE.SphereGeometry(500, 60, 40)
    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale(-1, 1, 1)

    const texture = await new THREE.TextureLoader().loadAsync(
      StaticImages.nebulaSpace
    )
    const material = new THREE.MeshBasicMaterial({ map: texture })

    const mesh = new THREE.Mesh(geometry, material)

    scene.add(mesh)

    return [scene]
  }
)
