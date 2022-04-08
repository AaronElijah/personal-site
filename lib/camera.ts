import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

interface IAddCameraToSubject {
  subject: THREE.Object3D
  camera: THREE.PerspectiveCamera
  options?: {
    offset?: THREE.Vector3
    idealLookat?: THREE.Vector3
    lerp?: number
  }
}

interface IThirdPersonCamera {
  camera: THREE.PerspectiveCamera
  position: THREE.Vector3
  quaternion: THREE.Quaternion
  defaultOffset: THREE.Vector3
  defaultLookat: THREE.Vector3
  lerpAlpha?: number
}

function addPerspectiveCamera() {
  return new THREE.PerspectiveCamera(
    75, // 75 degree viewport out of 360
    window.innerWidth / window.innerHeight, // aspect ratio
    0.01, // inner view frustrum
    1000 // outer view frustrum - basically we can see everything from the camera lense
  )
}

function addCameraToSubject({
  subject,
  camera,
  options: { offset, idealLookat, lerp } = {},
}: IAddCameraToSubject): [THREE.Object3D, THREE.PerspectiveCamera] {
  const subjectPosition = subject.position
  if (offset) {
    if (lerp) {
      camera.position.lerp(subjectPosition.clone().add(offset), lerp)
    } else {
      camera.position.set(
        subjectPosition.x + offset.x,
        subjectPosition.y + offset.y,
        subjectPosition.z + offset.z
      )
    }
  }

  camera.lookAt(idealLookat || subjectPosition)

  return [subject, camera]
}

function addOrbitControls(camera: THREE.Camera, renderer: THREE.Renderer) {
  return new OrbitControls(camera, renderer.domElement)
}

class ThirdPersonCamera {
  public camera: THREE.PerspectiveCamera
  private targetPosition: THREE.Vector3
  private targetQuaternion: THREE.Quaternion = new THREE.Quaternion()
  private defaultOffset: THREE.Vector3
  private defaultLookat: THREE.Vector3
  private lerpAlpha: number

  constructor({
    camera,
    position,
    quaternion,
    defaultLookat,
    defaultOffset,
    lerpAlpha = 0.1,
  }: IThirdPersonCamera) {
    this.camera = camera
    this.defaultLookat = defaultLookat
    this.defaultOffset = defaultOffset
    this.lerpAlpha = lerpAlpha

    this.targetPosition = position.clone()
    this.targetPosition.add(defaultOffset)
    this.targetQuaternion = quaternion.clone()
  }

  observerTarget = (target: THREE.Object3D) => {
    if (!this.targetPosition.equals(target.position))
      this.targetPosition = target.position.clone()
    if (!this.targetQuaternion.equals(target.quaternion))
      this.targetQuaternion = new THREE.Quaternion().setFromEuler(
        target.rotation
      )
  }

  private calculateIdealOffset() {
    const newOffset = this.defaultOffset.clone()
    newOffset.applyQuaternion(this.targetQuaternion)
    newOffset.add(this.targetPosition)
    return newOffset
  }

  private calculateIdealLookat() {
    const newLookat = this.defaultLookat.clone()
    newLookat.applyQuaternion(this.targetQuaternion)
    newLookat.add(this.targetPosition)
    return newLookat
  }

  update() {
    const newOffset = this.calculateIdealOffset()
    const newLookat = this.calculateIdealLookat()
    this.camera.position.lerp(newOffset, this.lerpAlpha)
    this.camera.lookAt(newLookat) // may need to change this to rotate to lookAt
  }

  changeDefaults(defaultLookat: THREE.Vector3, defaultOffset: THREE.Vector3) {
    if (defaultLookat) this.defaultLookat = defaultLookat
    if (defaultOffset) this.defaultOffset = defaultOffset
  }
}

export {
  addOrbitControls,
  addCameraToSubject,
  addPerspectiveCamera,
  ThirdPersonCamera,
}
