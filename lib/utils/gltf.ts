import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const gltfDir = `${
  process.env.NODE_ENV === 'production' ? '/personal-site/' : '/'
}gltf`

export enum GLTFOptions {
  StarDestroyer = 'starDestroyer',
  ApolloModule = 'apolloModule',
}

type GLTFOptionAsset = {
  sceneURL: string
  getTextures: () => Promise<{ [key: string]: string }>
}

// TODO: fetch these resources on module level and only do it once
// Need node-fetch polyfill
const GLTFAssets: { [key in GLTFOptions]: GLTFOptionAsset } = {
  [GLTFOptions.StarDestroyer]: {
    sceneURL: `${gltfDir}/${GLTFOptions.StarDestroyer}/scene.gltf`,
    getTextures: async () => {
      return {
        'textures/Tex_0016_0.dds_baseColor.png': await fetch(
          `${gltfDir}/${GLTFOptions.StarDestroyer}/textures/Tex_0016_0.dds_baseColor.png`
        )
          .then((r) => r.blob())
          .then((blob) => URL.createObjectURL(blob)),
        'textures/Tex_0016_0.dds_emissive.png': await fetch(
          `${gltfDir}/${GLTFOptions.StarDestroyer}/textures/Tex_0016_0.dds_emissive.png`
        )
          .then((r) => r.blob())
          .then((blob) => URL.createObjectURL(blob)),
        'textures/Tex_0020_0.dds_baseColor.png': await fetch(
          `${gltfDir}/${GLTFOptions.StarDestroyer}/textures/Tex_0020_0.dds_baseColor.png`
        )
          .then((r) => r.blob())
          .then((blob) => URL.createObjectURL(blob)),
        'textures/Tex_0024_0.dds_baseColor.png': await fetch(
          `${gltfDir}/${GLTFOptions.StarDestroyer}/textures/Tex_0024_0.dds_baseColor.png`
        )
          .then((r) => r.blob())
          .then((blob) => URL.createObjectURL(blob)),
      }
    },
  },
  [GLTFOptions.ApolloModule]: {
    sceneURL: `${gltfDir}/${GLTFOptions.ApolloModule}/scene.gltf`,
    getTextures: async () => {
      return {
        'textures/material_baseColor.jpeg': await fetch(
          `${gltfDir}/${GLTFOptions.ApolloModule}/textures/material_baseColor.jpeg`
        )
          .then((r) => r.blob())
          .then((blob) => URL.createObjectURL(blob)),
        'textures/ml.001_baseColor.jpeg': await fetch(
          `${gltfDir}/${GLTFOptions.ApolloModule}/textures/ml.001_baseColor.jpeg`
        )
          .then((r) => r.blob())
          .then((blob) => URL.createObjectURL(blob)),
        'textures/ml.002_baseColor.jpeg': await fetch(
          `${gltfDir}/${GLTFOptions.ApolloModule}/textures/ml.002_baseColor.jpeg`
        )
          .then((r) => r.blob())
          .then((blob) => URL.createObjectURL(blob)),
        'textures/ml.003_baseColor.jpeg': await fetch(
          `${gltfDir}/${GLTFOptions.ApolloModule}/textures/ml.003_baseColor.jpeg`
        )
          .then((r) => r.blob())
          .then((blob) => URL.createObjectURL(blob)),
        'textures/ml.004_baseColor.jpeg': await fetch(
          `${gltfDir}/${GLTFOptions.ApolloModule}/textures/ml.004_baseColor.jpeg`
        )
          .then((r) => r.blob())
          .then((blob) => URL.createObjectURL(blob)),
        'textures/ml.005_baseColor.jpeg': await fetch(
          `${gltfDir}/${GLTFOptions.ApolloModule}/textures/ml.005_baseColor.jpeg`
        )
          .then((r) => r.blob())
          .then((blob) => URL.createObjectURL(blob)),
      }
    },
  },
}

export const createGLTF = async (option: GLTFOptions) => {
  const loadingManager = new THREE.LoadingManager()
  const sceneURL = GLTFAssets[option].sceneURL
  const textures = await GLTFAssets[option].getTextures()
  loadingManager.setURLModifier((url) => {
    return textures[url] ?? url
  })
  return await new GLTFLoader(loadingManager).loadAsync(sceneURL)
}
