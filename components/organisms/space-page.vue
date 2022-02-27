<template>
  <canvas id="space-bg" class="fixed w-full h-full"></canvas>
</template>
<script lang="ts">
import * as THREE from 'three'

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Vue from 'vue'
import { addSpaceBackground } from '~/lib/space/background'
import {
  addProfileBox,
  addDonut,
  addMars,
  addJupiter,
  addNeptune,
  addSun,
  addAsteroid,
} from '~/lib/space/shapes'
import { addStarDestroyer } from '~/lib/space/spaceships'
import { addPointLight, addAmbientLight } from '~/lib/space/lighting'
import { addPerspectiveCamera } from '~/lib/space/camera'

export default Vue.extend({
  name: 'SpacePage',
  async mounted() {
    const scene = new THREE.Scene()

    const camera = addPerspectiveCamera()

    // renderer renders out the actual grapics
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#space-bg') as HTMLCanvasElement,
    })

    // raycaster assists in figuring out what is between the camera focal point and the mouse
    const raycaster = new THREE.Raycaster()

    // Set the renderer to render the image to full screen size
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    renderer.render(scene, camera)

    // add donut
    const [torus] = addDonut(scene)

    // add light sources
    // const ambientLight = new THREE.AmbientLight(0x404040, 5);
    addPointLight({ scene, options: { position: [10, 10, 10] } })
    addPointLight({ scene, options: { position: [-10, -10, -10] } })
    addAmbientLight({ scene })

    // add background image
    addSpaceBackground(scene)

    // add asteroids
    const asteroids: THREE.Mesh<
      THREE.PolyhedronGeometry,
      THREE.MeshStandardMaterial
    >[] = []
    const numAsteroids = 10
    for (let i = 0; i < numAsteroids; i++) asteroids.push(addAsteroid(scene)[0])

    // add aaron
    addProfileBox(scene)

    // add planets/large objects
    const [mars] = addMars(scene)
    const [jupiter] = addJupiter(scene)
    const [neptune] = addNeptune(scene)
    const [sun] = addSun(scene)

    // add star destroyer
    const [starDestroyer] = await addStarDestroyer(scene)

    // Add lookAt starDestroyer
    // TODO: explain what is a quaternion in Wiki
    camera.position.setX(starDestroyer.scene.position.x)
    camera.position.setY(starDestroyer.scene.position.y + 1)
    camera.position.setZ(starDestroyer.scene.position.z - 5)

    const idealLookat = new THREE.Vector3(0, 0, 0)
    idealLookat.applyQuaternion(starDestroyer.scene.quaternion)
    idealLookat.add(starDestroyer.scene.position)
    camera.lookAt(idealLookat)

    function animate() {
      requestAnimationFrame(animate)

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

      // update the picking ray with the camera and pointer position
      raycaster.setFromCamera(pointer, camera)

      // calculate objects intersecting the picking ray
      // const intersects = raycaster.intersectObjects(scene.children)
      // console.log(intersects)

      renderer.render(scene, camera)
    }

    const pointer = new THREE.Vector2()
    window.addEventListener('pointermove', (event) => {
      // calculate pointer position in normalized device coordinates
      // (-1 to +1) for both components
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
    })
    animate()
  },
})
</script>
