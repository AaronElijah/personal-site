<template>
  <div class="fixed w-full h-full">
    <canvas id="space-bg"></canvas>
    <div
      id="space-info"
      :class="`absolute w-1/3 h-1/2 z-10 left-[20%] top-1/4 bg-red-500 rounded-sm transition-opacity duration-700 ease-linear ${
        page ? 'opacity-100' : 'opacity-0'
      } overflow-y-auto x-invisible-scrollbar`"
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
  addSpaceBody,
} from '~/lib/scene/objects/meshes/largeBodies'
import { addGLTF } from '~/lib/scene/objects/gltf'
import { addPointLight, addAmbientLight } from '~/lib/scene/lighting'
import { addPerspectiveCamera, ThirdPersonCamera } from '~/lib/camera'
import { Controllable } from '~/lib/controllable'
import { flightControls } from '~/lib/utils/flightControls'
import { Animatable } from '~/lib/animatable'
import { GLTFOptions } from '~/lib/utils/gltf'
import { Earth } from '~/lib/scene/objects/earth'

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
  playState: States
}

export default Vue.extend({
  name: 'SpacePage',
  data: () => {
    const data: ISpacePageData = {
      page: null,
      focusedObject: null,
      playState: States.travel,
    }
    return data
  },
  watch: {
    async focusedObject() {
      if (
        Object.values<ClickableObjects | null>(ClickableObjects).includes(
          this.focusedObject
        )
      ) {
        this.page = (await this.$content(
          this.focusedObject as ClickableObjects
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
      antialias: true,
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    addPointLight({ scene, options: { position: [10, 10, 10] } })
    addPointLight({ scene, options: { position: [-10, -10, -10] } })
    addAmbientLight({ scene })

    await addNebulaBackground(scene)

    await addProfileBox(scene)
    const [mars] = await addSpaceBody({
      scene,
      spaceBody: 'mars',
      options: { position: [-20, 10, 50] },
    })
    const [jupiter] = await addSpaceBody({
      scene,
      spaceBody: 'jupiter',
      options: { position: [100, -30, 100] },
    })
    const [neptune] = await addSpaceBody({
      scene,
      spaceBody: 'neptune',
      options: { position: [30, 50, -40] },
    })
    const [sun] = await addSpaceBody({
      scene,
      spaceBody: 'sun',
      options: { position: [-60, -40, -70] },
    })

    const largeBodies = {
      mars: new Animatable(mars, (o) => {
        o.rotation.y += 0.001
      }),
      jupiter: new Animatable(jupiter, (o) => {
        o.rotation.y += 0.001
      }),
      neptune: new Animatable(neptune, (o) => {
        o.rotation.y += 0.0005
      }),
      sun: new Animatable(sun, (o) => {
        o.rotation.y += 0.0001
      }),
    }

    const cities = [
      {
        name: 'Singapore',
        latitude: 1.3521,
        longitude: 103.8198,
        color: 0xffffff,
      },
      {
        name: 'London',
        latitude: 51.5085,
        longitude: -0.1257,
        color: 0xffff00,
      },
    ]
    const earth = await new Earth(20, new THREE.Vector3(20, 0, 20)).addMeshes(
      scene
    )
    earth
      .addCities(cities)
      .addPath(cities[0], cities[1])
      .addPath(cities[1], cities[0])

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

    const clickableObjects = {
      [ClickableObjects.commandModule]: new Animatable(
        commandModuleModel.scene,
        (m) => {
          m.rotation.y += 0.005
        }
      ),
      [ClickableObjects.internationalSpaceStation]: new Animatable(
        internationalSpaceStationModel.scene,
        (m) => {
          m.rotation.y += 0.0005
        }
      ),
      [ClickableObjects.jamesWebbTelescope]: new Animatable(
        jamesWebbTelescopeModel.scene,
        (m) => {
          m.rotation.y += 0.001
        }
      ),
    }

    const ship = new Controllable(starDestroyer.scene, flightControls)

    // create camera
    const camera = addPerspectiveCamera()
    const thirdPersonCamera = new ThirdPersonCamera({
      camera,
      position: new THREE.Vector3(0, 0, 0),
      quaternion: new THREE.Quaternion(),
      defaultOffset: new THREE.Vector3(0, 3, -7.5),
      defaultLookat: new THREE.Vector3(0, 0, 10),
    }).registerNewTarget(ship)

    renderer.render(scene, thirdPersonCamera.camera)

    // pointer position of the normalized device coordinates
    // raycaster assists in figuring out what is between the camera focal point and the mouse
    const pointer = new THREE.Vector2()
    const raycaster = new THREE.Raycaster()

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
      for (const [name, clickable] of Object.entries(clickableObjects) as Array<
        [ClickableObjects, Animatable]
      >) {
        const intersections = raycaster.intersectObjects(
          clickable.object.children
        )
        if (intersections.length > 0 && this.playState === States.travel) {
          // ship.removeObserver('camera')
          // clickable.addObserver({
          //   id: 'camera',
          //   action: thirdPersonCamera.onTargetUpdate,
          // })
          // thirdPersonCamera.changeDefaults({
          //   defaultLookat: new THREE.Vector3(-5, 0, 0),
          //   defaultOffset: new THREE.Vector3(0, 0, 10),
          // })
          thirdPersonCamera.removeCurrentTarget().registerNewTarget(clickable, {
            defaultLookat: new THREE.Vector3(-5, 0, 0),
            defaultOffset: new THREE.Vector3(0, 0, 10),
          })
          this.$data.focusedObject = name
          this.transitionState(Transitions.click)
          return
        } else if (
          intersections.length === 0 &&
          this.playState === States.reading
        ) {
          // clickable.removeObserver('camera')
          // ship.addObserver({
          //   id: 'camera',
          //   action: thirdPersonCamera.onTargetUpdate,
          // })
          thirdPersonCamera.removeCurrentTarget().registerNewTarget(ship, {
            defaultLookat: new THREE.Vector3(0, 0, 10),
            defaultOffset: new THREE.Vector3(0, 3, -7.5),
          })
          this.$data.focusedObject = null
          this.transitionState(Transitions.click)
          return
        }
      }
    })

    function animate() {
      requestAnimationFrame(animate)

      ship.update()
      thirdPersonCamera.update()
      for (const clickable of Object.values(clickableObjects)) {
        clickable.update()
      }

      for (const largeBody of Object.values(largeBodies)) {
        largeBody.update()
      }

      earth.update()

      renderer.render(scene, camera)
    }

    animate()
  },
  methods: {
    transitionState(transition: Transitions) {
      const stateTransitions: { [key in States]: { click: States } } = {
        [States.travel]: {
          [Transitions.click]: States.reading,
        },
        [States.reading]: {
          [Transitions.click]: States.travel,
        },
      }
      this.playState = stateTransitions[this.playState][transition]
    },
  },
})
</script>
