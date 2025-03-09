import * as THREE from "three";
// 🌍 Convert Latitude/Longitude to 3D Sphere Position
export function translateGeoCoords(latitude, longitude, radius) {
  const phi = (latitude * Math.PI) / 180;
  const theta = ((longitude - 180) * Math.PI) / 180;

  const x = -radius * Math.cos(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi);
  const z = radius * Math.cos(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
};

// ✅ Utility function to get the object under initial mouse position
export function getObjOnMouse(initializedMousePos, camera, scene){
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(initializedMousePos, camera);
  return raycaster.intersectObjects(scene.children, true);
};