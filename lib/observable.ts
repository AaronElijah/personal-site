export type ObservedObjectAction = (controlledObject: THREE.Object3D) => void

export type ObserverAction = {
  id: string
  action: ObservedObjectAction
}

export interface Observable {
  addObserver: (observerAction: ObserverAction) => void
  removeObserver: (observerId: string) => void
}
