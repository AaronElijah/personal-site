import * as THREE from 'three'
import { Observable } from '~/lib/observable'

export class Animatable implements Observable {
  public object: THREE.Object3D
  private handleUpdate: (object: THREE.Object3D) => void

  constructor(
    object: THREE.Object3D,
    handleUpdate: (object: THREE.Object3D) => void
  ) {
    this.object = object
    this.handleUpdate = handleUpdate
  }

  update() {
    this.handleUpdate(this.object)
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
