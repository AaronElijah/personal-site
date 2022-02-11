import * as THREE from 'three'
import { StaticImages } from '~/lib/utils'

export function randomAsteroidMaterial() {
  const loader = new THREE.TextureLoader()

  const decider = Math.random()
  let maps = {}
  if (decider < 0.25) {
    maps = {
      map: loader.load(StaticImages.crystalMetal.basecolor),
      aoMap: loader.load(StaticImages.crystalMetal.ao),
      roughnessMap: loader.load(StaticImages.crystalMetal.roughness),
      displacementMap: loader.load(StaticImages.crystalMetal.displacement),
      normalMap: loader.load(StaticImages.crystalMetal.normal),
    }
  } else if (decider < 0.5) {
    maps = {
      map: loader.load(StaticImages.lava.basecolor),
      aoMap: loader.load(StaticImages.lava.ao),
      roughnessMap: loader.load(StaticImages.lava.roughness),
      displacementMap: loader.load(StaticImages.lava.displacement),
      normalMap: loader.load(StaticImages.lava.normal),
    }
  } else if (decider < 0.75) {
    maps = {
      map: loader.load(StaticImages.greenCrystal.basecolor),
      aoMap: loader.load(StaticImages.greenCrystal.ao),
      roughnessMap: loader.load(StaticImages.greenCrystal.roughness),
      displacementMap: loader.load(StaticImages.greenCrystal.displacement),
      normalMap: loader.load(StaticImages.greenCrystal.normal),
    }
  } else {
    maps = {
      map: loader.load(StaticImages.lapisLazuli.basecolor),
      aoMap: loader.load(StaticImages.lapisLazuli.ao),
      roughnessMap: loader.load(StaticImages.lapisLazuli.roughness),
      displacementMap: loader.load(StaticImages.lapisLazuli.displacement),
      normalMap: loader.load(StaticImages.lapisLazuli.normal),
    }
  }

  return new THREE.MeshStandardMaterial(maps)
}
