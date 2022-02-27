import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export const addPerspectiveCamera = () => {
  return new THREE.PerspectiveCamera(
    75, // 75 degree viewport out of 360
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, // inner view frustrum
    1000 // outer view frustrum - basically we can see everything from the camera lense
  )
}

export const addOrbitControls = (
  camera: THREE.Camera,
  renderer: THREE.Renderer
) => {
  return new OrbitControls(camera, renderer.domElement)
}
