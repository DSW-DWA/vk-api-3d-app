import * as THREE from "three";
import { fetchNodes, fetchNodeDetails } from "./api";
import { User } from "./models";

function fibonacciSphere(samples: number, radius: number) {
    const points = [];
    const offset = 2 / samples;
    const increment = Math.PI * (3 - Math.sqrt(5));
  
    for (let i = 0; i < samples; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;
  
      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;
  
      points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
    }
  
    return points;
  }

  export async function renderNodes(scene: THREE.Scene) {
    const data = await fetchNodes();
    const trueLength = data.users.length;
    const totalNodes = data.users.slice(0,trueLength * 0.3).length;
    const positions = fibonacciSphere(totalNodes, 100);
  
    const nodes = data.users.slice(0,trueLength * 0.3).map((user: User, index: number) => ({
      id: user.uid,
      position: positions[index],
      color: user.sex === 1 ? 0xff69b4 : 0x1e90ff,
      attributes: user,
    }));
  
    const spheres: THREE.Mesh[] = [];
  
    nodes.forEach((node: any) => {
      const geometry = new THREE.SphereGeometry(2);
      const material = new THREE.MeshBasicMaterial({ color: node.color });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.copy(node.position);
      sphere.userData = node.attributes;
      spheres.push(sphere);
      scene.add(sphere);
    });
  
    return spheres;
  }
export async function addEdges(scene: THREE.Scene, nodes: THREE.Mesh[]) {
  const edges: THREE.Line[] = [];
  nodes.forEach(async (node) =>{
    const nodeDetails = await fetchNodeDetails(node.userData.uid)
    const relations = nodeDetails.follows || [];
    relations.forEach((rel: User) => {
      const targetNode = nodes.find((n) => n.userData.uid === rel.uid);
      if (targetNode) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
          node.position,
          targetNode.position,
        ]);
        const material = new THREE.LineBasicMaterial({ color: 0xffffff });
        const line = new THREE.Line(geometry, material);
        edges.push(line);
        scene.add(line);
      }
    });
  });
  return edges;
}
