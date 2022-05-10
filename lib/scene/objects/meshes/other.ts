import * as THREE from 'three'
import { clientSideOnly, StaticImages } from '~/lib/utils'

interface IAddLargeBody {
  scene: THREE.Scene
  largeBody: 'mars' | 'sun' | 'neptune' | 'jupiter' | 'earth'
  options: {
    position: [number, number, number]
  }
}

type RAddSpaceBody = [
  THREE.Mesh<THREE.BufferGeometry, THREE.Material>,
  THREE.Scene
]

export const addLargeBody = clientSideOnly(
  async ({
    scene,
    largeBody,
    options: { position },
  }: IAddLargeBody): Promise<RAddSpaceBody> => {
    let mesh: THREE.Mesh<THREE.BufferGeometry, THREE.Material>
    const loader = new THREE.TextureLoader()
    switch (largeBody) {
      case 'mars': {
        mesh = new THREE.Mesh(
          new THREE.SphereGeometry(10, 64, 64),
          new THREE.MeshStandardMaterial({
            map: await loader.loadAsync(StaticImages.mars.basecolor),
            normalMap: await loader.loadAsync(StaticImages.mars.normal),
            roughness: 2,
          })
        )
        break
      }
      case 'sun': {
        mesh = new THREE.Mesh(
          new THREE.SphereGeometry(40, 64, 64),
          new THREE.MeshStandardMaterial({
            map: await loader.loadAsync(StaticImages.sun),
          })
        )
        break
      }
      case 'jupiter': {
        mesh = new THREE.Mesh(
          new THREE.SphereGeometry(25, 64, 64),
          new THREE.MeshStandardMaterial({
            map: await loader.loadAsync(StaticImages.jupiter),
          })
        )
        break
      }
      case 'neptune': {
        mesh = new THREE.Mesh(
          new THREE.SphereGeometry(15, 64, 64),
          new THREE.MeshStandardMaterial({
            map: await loader.loadAsync(StaticImages.neptune),
          })
        )
        break
      }
      case 'earth': {
        mesh = new THREE.Mesh(
          new THREE.SphereGeometry(10, 64, 64),
          new THREE.MeshPhongMaterial({
            map: await loader.loadAsync(StaticImages.earth.basecolor),
            bumpMap: await loader.loadAsync(StaticImages.earth.bump),
            specularMap: await loader.loadAsync(StaticImages.earth.specular),
          })
        )
        const cloudMesh = new THREE.Mesh(
          new THREE.SphereGeometry(10.2, 64, 64),
          new THREE.MeshPhongMaterial({
            map: await loader.loadAsync(StaticImages.earth.clouds.basecolor),
            alphaMap: await loader.loadAsync(
              StaticImages.earth.clouds.transparency
            ),
            transparent: true,
          })
        )
        mesh.add(cloudMesh)
        break
      }
      default: {
        throw new Error(`No large body with name, ${largeBody}`)
      }
    }
    mesh.position.set(...position)
    scene.add(mesh)
    return [mesh, scene]
  }
)

export const addProfileBox = clientSideOnly(async (scene: THREE.Scene) => {
  const aaron = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 5),
    new THREE.MeshStandardMaterial({
      map: await new THREE.TextureLoader().loadAsync(StaticImages.profile),
    })
  )
  scene.add(aaron)
  return scene
})
