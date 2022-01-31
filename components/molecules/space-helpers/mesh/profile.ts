import * as THREE from "three";

export default function addProfilePicture(scene: THREE.Scene) {
  const aaron = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 5),
    new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load("../../assets/profile.jpg"),
    })
  );
  scene.add(aaron);
  return scene;
}
