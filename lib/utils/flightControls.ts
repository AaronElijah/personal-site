import * as THREE from 'three'

type FlightKeyControls =
  | 'ArrowLeft'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowRight'
  | 'q'
  | 'e'
  | 'w'
  | 's'
  | 'a'
  | 'd'

const flightControls: Map<FlightKeyControls, (ship: THREE.Object3D) => void> =
  new Map([
    [
      'ArrowDown',
      (ship: THREE.Object3D) => {
        const quaternion = new THREE.Quaternion(0.01, 0, 0, 1).normalize()
        ship.quaternion.multiply(quaternion)
        ship.rotation.setFromQuaternion(ship.quaternion, ship.rotation.order)
      },
    ],
    [
      'ArrowUp',
      (ship: THREE.Object3D) => {
        const quaternion = new THREE.Quaternion(-0.01, 0, 0, 1).normalize()
        ship.quaternion.multiply(quaternion)
        ship.rotation.setFromQuaternion(ship.quaternion, ship.rotation.order)
      },
    ],
    [
      'ArrowLeft',
      (ship: THREE.Object3D) => {
        const quaternion = new THREE.Quaternion(0, 0, -0.01, 1).normalize()
        ship.quaternion.multiply(quaternion)
        ship.rotation.setFromQuaternion(ship.quaternion, ship.rotation.order)
      },
    ],
    [
      'ArrowRight',
      (ship: THREE.Object3D) => {
        const quaternion = new THREE.Quaternion(0, 0, 0.01, 1).normalize()
        ship.quaternion.multiply(quaternion)
        ship.rotation.setFromQuaternion(ship.quaternion, ship.rotation.order)
      },
    ],
    [
      'q',
      (ship: THREE.Object3D) => {
        const quaternion = new THREE.Quaternion(0, 0.01, 0, 1).normalize()
        ship.quaternion.multiply(quaternion)
        ship.rotation.setFromQuaternion(ship.quaternion, ship.rotation.order)
      },
    ],
    [
      'e',
      (ship: THREE.Object3D) => {
        const quaternion = new THREE.Quaternion(0, -0.01, 0, 1).normalize()
        ship.quaternion.multiply(quaternion)
        ship.rotation.setFromQuaternion(ship.quaternion, ship.rotation.order)
      },
    ],
    [
      'w',
      (ship: THREE.Object3D) => {
        ship.translateZ(0.25)
      },
    ],
    [
      's',
      (ship: THREE.Object3D) => {
        ship.translateZ(-0.25)
      },
    ],
    [
      'a',
      (ship: THREE.Object3D) => {
        ship.translateX(0.25)
      },
    ],
    [
      'd',
      (ship: THREE.Object3D) => {
        ship.translateX(-0.25)
      },
    ],
  ])

export { flightControls }
