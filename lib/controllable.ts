import * as THREE from 'three'
import { Observable } from '~/lib/observable'

// TODO: give this a better name
type KeyAction = (controlledObject: THREE.Object3D) => void

// type ObserverAction = {
//   id: string
//   action: KeyAction
// }

type KeyControlState = { isToggled: boolean; action: KeyAction }

/**
 * Controllable class takes in controls in the form of key presses and actions to perform on those key presses.
 * It has state that details what keys have been toggled on the spaceship.
 * It exposes an update function to be called on every render that will use the current state to update the controlled object with the actions given.
 */
export class Controllable implements Observable {
  private object: THREE.Object3D
  private controlStates: Map<string, KeyControlState>

  constructor(object: THREE.Object3D, actions: Map<string, KeyAction>) {
    this.object = object

    this.controlStates = new Map()
    Array.from(actions).forEach((action) => {
      this.controlStates.set(action[0], {
        isToggled: false,
        action: action[1],
      })
    })
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
      if (controlState.isToggled) controlState.action(this.object)
    })
  }

  public get position(): THREE.Vector3 {
    return this.object.position
  }

  public get quaternion(): THREE.Quaternion {
    return this.object.quaternion
  }

  public get rotation(): THREE.Euler {
    return this.object.rotation
  }
}
