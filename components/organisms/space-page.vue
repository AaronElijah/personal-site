<template>
  <canvas id="space-bg" class="fixed w-full h-full"></canvas>
</template>
<script lang="ts">
import * as THREE from 'three'

// Uncomment if you need camera controls from the mouse
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Vue from 'vue'
import { addSpaceBackground } from '~/lib/space/background'
import {
  addProfileBox,
  addDonut,
  addLargeBody,
  addAsteroid,
} from '~/lib/space/shapes'
import {
  addApolloCommandModule,
  addStarDestroyer,
} from '~/lib/space/spaceships'
import { addPointLight, addAmbientLight } from '~/lib/space/lighting'
import { addThirdPersonCamera } from '~/lib/space/camera'
import { ControllableObject } from '~/lib/controllable'
import { flightControls } from '~/lib/flightControls'

export default Vue.extend({
  name: 'SpacePage',
  async mounted() {
    const scene = new THREE.Scene()

    // renderer renders out the actual grapics
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#space-bg') as HTMLCanvasElement,
    })
    // Set the renderer to render the image to full screen size
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    // add donut
    const [torus] = await addDonut(scene)

    // add light sources
    // const ambientLight = new THREE.AmbientLight(0x404040, 5);
    addPointLight({ scene, options: { position: [10, 10, 10] } })
    addPointLight({ scene, options: { position: [-10, -10, -10] } })
    addAmbientLight({ scene })

    // add background image
    await addSpaceBackground(scene)

    // add asteroids
    const asteroids: THREE.Mesh<
      THREE.PolyhedronGeometry,
      THREE.MeshStandardMaterial
    >[] = []
    const numAsteroids = 10
    for (let i = 0; i < numAsteroids; i++)
      asteroids.push((await addAsteroid(scene))[0])

    // add aaron
    await addProfileBox(scene)

    // add large spacial objects
    const [mars] = await addLargeBody({
      scene,
      largeBody: 'mars',
      options: { position: [-20, 0, 50] },
    })
    const [jupiter] = await addLargeBody({
      scene,
      largeBody: 'jupiter',
      options: { position: [50, 0, 70] },
    })
    const [neptune] = await addLargeBody({
      scene,
      largeBody: 'neptune',
      options: { position: [30, 0, -40] },
    })
    const [sun] = await addLargeBody({
      scene,
      largeBody: 'sun',
      options: { position: [-60, 0, -70] },
    })

    // add star destroyer
    const [starDestroyer] = await addStarDestroyer({
      scene,
      options: { position: [5, 5, 0] },
    })

    const [, starDestroyerCamera] = addThirdPersonCamera({
      subject: starDestroyer.scene,
      options: {
        offset: new THREE.Vector3(0.0, 2.5, -5.5),
        idealLookat: new THREE.Vector3(0, 0, 5),
      },
    })

    const controllableShip = new ControllableObject(
      starDestroyer.scene,
      // set actions for each control applied
      flightControls
    )

    // Add apollo command module
    await addApolloCommandModule({
      scene,
      options: {
        position: [100, 0, 100],
        scale: [0.01, 0.01, 0.01],
      },
    })

    renderer.render(scene, starDestroyerCamera)

    function animate() {
      requestAnimationFrame(animate)

      controllableShip.update()

      torus.rotation.x += 0.0001
      torus.rotation.y += 0.0005
      torus.rotation.z += 0.0001

      mars.rotation.y += 0.01
      neptune.rotation.y -= 0.01
      jupiter.rotation.y -= 0.005
      sun.rotation.y += 0.001

      for (let i = 0; i < asteroids.length; i++) {
        const asteroid = asteroids[i]
        asteroid.rotation.x += 0.005
        asteroid.rotation.y += 0.005
        asteroid.rotation.z += 0.005
      }

      renderer.render(scene, starDestroyerCamera)
    }

    // pointer position of the normalized device coordinates
    const pointer = new THREE.Vector2()
    // raycaster assists in figuring out what is between the camera focal point and the mouse
    const raycaster = new THREE.Raycaster()

    // Event listeners
    window.addEventListener('pointermove', (event) => {
      // calculate pointer position in normalized device coordinates
      // (-1 to +1) for both components
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1

      // update the picking ray with the camera and pointer position
      raycaster.setFromCamera(pointer, starDestroyerCamera)
    })
    window.addEventListener('keydown', (e) => {
      controllableShip.toggleControl(e.key, true)
    })
    window.addEventListener('keyup', (e) => {
      controllableShip.toggleControl(e.key, false)
    })
    window.addEventListener('click', () => {
      // calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects(scene.children)
      if (intersects.length > 0) {
        // if there is an intersection, log them
        console.log(intersects)
      }
    })

    animate()
  },
})
</script>
