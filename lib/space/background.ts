import * as THREE from 'three'
import { clientSideOnly, StaticImages } from '~/lib/utils'

export const addSpaceBackground = clientSideOnly(
  (scene: THREE.Scene): [THREE.Scene] => {
    const galaxyTexture = new THREE.TextureLoader().load(
      StaticImages.interstellarSpace
    )
    scene.background = galaxyTexture
    return [scene]
  }
)
