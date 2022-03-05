import * as THREE from 'three'
import { StaticImages } from '~/lib/utils'

export async function randomAsteroidMaterial() {
  const loader = new THREE.TextureLoader()

  const decider = Math.random()
  let maps = {}
  if (decider < 0.25) {
    maps = {
      map: await loader.loadAsync(StaticImages.crystalMetal.basecolor),
      aoMap: await loader.loadAsync(StaticImages.crystalMetal.ao),
      roughnessMap: await loader.loadAsync(StaticImages.crystalMetal.roughness),
      displacementMap: await loader.loadAsync(
        StaticImages.crystalMetal.displacement
      ),
      normalMap: await loader.loadAsync(StaticImages.crystalMetal.normal),
    }
  } else if (decider < 0.5) {
    maps = {
      map: await loader.loadAsync(StaticImages.lava.basecolor),
      aoMap: await loader.loadAsync(StaticImages.lava.ao),
      roughnessMap: await loader.loadAsync(StaticImages.lava.roughness),
      displacementMap: await loader.loadAsync(StaticImages.lava.displacement),
      normalMap: await loader.loadAsync(StaticImages.lava.normal),
    }
  } else if (decider < 0.75) {
    maps = {
      map: await loader.loadAsync(StaticImages.greenCrystal.basecolor),
      aoMap: await loader.loadAsync(StaticImages.greenCrystal.ao),
      roughnessMap: await loader.loadAsync(StaticImages.greenCrystal.roughness),
      displacementMap: await loader.loadAsync(
        StaticImages.greenCrystal.displacement
      ),
      normalMap: await loader.loadAsync(StaticImages.greenCrystal.normal),
    }
  } else {
    maps = {
      map: await loader.loadAsync(StaticImages.lapisLazuli.basecolor),
      aoMap: await loader.loadAsync(StaticImages.lapisLazuli.ao),
      roughnessMap: await loader.loadAsync(StaticImages.lapisLazuli.roughness),
      displacementMap: await loader.loadAsync(
        StaticImages.lapisLazuli.displacement
      ),
      normalMap: await loader.loadAsync(StaticImages.lapisLazuli.normal),
    }
  }

  return new THREE.MeshStandardMaterial(maps)
}
