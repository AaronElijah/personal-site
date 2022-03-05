import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

interface IAddThirdPersonCamera {
  subject: THREE.Object3D
  options: {
    offset: THREE.Vector3
    idealLookat: THREE.Vector3
  }
}

const addPerspectiveCamera = () => {
  return new THREE.PerspectiveCamera(
    75, // 75 degree viewport out of 360
    window.innerWidth / window.innerHeight, // aspect ratio
    0.01, // inner view frustrum
    1000 // outer view frustrum - basically we can see everything from the camera lense
  )
}

const addThirdPersonCamera = ({
  subject,
  options: { offset, idealLookat },
}: IAddThirdPersonCamera): [THREE.Object3D, THREE.PerspectiveCamera] => {
  const camera = addPerspectiveCamera()
  camera.position.x = offset.x
  camera.position.y = offset.y
  camera.position.z = offset.z
  camera.lookAt(idealLookat)
  subject.add(camera)
  return [subject, camera]
}

const addOrbitControls = (camera: THREE.Camera, renderer: THREE.Renderer) => {
  return new OrbitControls(camera, renderer.domElement)
}

export { addOrbitControls, addThirdPersonCamera }
