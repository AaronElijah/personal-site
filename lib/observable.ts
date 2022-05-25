// export type ObservedObjectAction = (controlledObject: THREE.Object3D) => void

// export type ObserverAction = {
//   id: string
//   action: ObservedObjectAction
// }

export interface Observable {
  position: THREE.Vector3
  quaternion: THREE.Quaternion
  rotation: THREE.Euler
}
