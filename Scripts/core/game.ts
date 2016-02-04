/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;
import CScreen = config.Screen;

//Custom Game Objects
import gameObject = objects.gameObject;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var cube: Mesh;
var plane: Mesh;
var sphere: Mesh;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;
var cubeBody: Mesh;
var cubeGeometry:CubeGeometry;
var cubeMaterial:LambertMaterial;

///////////////////////////////////
var human;
var head: Mesh;
var headGeometry:CubeGeometry;
var headMaterial:LambertMaterial;

var body: Mesh;
var bodyGeometry:CubeGeometry;
var bodyMaterial:LambertMaterial;

var rArm: Mesh;
var rArmGeometry:CubeGeometry;
var rArmMaterial:LambertMaterial;

var lArm: Mesh;
var lArmGeometry:CubeGeometry;
var lArmMaterial:LambertMaterial;

var rLeg: Mesh;
var rLegGeometry:CubeGeometry;
var rLegMaterial:LambertMaterial;

var lLeg: Mesh;
var lLegGeometry:CubeGeometry;
var lLegMaterial:LambertMaterial;

var randomColors
///////////////////////////////////

function init() {
    // Instantiate a new Scene object
    scene = new Scene();

    setupRenderer(); // setup the default renderer
	
    setupCamera(); // setup the camera
	
    // add an axis helper to the scene
    axes = new AxisHelper(10);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    
    //Add a Plane to the Scene
    plane = new gameObject(
        new PlaneGeometry(16, 16, 1, 1),
        new LambertMaterial({ color: 0xe79b61 }),
        0, 0, 0);
       

    plane.rotation.x = -0.5 * Math.PI;
    ////////////////////////////////////////////
    // Changing Plane Positioning
    plane.position.y = -5;

    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
    
    //Add a Cube to the Scene
    cubeMaterial = new LambertMaterial({color:0x00ff00});
    cubeGeometry = new CubeGeometry(2, 2, 2);
    cube = new Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.position.y = 1;
    
    scene.add(cube);
    console.log("Added Cube Primitive to scene...");
    
    ////////////////////////////////////////////////////
    human = new THREE.Object3D();
    //Add a HEAD to the Scene
    headMaterial = new LambertMaterial({color:0xFFCCCC});
    headGeometry = new CubeGeometry(2, 2, 2);
    head = new Mesh(headGeometry, headMaterial);
    head.castShadow = true;
    head.receiveShadow = true;
    head.position.y = 10;
    
    scene.add(head);
    human.add(head);
    console.log("Added Head Cube Primitive to scene...");
    
    //Add a BODY to the Scene
    bodyMaterial = new LambertMaterial({color:0x9900CC});
    bodyGeometry = new CubeGeometry(6, 6, 2);
    body = new Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    body.position.y = 9;
    
    scene.add(body);
    human.add(body);
    console.log("Added body Cube Primitive to scene...");
    
    //Add a RIGHT ARM to the Scene
    rArmMaterial = new LambertMaterial({color:0x0000CC});
    rArmGeometry = new CubeGeometry(6, 2, 2);
    rArm = new Mesh(rArmGeometry, rArmMaterial);
    rArm.castShadow = true;
    rArm.receiveShadow = true;
    rArm.position.x = 5;
    
    scene.add(rArm);
    human.add(rArm);
    console.log("Added right arm Cube Primitive to scene...");
    
    //Add a LEFT ARM to the Scene
    lArmMaterial = new LambertMaterial({color:0x0000CC});
    lArmGeometry = new CubeGeometry(-6, 2, 2);
    lArm = new Mesh(lArmGeometry, lArmMaterial);
    lArm.castShadow = true;
    lArm.receiveShadow = true;
    lArm.position.x = -5;
    
    scene.add(lArm);
    human.add(lArm);
    console.log("Added left arm Cube Primitive to scene...");
    
    
    //Add a LEFT LEG to the Scene
    lLegMaterial = new LambertMaterial({color:0x0000CC});
    lLegGeometry = new CubeGeometry(2, 2, 2);
    lLeg = new Mesh(lLegGeometry, lLegMaterial);
    lLeg.castShadow = true;
    lLeg.receiveShadow = true;
    lLeg.position.y = 5;
    
    scene.add(lLeg);
    human.add(lLeg);
    console.log("Added left leg Cube Primitive to scene...");
    
    
    //Add a RIGHT LEG to the Scene
    rLegMaterial = new LambertMaterial({color:0x0000CC});
    rLegGeometry = new CubeGeometry(2, 2, 2);
    rLeg = new Mesh(rLegGeometry, rLegMaterial);
    rLeg.castShadow = true;
    rLeg.receiveShadow = true;
    rLeg.position.y = 5;
    
    scene.add(rLeg);
    human.add(rLeg);
    console.log("Added right leg Cube Primitive to scene...");


    //adds human object to the scene
    scene.add(human);
    
    ////////////////////////////////////////////////////
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x090909);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
	
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(5.6, 23.1, 5.4);
    spotLight.rotation.set(-0.8, 42.7, 19.5);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    
    // add controls
    gui = new GUI();
    control = new Control(0.05);
    addControl(control);

    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");

    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    
    window.addEventListener('resize', onResize, false);
}

function onResize(): void {
    camera.aspect = CScreen.RATIO;
    //camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    //renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
}

function addControl(controlObject: Control): void {
    gui.add(controlObject, 'rotationSpeed',-0.5,0.5);
}

function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}

// Setup main game loop
function gameLoop(): void {
    stats.update();

    cube.rotation.y += control.rotationSpeed;
    ///////////////////////////////////////
    
    //rotates HUMAN OBJECT
    human.rotation.y += control.rotationSpeed;
    human.rotation.x += control.rotationSpeed;
    human.rotation.z += control.rotationSpeed;
    
    ///////////////////////////////////////
   
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
	
    // render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
    //renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(45, config.Screen.RATIO, 0.1, 1000);
    //camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0.6;
    camera.position.y = 16;
    camera.position.z = -20.5;
    camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera...");
}