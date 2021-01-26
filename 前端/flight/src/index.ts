import { Group,PerspectiveCamera,TextureLoader, OctahedronBufferGeometry,TorusKnotGeometry,MeshBasicMaterial,Scene, WebGLRenderer, Mesh, BoxGeometry,ConeGeometry, MeshNormalMaterial, Vector2, WebGLRenderTarget } from 'three';
import { createStore } from 'redux';

import './App.scss';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import gameState from './reducers/gameState';
import addOverlay from './functions/addOverlay';
import addWindowEvents from './functions/addWindowEvents';
import tick, { reset, spawnTick } from './functions/tick';
import createShaders from './shaders';
import ActionType from './constants/ActionType';
import { Children } from 'react';

const gameStateStore = createStore(gameState);
// mobile端看着有点奇怪，可以把camera改一下
const camera: PerspectiveCamera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
camera.position.x = 1;
camera.position.z = 0;
camera.position.y = 2;

const scene: Scene = new Scene();
const renderer: WebGLRenderer = new WebGLRenderer({ antialias: true });

// the player
var loader = new TextureLoader();
var rocket = loader.load("../public/a.jpeg");
// var material = new MeshBasicMaterial({ map: rocket });
var material = new MeshNormalMaterial();
const geometry = new ConeGeometry(0.05, 0.12, 8);
// const geometry =new OctahedronBufferGeometry(0.08)
// const geometry =new TorusKnotGeometry(0.05, 0.02, 150, 150)
// const geometry = new BoxGeometry(0.05, 0.05, 0.05, 2, 3, 1);
const playerMesh = new Mesh(geometry, material);
playerMesh.rotateZ(-Math.PI / 2);

scene.add(playerMesh);

const shaders = createShaders(renderer);

// ...and here we start rendering things.
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const outputBuffer: WebGLRenderTarget = new WebGLRenderTarget(1, 1);
outputBuffer.texture.generateMipmaps = false;

let timeLast = 0;

// let st = gameStateStore.getState();
// setInterval(()=>{
//     console.log(st.isbegin)
// },100)

render(0);
function render(time: number) {
    const timeDifference = time - timeLast;
    timeLast = time;

    tick(camera, scene, playerMesh, gameStateStore, timeDifference);

    const size = renderer.getDrawingBufferSize(new Vector2());
    outputBuffer.setSize(size.width, size.height);

    renderer.setRenderTarget(outputBuffer);
    renderer.render(scene, camera);

    shaders.reduce((buffer, current, i) => current(buffer, time, i === shaders.length - 1), outputBuffer);

    requestAnimationFrame(render);
}

setInterval(() => {
    gameStateStore.dispatch({ type: ActionType.SET_SCORE, value: camera.position.x });
}, 250);

setInterval(() => {
    spawnTick(camera, scene);
}, 100);

const onReset = () => {
    reset(camera, scene, playerMesh, gameStateStore);
};

addWindowEvents(camera, renderer, gameStateStore, onReset);
addOverlay(gameStateStore, onReset);