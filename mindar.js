// Opción 2: realidad aumentada con MindAR (reconoce un cartel/imagen y apoya el plato encima).
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MindARThree } from 'mindar-image-three';

let mindar = null;

export async function iniciarMindAR(contenedor, modeloUrl, marcadorUrl, cb) {
  mindar = new MindARThree({
    container: contenedor,
    imageTargetSrc: marcadorUrl,
    uiLoading: 'no', uiScanning: 'no', uiError: 'no'
  });
  const { renderer, scene, camera } = mindar;

  scene.add(new THREE.HemisphereLight(0xffffff, 0x444466, 2));
  const sol = new THREE.DirectionalLight(0xffffff, 2);
  sol.position.set(1, 2, 2);
  scene.add(sol);

  const gltf = await new GLTFLoader().loadAsync(modeloUrl);
  const modelo = gltf.scene;

  // Ajusta el tamaño al ancho del cartel y lo apoya sobre él
  const caja = new THREE.Box3().setFromObject(modelo);
  const tam = caja.getSize(new THREE.Vector3());
  modelo.scale.setScalar(0.8 / Math.max(tam.x, tam.y, tam.z));
  const caja2 = new THREE.Box3().setFromObject(modelo);
  const centro = caja2.getCenter(new THREE.Vector3());
  modelo.position.set(-centro.x, -caja2.min.y, -centro.z);

  // En MindAR el cartel es el plano XY: se gira para que el plato quede "parado" sobre él
  const pivote = new THREE.Group();
  pivote.rotation.x = Math.PI / 2;
  pivote.add(modelo);

  const ancla = mindar.addAnchor(0);
  ancla.group.add(pivote);
  ancla.onTargetFound = () => cb && cb.alEncontrar && cb.alEncontrar();
  ancla.onTargetLost = () => cb && cb.alPerder && cb.alPerder();

  await mindar.start();
  renderer.setAnimationLoop(() => renderer.render(scene, camera));
}

export async function detenerMindAR() {
  if (!mindar) return;
  mindar.renderer.setAnimationLoop(null);
  await mindar.stop();
  mindar = null;
}