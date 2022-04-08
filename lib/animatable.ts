import * as THREE from 'three'
import { Observable, ObserverAction } from '~/lib/observable'

export class Animatable implements Observable {
  public scene: THREE.Object3D
  private handleUpdate: (object: THREE.Object3D) => void
  private observers: Array<ObserverAction> = []

  constructor(
    scene: THREE.Object3D,
    handleUpdate: (object: THREE.Object3D) => void,
    observerActions?: Array<ObserverAction>
  ) {
    this.scene = scene
    this.handleUpdate = handleUpdate
    if (observerActions) this.observers = observerActions
  }

  addObserver(observerAction: ObserverAction) {
    this.observers.push(observerAction)
  }

  removeObserver(observerId: string) {
    if (this.observers)
      this.observers = this.observers.filter(
        (action) => action.id !== observerId
      )
  }

  update() {
    this.handleUpdate(this.scene)
    this.observers.forEach(({ action }) => {
      action(this.scene)
    })
  }
}
