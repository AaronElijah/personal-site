import * as THREE from 'three'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

const gltfDir = '/gltf'
const baseUrl = `${gltfDir}/victory_class_star_destroyer`

async function addStarDestroyer(
  scene: THREE.Scene
): Promise<[GLTF, THREE.Scene]> {
  const url = `${baseUrl}/scene.gltf`

  // TODO: fetch these resources on module level and only do it once
  // Need node-fetch polyfill
  const textures = {
    tex16Basecolor: fetch(`${baseUrl}/textures/Tex_0016_0.dds_baseColor.png`)
      .then((r) => r.blob())
      .then((blob) => URL.createObjectURL(blob)),
    tex16Emissive: fetch(`${baseUrl}/textures/Tex_0016_0.dds_emissive.png`)
      .then((r) => r.blob())
      .then((blob) => URL.createObjectURL(blob)),
    tex20Basecolor: fetch(`${baseUrl}/textures/Tex_0020_0.dds_baseColor.png`)
      .then((r) => r.blob())
      .then((blob) => URL.createObjectURL(blob)),
    tex24Basecolor: fetch(`${baseUrl}/textures/Tex_0024_0.dds_baseColor.png`)
      .then((r) => r.blob())
      .then((blob) => URL.createObjectURL(blob)),
  }

  // await for all texture fetches to finish
  const loadedTextures = {
    tex16Basecolor: await textures.tex16Basecolor,
    tex16Emissive: await textures.tex16Emissive,
    tex20Basecolor: await textures.tex20Basecolor,
    tex24Basecolor: await textures.tex24Basecolor,
  }

  const loadingManager = new THREE.LoadingManager()
  loadingManager.setURLModifier((url) => {
    if (url === 'textures/Tex_0016_0.dds_baseColor.png') {
      return loadedTextures.tex16Basecolor
    } else if (url === 'textures/Tex_0016_0.dds_emissive.png') {
      return loadedTextures.tex16Emissive
    } else if (url === 'textures/Tex_0020_0.dds_baseColor.png') {
      return loadedTextures.tex20Basecolor
    } else if (url === 'textures/Tex_0024_0.dds_baseColor.png') {
      return loadedTextures.tex24Basecolor
    }
    return url
  })

  // Load in GLTF spaceship image
  const loader = new GLTFLoader(loadingManager)
  const gltf = await loader.loadAsync(url)
  gltf.scene.position.set(10, 0, 10)
  scene.add(gltf.scene)
  return [gltf, scene]
}

export { addStarDestroyer }
