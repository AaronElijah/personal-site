import * as THREE from 'three'
import { clientSideOnly } from '~/lib/utils'

interface IAddPointLight {
  scene: THREE.Scene
  options: {
    position: [number, number, number]
    color?: number
  }
}

interface IAddAmbientLight {
  scene: THREE.Scene
  options?: {
    color?: number
  }
}

export const addPointLight = clientSideOnly(
  ({
    scene,
    options: { position, color = 0xf7efc5 },
  }: IAddPointLight): [
    THREE.Scene,
    THREE.PointLight,
    THREE.PointLightHelper
  ] => {
    const light = new THREE.PointLight(color)
    light.position.set(...position)
    const lightHelper = new THREE.PointLightHelper(light)
    scene.add(light)
    scene.add(lightHelper)
    return [scene, light, lightHelper]
  }
)

export const addAmbientLight = clientSideOnly(
  ({
    scene,
    options: { color = 0xf7efc5 } = {},
  }: IAddAmbientLight): [THREE.Scene, THREE.AmbientLight] => {
    const light = new THREE.AmbientLight(color, 0.25)
    scene.add(light)
    return [scene, light]
  }
)
