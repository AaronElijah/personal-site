<template>
  <div class="fixed w-full h-full">
    <canvas id="space-bg"></canvas>
    <!-- <div
      id="space-info"
      class="absolute w-1/3 h-1/2 z-10 left-1/2 top-1/4 bg-red-500"
    /> -->
  </div>
</template>
<script lang="ts">
import * as THREE from 'three'
// Uncomment if you need camera controls from the mouse
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Vue from 'vue'
import { addNebulaBackground } from '~/lib/scene/background'
import {
  addProfileBox,
  addDonut,
  addLargeBody,
} from '~/lib/scene/objects/meshes/other'
import { addAsteroid } from '~/lib/scene/objects/meshes/asteroid'
import {
  addApolloCommandModule,
  addStarDestroyer,
} from '~/lib/scene/objects/models'
import { addPointLight, addAmbientLight } from '~/lib/scene/lighting'
import { addPerspectiveCamera, ThirdPersonCamera } from '~/lib/camera'
import { Controllable } from '~/lib/controllable'
import { flightControls } from '~/lib/utils/flightControls'
import { Animatable } from '~/lib/animatable'

enum States {
  travel = 'travel',
  reading = 'reading',
}
enum Transitions {
  click = 'click',
}

export default Vue.extend({
  name: 'SpacePage',
  async mounted() {
    const scene = new THREE.Scene()

    // renderer renders out the actual grapics
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#space-bg') as HTMLCanvasElement,
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    // add light sources
    addPointLight({ scene, options: { position: [10, 10, 10] } })
    addPointLight({ scene, options: { position: [-10, -10, -10] } })
    addAmbientLight({ scene })

    // add background image
    // await addSpaceBackground(scene)
    await addNebulaBackground(scene)

    // add donut
    const [torusMesh] = await addDonut(scene)
    const torus = new Animatable(torusMesh, (torus) => {
      torus.rotation.x += 0.0001
      torus.rotation.y += 0.0005
      torus.rotation.z += 0.0001
    })

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

    // add large objects
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

    // Add apollo command module
    const [module] = await addApolloCommandModule({
      scene,
      options: {
        position: [-50, 50, 50],
        scale: [0.01, 0.01, 0.01],
      },
    })

    const commandModule = new Animatable(module.scene, (m) => {
      m.rotation.y += 0.005
    })

    // create initial camera
    const camera = addPerspectiveCamera()
    const thirdPersonCamera = new ThirdPersonCamera({
      camera,
      position: new THREE.Vector3(0, 0, 0),
      quaternion: new THREE.Quaternion(),
      defaultOffset: new THREE.Vector3(0, 3, -7.5),
      defaultLookat: new THREE.Vector3(0, 0, 10),
    })

    const ship = new Controllable(starDestroyer.scene, flightControls, [
      { id: 'camera', action: thirdPersonCamera.onTargetUpdate },
    ])

    renderer.render(scene, thirdPersonCamera.camera)

    // pointer position of the normalized device coordinates
    // raycaster assists in figuring out what is between the camera focal point and the mouse
    const pointer = new THREE.Vector2()
    const raycaster = new THREE.Raycaster()

    // It's good to have a state machine but ideally we want to store data about the state we are in
    // How can we do this? Maybe each state is more than just a string literal
    let state: States = States.travel
    const stateTransitions: { [key in States]: { click: States } } = {
      [States.travel]: {
        [Transitions.click]: States.reading,
      },
      [States.reading]: {
        [Transitions.click]: States.travel,
      },
    }

    window.addEventListener('pointermove', (event) => {
      // calculate pointer position in normalized device coordinates
      // (-1 to +1) for both components
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1

      // update the picking ray with the camera and pointer position
      raycaster.setFromCamera(pointer, thirdPersonCamera.camera)
    })
    window.addEventListener('keydown', (e) => {
      ship.toggleControl(e.key, true)
    })
    window.addEventListener('keyup', (e) => {
      ship.toggleControl(e.key, false)
    })
    window.addEventListener('click', () => {
      // calculate objects intersecting the picking ray
      const commandModuleIntersections = raycaster.intersectObjects(
        commandModule.scene.children
      )

      // Clicked the command module
      if (!!commandModuleIntersections.length && state === States.travel) {
        // call ThirdPersonCamera register new subject
        ship.removeObserver('camera')
        commandModule.addObserver({
          id: 'camera',
          action: thirdPersonCamera.onTargetUpdate,
        })
        thirdPersonCamera.changeDefaults({
          defaultLookat: new THREE.Vector3(-5, 0, 0),
          defaultOffset: new THREE.Vector3(0, 0, 10),
        })
        state = stateTransitions[state].click
      } else if (
        !commandModuleIntersections.length &&
        state === States.reading
      ) {
        // call ThirdPersonCamera register new subject
        commandModule.removeObserver('camera')
        ship.addObserver({
          id: 'camera',
          action: thirdPersonCamera.onTargetUpdate,
        })
        thirdPersonCamera.changeDefaults({
          defaultLookat: new THREE.Vector3(0, 0, 10),
          defaultOffset: new THREE.Vector3(0, 3, -7.5),
        })
        state = stateTransitions[state].click
      }
    })

    function animate() {
      requestAnimationFrame(animate)

      ship.update()
      thirdPersonCamera.update()
      commandModule.update()

      torus.update()

      mars.rotation.y += 0.001
      neptune.rotation.y -= 0.001
      jupiter.rotation.y -= 0.0005
      sun.rotation.y += 0.0001

      for (let i = 0; i < asteroids.length; i++) {
        const asteroid = asteroids[i]
        asteroid.rotation.x += 0.005
        asteroid.rotation.y += 0.005
        asteroid.rotation.z += 0.005
      }

      renderer.render(scene, camera)
    }

    animate()
  },
})
</script>
