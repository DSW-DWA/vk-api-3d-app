import * as THREE from "three";

export function addMouseControls(
  renderer: THREE.WebGLRenderer,
  camera: THREE.Camera,
  spheres: THREE.Mesh[]
) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function onMouseClick(event: MouseEvent) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(spheres);

    if (intersects.length > 0) {
      const selectedNode = intersects[0].object;
      const attributes = selectedNode.userData;
      alert(`Attributes: ${JSON.stringify(attributes)}`);
    }
  }

  renderer.domElement.addEventListener("click", onMouseClick);
}
