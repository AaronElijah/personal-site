<template>
  <div class="fixed w-full h-full">
    <canvas id="space-bg"></canvas>
    <div
      id="space-info"
      :class="`absolute w-1/3 h-1/2 z-10 left-[20%] top-1/4 bg-red-500 rounded-sm transition-opacity duration-700 ease-linear ${
        page ? 'opacity-100' : 'opacity-0'
      } overflow-y-scroll`"
    >
      <h1 v-if="page">{{ page.title }}</h1>
      <body v-if="page">
        {{ page.description }}
      </body>
    </div>
  </div>
</template>
<script lang="ts">
import { FetchReturn } from '@nuxt/content/types/query-builder'
import * as THREE from 'three'
import Vue from 'vue'

import { addNebulaBackground } from '~/lib/scene/background'
import {
  addProfileBox,
  addDonut,
  addLargeBody,
} from '~/lib/scene/objects/meshes/other'
import { addAsteroid } from '~/lib/scene/objects/meshes/asteroid'
import { addGLTF } from '~/lib/scene/objects/models'
import { addPointLight, addAmbientLight } from '~/lib/scene/lighting'
import { addPerspectiveCamera, ThirdPersonCamera } from '~/lib/camera'
import { Controllable } from '~/lib/controllable'
import { flightControls } from '~/lib/utils/flightControls'
import { Animatable } from '~/lib/animatable'
import { GLTFOptions } from '~/lib/utils/gltf'

enum States {
  travel = 'travel',
  reading = 'reading',
}
enum Transitions {
  click = 'click',
}

enum ClickableObjects {
  commandModule = 'commandModule',
  internationalSpaceStation = 'internationalSpaceStation',
  jamesWebbTelescope = 'jamesWebbTelescope',
}

interface ISpacePageData {
  page: null | FetchReturn
  focusedObject: null | ClickableObjects
}

export default Vue.extend({
  name: 'SpacePage',
  data: () => {
    const data: ISpacePageData = {
      page: null,
      focusedObject: null,
    }
    return data
  },
  watch: {
    async focusedObject() {
      if (this.focusedObject === ClickableObjects.commandModule) {
        this.page = (await this.$content(
          ClickableObjects.commandModule
        ).fetch()) as FetchReturn
      } else if (
        this.focusedObject === ClickableObjects.internationalSpaceStation
      ) {
        this.page = (await this.$content(
          ClickableObjects.internationalSpaceStation
        ).fetch()) as FetchReturn
      } else {
        this.page = null
      }
    },
  },
  async mounted() {
    const scene = new THREE.Scene()

    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#space-bg') as HTMLCanvasElement,
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    addPointLight({ scene, options: { position: [10, 10, 10] } })
    addPointLight({ scene, options: { position: [-10, -10, -10] } })
    addAmbientLight({ scene })

    await addNebulaBackground(scene)

    const [torusMesh] = await addDonut(scene)
    const torus = new Animatable(torusMesh, (torus) => {
      torus.rotation.x += 0.0001
      torus.rotation.y += 0.0005
      torus.rotation.z += 0.0001
    })

    const asteroids: THREE.Mesh<
      THREE.PolyhedronGeometry,
      THREE.MeshStandardMaterial
    >[] = []
    const numAsteroids = 10
    for (let i = 0; i < numAsteroids; i++)
      asteroids.push((await addAsteroid(scene))[0])

    await addProfileBox(scene)
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
    const [starDestroyer] = await addGLTF({
      scene,
      model: GLTFOptions.StarDestroyer,
      options: { position: [5, 5, 0] },
    })

    // Add collectable space objects
    const [commandModuleModel] = await addGLTF({
      scene,
      model: GLTFOptions.ApolloModule,
      options: {
        position: [-50, 50, 50],
        scale: [0.01, 0.01, 0.01],
      },
    })
    const [internationalSpaceStationModel] = await addGLTF({
      scene,
      model: GLTFOptions.ISS,
      options: {
        position: [100, 100, 100],
      },
    })

    const [jamesWebbTelescopeModel] = await addGLTF({
      scene,
      model: GLTFOptions.JamesWebbTelescope,
      options: {
        position: [-10, -20, -20],
      },
    })

    const commandModule = new Animatable(commandModuleModel.scene, (m) => {
      m.rotation.y += 0.005
    })
    const internationalSpaceStation = new Animatable(
      internationalSpaceStationModel.scene,
      (m) => {
        m.rotation.y += 0.0005
      }
    )
    const jamesWebbTelescope = new Animatable(
      jamesWebbTelescopeModel.scene,
      (m) => {
        m.rotation.y += 0.001
      }
    )

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
      const internationalSpaceStationIntersections = raycaster.intersectObjects(
        internationalSpaceStation.scene.children
      )
      const jamesWebbTelescopeIntersections = raycaster.intersectObjects(
        jamesWebbTelescope.scene.children
      )

      // Clicked the command module
      if (!!commandModuleIntersections.length && state === States.travel) {
        ship.removeObserver('camera')
        commandModule.addObserver({
          id: 'camera',
          action: thirdPersonCamera.onTargetUpdate,
        })
        thirdPersonCamera.changeDefaults({
          defaultLookat: new THREE.Vector3(-5, 0, 0),
          defaultOffset: new THREE.Vector3(0, 0, 10),
        })
        this.$data.focusedObject = ClickableObjects.commandModule
        state = stateTransitions[state].click
        return
      } else if (
        !commandModuleIntersections.length &&
        state === States.reading
      ) {
        commandModule.removeObserver('camera')
        ship.addObserver({
          id: 'camera',
          action: thirdPersonCamera.onTargetUpdate,
        })
        thirdPersonCamera.changeDefaults({
          defaultLookat: new THREE.Vector3(0, 0, 10),
          defaultOffset: new THREE.Vector3(0, 3, -7.5),
        })
        this.$data.focusedObject = null
        state = stateTransitions[state].click
        return
      }

      if (
        !!internationalSpaceStationIntersections.length &&
        state === States.travel
      ) {
        ship.removeObserver('camera')
        internationalSpaceStation.addObserver({
          id: 'camera',
          action: thirdPersonCamera.onTargetUpdate,
        })
        thirdPersonCamera.changeDefaults({
          defaultLookat: new THREE.Vector3(-5, 0, 0),
          defaultOffset: new THREE.Vector3(0, 0, 10),
        })
        this.$data.focusedObject = ClickableObjects.internationalSpaceStation
        state = stateTransitions[state].click
        return
      } else if (
        !internationalSpaceStationIntersections.length &&
        state === States.reading
      ) {
        internationalSpaceStation.removeObserver('camera')
        ship.addObserver({
          id: 'camera',
          action: thirdPersonCamera.onTargetUpdate,
        })
        thirdPersonCamera.changeDefaults({
          defaultLookat: new THREE.Vector3(0, 0, 10),
          defaultOffset: new THREE.Vector3(0, 3, -7.5),
        })
        this.$data.focusedObject = null
        state = stateTransitions[state].click
        return
      }

      if (!!jamesWebbTelescopeIntersections.length && state === States.travel) {
        ship.removeObserver('camera')
        jamesWebbTelescope.addObserver({
          id: 'camera',
          action: thirdPersonCamera.onTargetUpdate,
        })
        thirdPersonCamera.changeDefaults({
          defaultLookat: new THREE.Vector3(-5, 0, 0),
          defaultOffset: new THREE.Vector3(0, 0, 10),
        })
        this.$data.focusedObject = ClickableObjects.jamesWebbTelescope
        state = stateTransitions[state].click
      } else if (
        !jamesWebbTelescopeIntersections.length &&
        state === States.reading
      ) {
        jamesWebbTelescope.removeObserver('camera')
        ship.addObserver({
          id: 'camera',
          action: thirdPersonCamera.onTargetUpdate,
        })
        thirdPersonCamera.changeDefaults({
          defaultLookat: new THREE.Vector3(0, 0, 10),
          defaultOffset: new THREE.Vector3(0, 3, -7.5),
        })
        this.$data.focusedObject = null
        state = stateTransitions[state].click
      }
    })

    function animate() {
      requestAnimationFrame(animate)

      ship.update()
      thirdPersonCamera.update()
      commandModule.update()
      internationalSpaceStation.update()
      jamesWebbTelescope.update()

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
