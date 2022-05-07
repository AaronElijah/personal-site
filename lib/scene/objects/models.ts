import * as THREE from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { clientSideOnly } from '~/lib/utils'
import { createGLTF, GLTFOptions } from '~/lib/utils/gltf'

interface IAddGLTFModel {
  scene: THREE.Scene
  model: GLTFOptions
  options?: {
    scale?: [number, number, number]
    position?: [number, number, number]
  }
}

export const addGLTF = clientSideOnly(
  async ({
    scene,
    model,
    options,
  }: IAddGLTFModel): Promise<[GLTF, THREE.Scene]> => {
    const gltf = await createGLTF(model)
    if (options?.scale) gltf.scene.scale.set(...options.scale)
    if (options?.position) gltf.scene.position.set(...options.position)
    scene.add(gltf.scene)
    return [gltf, scene]
  }
)
