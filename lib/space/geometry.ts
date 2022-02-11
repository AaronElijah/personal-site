import * as THREE from 'three'
import { clientSideOnly, getRandomArbitrary } from '~/lib/utils'

const verticesOfCube: readonly number[] = [
  -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1,
  1, 1,
]

const indicesOfFaces: number[] = [
  2, 1, 0, 0, 3, 2, 0, 4, 7, 7, 3, 0, 0, 1, 5, 5, 4, 0, 1, 2, 6, 6, 5, 1, 2, 3,
  7, 7, 6, 2, 4, 5, 6, 6, 7, 4,
]

export const randomGeometry = clientSideOnly(() => {
  const scale = getRandomArbitrary(0.9, 1)
  const scaledVertices = verticesOfCube.map((vert) => scale * vert)
  const randomVertices = scaledVertices.map(
    (coord) => coord * (1 + (2 * Math.random() - 1))
  )
  return new THREE.PolyhedronGeometry(randomVertices, indicesOfFaces, 1, 2)
})
