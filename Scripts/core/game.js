/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
var CScreen = config.Screen;
//Custom Game Objects
var gameObject = objects.gameObject;
var scene;
var renderer;
var camera;
var axes;
var cube;
var plane;
var sphere;
var ambientLight;
var spotLight;
var control;
var gui;
var stats;
var step = 0;
var cubeBody;
var cubeGeometry;
var cubeMaterial;
///////////////////////////////////
var human;
var head;
var headGeometry;
var headMaterial;
var body;
var bodyGeometry;
var bodyMaterial;
var rArm;
var rArmGeometry;
var rArmMaterial;
var lArm;
var lArmGeometry;
var lArmMaterial;
var rLeg;
var rLegGeometry;
var rLegMaterial;
var lLeg;
var lLegGeometry;
var lLegMaterial;
var randomColors;
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
    plane = new gameObject(new PlaneGeometry(16, 16, 1, 1), new LambertMaterial({ color: 0xe79b61 }), 0, 0, 0);
    plane.rotation.x = -0.5 * Math.PI;
    ////////////////////////////////////////////
    // Changing Plane Positioning
    plane.position.y = -5;
    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
    //Add a Cube to the Scene
    cubeMaterial = new LambertMaterial({ color: 0x00ff00 });
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
    headMaterial = new LambertMaterial({ color: 0xFFCCCC });
    headGeometry = new CubeGeometry(2, 2, 2);
    head = new Mesh(headGeometry, headMaterial);
    head.castShadow = true;
    head.receiveShadow = true;
    head.position.y = 10;
    scene.add(head);
    human.add(head);
    console.log("Added Head Cube Primitive to scene...");
    //Add a BODY to the Scene
    bodyMaterial = new LambertMaterial({ color: 0x9900CC });
    bodyGeometry = new CubeGeometry(6, 6, 2);
    body = new Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    body.position.y = 9;
    scene.add(body);
    human.add(body);
    console.log("Added body Cube Primitive to scene...");
    //Add a RIGHT ARM to the Scene
    rArmMaterial = new LambertMaterial({ color: 0x0000CC });
    rArmGeometry = new CubeGeometry(6, 2, 2);
    rArm = new Mesh(rArmGeometry, rArmMaterial);
    rArm.castShadow = true;
    rArm.receiveShadow = true;
    rArm.position.x = 5;
    scene.add(rArm);
    human.add(rArm);
    console.log("Added right arm Cube Primitive to scene...");
    //Add a LEFT ARM to the Scene
    lArmMaterial = new LambertMaterial({ color: 0x0000CC });
    lArmGeometry = new CubeGeometry(-6, 2, 2);
    lArm = new Mesh(lArmGeometry, lArmMaterial);
    lArm.castShadow = true;
    lArm.receiveShadow = true;
    lArm.position.x = -5;
    scene.add(lArm);
    human.add(lArm);
    console.log("Added left arm Cube Primitive to scene...");
    //Add a LEFT LEG to the Scene
    lLegMaterial = new LambertMaterial({ color: 0x0000CC });
    lLegGeometry = new CubeGeometry(2, -6, 2);
    lLeg = new Mesh(lLegGeometry, lLegMaterial);
    lLeg.castShadow = true;
    lLeg.receiveShadow = true;
    lLeg.position.y = -7;
    lLeg.position.x = 2;
    scene.add(lLeg);
    human.add(lLeg);
    console.log("Added left leg Cube Primitive to scene...");
    //Add a RIGHT LEG to the Scene
    rLegMaterial = new LambertMaterial({ color: 0x0000CC });
    rLegGeometry = new CubeGeometry(2, -6, 2);
    rLeg = new Mesh(rLegGeometry, rLegMaterial);
    rLeg.castShadow = true;
    rLeg.receiveShadow = true;
    rLeg.position.y = -7;
    rLeg.position.x = -2;
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
function onResize() {
    camera.aspect = CScreen.RATIO;
    //camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    //renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
}
function addControl(controlObject) {
    gui.add(controlObject, 'rotationSpeed', -0.5, 0.5);
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
function gameLoop() {
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
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
    //renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, config.Screen.RATIO, 0.1, 1000);
    //camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0.6;
    camera.position.y = 16;
    camera.position.z = -20.5;
    camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera...");
}
//# sourceMappingURL=game.js.map