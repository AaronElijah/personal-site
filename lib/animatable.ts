import * as THREE from 'three'

// TODO: give this a better name
type KeyAction = (controlledObject: THREE.Object3D) => void

type ObserverAction = {
  id: string
  action: KeyAction
}

export class Animatable {
  public scene: THREE.Object3D
  private handleUpdate: (object: THREE.Object3D) => void
  private observerActions: Array<ObserverAction>

  constructor(
    scene: THREE.Object3D,
    handleUpdate: (object: THREE.Object3D) => void,
    observerActions?: Array<ObserverAction>
  ) {
    this.scene = scene
    this.handleUpdate = handleUpdate
    this.observerActions = observerActions || []
  }

  addObserver(observerAction: ObserverAction) {
    this.observerActions.push(observerAction)
  }

  update() {
    this.handleUpdate(this.scene)
    this.observerActions.forEach(({ action }) => {
      action(this.scene)
    })
  }
}
