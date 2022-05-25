<template>
  <div class="fixed w-full h-full">
    <canvas id="space-bg"></canvas>
    <div
      id="space-info"
      :class="`absolute w-1/3 h-1/2 z-10 left-[20%] top-1/4 bg-green-300 rounded-lg transition-opacity duration-700 ease-linear p-4 ${
        page ? 'opacity-100' : 'opacity-0'
      }`"
    >
      <div v-if="page" class="h-5/6 overflow-auto x-invisible-scrollbar">
        <h1 v-if="page" class="text-lg text-center mb-4">{{ page.title }}</h1>
        <div v-if="page">
          {{ page.description }}
        </div>
      </div>
      <div v-if="page" class="flex justify-center h-1/6 px-4 pt-4">
        <button
          class="hover:bg-green-800 hover:text-white rounded-md transition-colors duration-200 p-2"
          @click="collectObject"
        >
          Collect me!
        </button>
      </div>
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
import { City, Earth } from '~/lib/scene/objects/earth'

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
  collectedObjects: ClickableObjects[]
  page: FetchReturn | null
  focusedObject: ClickableObjects | null
  playState: States
  cities: City[]
  isShowEarth: boolean
}

export default Vue.extend({
  name: 'SpacePage',
  data: () => {
    const data: ISpacePageData = {
      playState: States.travel,
      page: null,
      focusedObject: null,
      collectedObjects: [],
      cities: [],
      isShowEarth: false,
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
    async collectedObjects() {
      if (
        this.collectedObjects.length === Object.keys(ClickableObjects).length
      ) {
        const cities = (await this.$content('cities').fetch()) as FetchReturn
        if (cities.body) {
          ;(cities.body as Array<any>).forEach((city) => {
            this.cities.push({
              name: city.name as string,
              latitude: Number(city.latitude),
              longitude: Number(city.longitude),
              color: Number(city.color),
            })
          })
        }
        this.isShowEarth = true
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
    addPointLight({ scene, options: { position: [60, 0, 60] } })
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

    const earth = await new Earth(20, new THREE.Vector3(50, 0, 50), (obj) => {
      obj.rotation.y += 0.001
    }).addMeshes(scene)

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

    const addRandomPath = () => {
      const firstCityIndex = Math.floor(
        Math.random() * (this.cities.length + 1)
      )
      let secondCityIndex = Math.floor(Math.random() * (this.cities.length + 1))
      while (firstCityIndex === secondCityIndex) {
        secondCityIndex = Math.floor(Math.random() * (this.cities.length + 1))
      }

      // For some reason, accessing arrays in this.$data return proxies with getters/setters
      // We create new objects instead to bypass that rule
      earth.addPath(
        {
          name: this.cities[firstCityIndex].name,
          latitude: this.cities[firstCityIndex].latitude,
          longitude: this.cities[firstCityIndex].longitude,
          color: this.cities[firstCityIndex].color,
        },
        {
          name: this.cities[secondCityIndex].name,
          latitude: this.cities[secondCityIndex].latitude,
          longitude: this.cities[secondCityIndex].longitude,
          color: this.cities[secondCityIndex].color,
        }
      )
    }

    const animate = () => {
      requestAnimationFrame(animate)

      ship.update()
      thirdPersonCamera.update()
      for (const clickable of Object.values(clickableObjects)) {
        clickable.update()
      }

      for (const largeBody of Object.values(largeBodies)) {
        largeBody.update()
      }

      if (this.isShowEarth && this.cities) {
        if (!earth.visible) earth.visible = true
        if (!earth.isPopulated()) earth.addCities(this.cities)
        if (earth.totalPaths() < 100) setTimeout(addRandomPath, 1000)
        earth.update()
      }

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
    collectObject() {
      if (
        this.focusedObject &&
        !this.collectedObjects.includes(this.focusedObject)
      )
        this.collectedObjects = [...this.collectedObjects, this.focusedObject]
    },
  },
})
</script>
