import { initScene } from "./scene";
import { renderNodes, addEdges } from "./nodes";
import { addMouseControls } from "./ui";

(async () => {
  const { scene, camera, renderer, controls } = initScene();
  const nodes = await renderNodes(scene);
  addEdges(scene, nodes);
  addMouseControls(renderer, camera, nodes);

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
})();
