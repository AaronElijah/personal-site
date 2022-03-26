import * as THREE from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { createGLTF, GLTFOptions } from '~/lib/utils/gltf'

interface IAddSpaceship {
  scene: THREE.Scene
  options?: {
    scale?: [number, number, number]
    position?: [number, number, number]
  }
}

async function addStarDestroyer({
  scene,
  options,
}: IAddSpaceship): Promise<[GLTF, THREE.Scene]> {
  const gltf = await createGLTF(GLTFOptions.StarDestroyer)
  if (options?.position) gltf.scene.position.set(...options.position)
  scene.add(gltf.scene)
  return [gltf, scene]
}

async function addApolloCommandModule({
  scene,
  options,
}: IAddSpaceship): Promise<[GLTF, THREE.Scene]> {
  const gltf = await createGLTF(GLTFOptions.ApolloModule)
  if (options?.scale) gltf.scene.scale.set(...options.scale)
  if (options?.position) gltf.scene.position.set(...options.position)
  scene.add(gltf.scene)
  return [gltf, scene]
}

export { addStarDestroyer, addApolloCommandModule }
