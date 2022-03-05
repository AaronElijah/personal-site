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
