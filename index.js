
import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

const earthGroup = new THREE.Group();
scene.add(earthGroup);
new OrbitControls(camera, renderer.domElement);
const detail = 14;
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, detail);
const material = new THREE.MeshPhongMaterial({
  map: loader.load("./textures/earthmap1k.jpg"),
  specularMap: loader.load("./textures/earthspec1k.jpg"),
  bumpMap: loader.load("./textures/earthbump1k.jpg"),
  bumpScale: 0.05,
});

const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load("./textures/earthlights1k.jpg"),
  blending: THREE.AdditiveBlending,
});

const lightsMesh = new THREE.Mesh(geometry, lightsMat);
earthGroup.add(lightsMesh);

const cloudsMat = new THREE.MeshStandardMaterial({
  map: loader.load("./textures/earthcloudmap.jpg"),
  transparent: true,
  opacity: 0.5,
  blending: THREE.AdditiveBlending,
  alphaMap: loader.load('./textures/earthcloudmaptrans.jpg'),

});

const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
cloudsMesh.scale.setScalar(1.005);
earthGroup.add(cloudsMesh);

const sunLight = new THREE.DirectionalLight(0xffffff, 2);
sunLight.position.set(-1, 0.5, 1);
scene.add(sunLight);

function animate() {
  requestAnimationFrame(animate);
  earthMesh.rotation.y += 0.0005;
  lightsMesh.rotation.y += 0.0005;
  cloudsMesh.rotation.y += 0.0007;
  renderer.render(scene, camera);
}

animate();
function handleWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
