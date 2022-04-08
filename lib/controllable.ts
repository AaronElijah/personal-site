import * as THREE from 'three'

// TODO: give this a better name
type KeyAction = (controlledObject: THREE.Object3D) => void

type ObserverAction = {
  id: string
  action: KeyAction
}

type KeyControlState = { isToggled: boolean; action: KeyAction }

/**
 * Controllable class takes in controls in the form of key presses and actions to perform on those key presses.
 * It has state that details what keys have been toggled on the spaceship.
 * It exposes an update function to be called on every render that will use the current state to update the controlled object with the actions given.
 */
export class Controllable {
  private object: THREE.Object3D
  private controlStates: Map<string, KeyControlState>
  private observerActions: Array<ObserverAction> = []

  constructor(
    object: THREE.Object3D,
    actions: Map<string, KeyAction>,
    observerActions?: Array<ObserverAction>
  ) {
    this.object = object

    this.controlStates = new Map()
    Array.from(actions).forEach((action) => {
      this.controlStates.set(action[0], {
        isToggled: false,
        action: action[1],
      })
    })
    if (observerActions)
      Array.prototype.push.apply(this.observerActions, observerActions)
  }

  toggleControl(control: string, state?: boolean) {
    const curControlState = this.controlStates.get(control)
    if (typeof curControlState === 'undefined') return
    this.controlStates.set(control, {
      ...curControlState,
      isToggled: state ?? !curControlState.isToggled,
    })
  }

  removeObserver(observerId: string) {
    if (this.observerActions)
      this.observerActions = this.observerActions.filter(
        (action) => action.id !== observerId
      )
  }

  /**
   * Loop over the current control state and apply action for each key that is toggled.
   * Run any actions for observers of this controlled object.
   */
  update() {
    this.controlStates.forEach((controlState) => {
      if (controlState.isToggled) controlState.action(this.object)
    })
    this.observerActions.forEach(({ action }) => {
      action(this.object)
    })
  }
}
