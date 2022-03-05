import * as THREE from 'three'

type KeyAction = (controlledObject: THREE.Object3D) => void

type KeyControlState = { isToggled: boolean; action: KeyAction }

/**
 * ControllableObject class takes in controls in the form of key presses and actions to perform on those key presses.
 * It has state that details what keys have been toggled on the spaceship.
 * It exposes an update function to be called on every render that will use the current state to update the controlled object with the actions given.
 */
export class ControllableObject {
  private controlledObject: THREE.Object3D
  // TODO: can we make the control state keys a generic type parameter based on the actions provided
  private controlStates: Map<string, KeyControlState>
  private observerActions: Array<KeyAction> = []

  constructor(
    controlledObject: THREE.Object3D,
    actions: Map<string, KeyAction>,
    observerActions?: Array<KeyAction>
  ) {
    this.controlledObject = controlledObject

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

  /**
   * Loop over the current control state and apply action for each key that is toggled.
   * Run any actions for observers of this controlled object.
   */
  update() {
    this.controlStates.forEach((controlState) => {
      if (controlState.isToggled) controlState.action(this.controlledObject)
    })
    this.observerActions.forEach((action) => {
      action(this.controlledObject)
    })
  }
}
