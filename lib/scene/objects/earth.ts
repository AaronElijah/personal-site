import * as THREE from 'three'

import { StaticImages } from '~/lib/utils'

export type City = {
  name: string
  latitude: number
  longitude: number
  color: number
}

export class Earth {
  private radius: number
  private position: THREE.Vector3
  private animate?: (object: THREE.Mesh) => void

  private planetMesh?: THREE.Mesh
  // private atmosphereMesh?: THREE.Mesh
  private cities: Record<string, THREE.Mesh> = {}
  private paths: {
    from: City
    to: City
    progress: number
    mesh: THREE.Mesh
  }[] = []

  constructor(
    radius: number = 10,
    position: THREE.Vector3 = new THREE.Vector3(0, 0, 0),
    animate?: (object: THREE.Mesh) => void
  ) {
    this.radius = radius
    this.position = position
    this.animate = animate
  }

  async addMeshes(scene: THREE.Scene) {
    const loader = new THREE.TextureLoader()

    const maps = {
      map: await loader.loadAsync(StaticImages.earth.basecolor),
      bumpMap: await loader.loadAsync(StaticImages.earth.bump),
      specularMap: await loader.loadAsync(StaticImages.earth.specular),
    }

    maps.map.wrapS = THREE.RepeatWrapping
    maps.bumpMap.wrapS = THREE.RepeatWrapping
    maps.specularMap.wrapS = THREE.RepeatWrapping

    maps.map.offset.x = Math.PI / (4 * Math.PI)
    maps.bumpMap.offset.x = Math.PI / (4 * Math.PI)
    maps.specularMap.offset.x = Math.PI / (4 * Math.PI)

    this.planetMesh = new THREE.Mesh(
      new THREE.SphereGeometry(this.radius, 64, 64),
      new THREE.MeshPhongMaterial({
        map: maps.map,
        bumpMap: maps.bumpMap,
        specularMap: maps.specularMap,
      })
    )
    // this.atmosphereMesh = new THREE.Mesh(
    //   new THREE.SphereGeometry(this.radius + 0.2, 64, 64),
    //   new THREE.MeshPhongMaterial({
    //     map: await loader.loadAsync(StaticImages.earth.clouds.basecolor),
    //     alphaMap: await loader.loadAsync(
    //       StaticImages.earth.clouds.transparency
    //     ),
    //     transparent: true,
    //     opacity: 0.2,
    //   })
    // )
    // this.planetMesh.add(this.atmosphereMesh)
    this.planetMesh.position.set(
      this.position.x,
      this.position.y,
      this.position.z
    )
    this.planetMesh.visible = false
    scene.add(this.planetMesh)
    return this
  }

  addCities(cities: City[]) {
    for (const city of cities) {
      const normalizedLat = (city.latitude * Math.PI) / 180
      const normalizedLong = (city.longitude * Math.PI) / 180

      const eulerCoords = {
        x: this.radius * Math.cos(normalizedLat) * Math.sin(normalizedLong),
        y: this.radius * Math.sin(normalizedLat),
        z: this.radius * Math.cos(normalizedLong) * Math.cos(normalizedLat),
      }

      const cityMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 64, 64),
        new THREE.MeshPhongMaterial({ color: city.color })
      )
      cityMesh.position.set(eulerCoords.x, eulerCoords.y, eulerCoords.z)
      this.cities[city.name] = cityMesh
      this.planetMesh?.add(cityMesh)
    }

    return this
  }

  // cot(𝜙)=tan(𝛾)cos(𝜃−𝜃0)
  // geodesicConstants(
  //   start: { latitude: number; longitude: number },
  //   end: { latitude: number; longitude: number }
  // ) {
  //   const startCoords = {
  //     // theta: ((90 - start.latitude) * Math.PI) / 180,
  //     // theta: (start.latitude * Math.PI) / 180,
  //     // newLat: 90 - start.latitude,
  //     phi: (start.longitude * Math.PI) / 180,
  //   }
  //   const endCoords = {
  //     // theta: ((90 - end.latitude) * Math.PI) / 180,
  //     // theta: (end.latitude * Math.PI) / 180,
  //     // newLat: 90 - end.latitude,
  //     phi: (end.longitude * Math.PI) / 180,
  //   }

  //   const cotangentStartPhi =
  //     Math.cos(startCoords.phi) * Math.tan(startCoords.phi)
  //   const cotangentEndPhi = Math.cos(endCoords.phi) * Math.tan(endCoords.phi)

  //   // eslint-disable-next-line prefer-const
  //   let nerdamer = require('nerdamer')
  //   require('nerdamer/Solve')

  //   const sol = nerdamer.solveEquations([
  //     `x*cos(${90 - end.latitude}-y)=${cotangentEndPhi}`,
  //     `x*cos(${90 - start.latitude}-y)=${cotangentStartPhi}`,
  //   ])

  //   return { x: sol[0][1], y: sol[1][1] }
  // }

  // addGeodesic(from: City, to: City) {
  // const sol = this.geodesicConstants(
  //   { latitude: from.latitude, longitude: from.longitude },
  //   {
  //     latitude: to.latitude,
  //     longitude: to.longitude,
  //   }
  // )
  // eslint-disable-next-line prefer-const
  // let nerdamer = require('nerdamer')
  // require('nerdamer/Solve')

  // const newLatitude = ((from.latitude + to.latitude) * Math.PI) / 180 / 2
  // const newLatitude = (from.latitude * Math.PI) / 180
  // const newLatitude = (from.latitude * Math.PI) / 180
  // const cotangentNewPhi = sol.x * Math.cos(newLatitude - sol.y)
  // const newPhi = nerdamer(`acot(${cotangentNewPhi})`).evaluate()
  // console.log((newPhi.toDecimal() * 180) / Math.PI)
  // }

  addPath(from: City, to: City) {
    if (!this.cities[from.name] && !this.cities[to.name])
      throw new Error("City doesn't exist")

    const normalizedLat = (from.latitude * Math.PI) / 180
    const normalizedLong = (from.longitude * Math.PI) / 180

    const eulerCoords = {
      x: this.radius * Math.cos(normalizedLat) * Math.sin(normalizedLong),
      y: this.radius * Math.sin(normalizedLat),
      z: this.radius * Math.cos(normalizedLong) * Math.cos(normalizedLat),
    }

    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 64, 64),
      new THREE.MeshPhongMaterial({
        color: 0xc53a48,
      })
    )
    dot.position.set(eulerCoords.x, eulerCoords.y, eulerCoords.z)
    this.planetMesh?.add(dot)
    const path = {
      to,
      from,
      currentProgress: 0,
      mesh: dot,
      progress: 0,
    }
    this.paths.push(path)
    return this
  }

  get visible() {
    if (!this.planetMesh) throw new Error('Planet mesh not initialized')
    return this.planetMesh?.visible
  }

  set visible(visible: boolean) {
    if (!this.planetMesh) throw new Error('Planet mesh not initialized')
    this.planetMesh.visible = visible
  }

  isPopulated() {
    return Object.keys(this.cities).length > 0
  }

  totalPaths() {
    return this.paths.length
  }

  update() {
    const currentPaths = []
    for (const path of this.paths) {
      path.progress += 0.0001

      const from = path.from
      const to = path.to
      const deltaLatitude = to.latitude - from.latitude
      const deltaLongitude = to.longitude - from.longitude

      const newLatitude = from.latitude + deltaLatitude * path.progress
      const newLongitude = from.longitude + deltaLongitude * path.progress

      const normalizedLat = (newLatitude * Math.PI) / 180
      const normalizedLong = (newLongitude * Math.PI) / 180

      const eulerCoords = {
        x:
          (this.radius + (3 - (3 * Math.abs(path.progress - 0.5)) / 0.5)) *
          Math.cos(normalizedLat) *
          Math.sin(normalizedLong),
        y:
          (this.radius + (3 - (3 * Math.abs(path.progress - 0.5)) / 0.5)) *
          Math.sin(normalizedLat),
        z:
          (this.radius + (3 - (3 * Math.abs(path.progress - 0.5)) / 0.5)) *
          Math.cos(normalizedLong) *
          Math.cos(normalizedLat),
      }

      path.mesh.position.lerp(
        new THREE.Vector3(eulerCoords.x, eulerCoords.y, eulerCoords.z),
        0.1
      )
      this.planetMesh?.add(path.mesh)
      if (path.progress < 1) currentPaths.push(path)
    }
    this.paths = currentPaths

    if (this.animate && this.planetMesh && this.visible)
      this.animate(this.planetMesh)
    return this
  }
}
