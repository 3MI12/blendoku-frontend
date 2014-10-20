var container;
var camera, controls, scene, projector, renderer;
var plane;

//cubeTexture
var cubeTexture = THREE.ImageUtils.loadTexture('../img/texture2.jpg');

var defaultColor = "#aeaeae";
var jsonURL = "1.json";

// vorgegebene Elemente - werte speichern
var colorArray = new Array();

// lösungselemente - werte speichern
var startGridArray = new Array();
startGridArray = new Array();

var mouse = new THREE.Vector2(),
    offset = new THREE.Vector3(),

    //global constant for interseceted Object and selected Object (for drag and drop)
    INTERSECTED, SELECTED;

/*  stuff for gamegrid  */
var gameGrid = []; // array of the grid of gamecourt
var gameGridGroup = new THREE.Object3D(); // group all objects of the grid
var dragingCubes = []; // array of the used colors in the level
var draggingCubesGroup = new THREE.Object3D(); // group all objects of the uses colors
var startGridY = 0; // where the top left cube of the gamecourt needs to be at gamestart
var startDragY = 0; // where the bottom left of the used colors needs to be at gamestart
var ignitionY = 50; // y of gameGrid before the start animation
var ignitionDragY = 50; // y of the used colors before the start animation

$(document).ready(function() {

  // read JSON with level grid and colors 
  readJson(jsonURL);

  //post JSON with solution on click(button "Level lösen")
  $("#solveLvl").click(function() {
    var solutionJSON = getSolutionJSON();
    $.ajax({
      type: "POST",
      url: "http://steve.blendoku.verbunden.net/scripts/json.php",
      //async: false,
      // The key needs to match your method's input parameter (case-sensitive).
      data: JSON.stringify({
        solvedGrid: solutionJSON
      }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        alert("test");
        alert(data);
      },
      failure: function(errMsg) {
        alert(errMsg);
      }
    });
  });

  init();
  animate();

  function init() {
    //add renderer Container to the DOM
    container = document.createElement('div');
    container.setAttribute("id", "renderer");
    document.body.appendChild(container);

    //call function for camera settings
    cameraSettings();

    //add Gamegrid
    placeGameGrid();
    
    console.log(gameGridGroup.children[0].editable);

    //create projector
    projector = new THREE.Projector();

    //create Scene
    scene = new THREE.Scene();

    //add all Objects to the scene
    //add Lvl Elements
    scene.add(draggingCubesGroup);
    scene.add(gameGridGroup);

    //create and add background plane
    plane = new THREE.Mesh(new THREE.PlaneGeometry(5000, 1000, 8, 8), new THREE.MeshBasicMaterial({
      color: 0x000000,
      opacity: 0.00,
      transparent: true,
      wireframe: true
    }));
    plane.visible = false;
    scene.add(plane);

    //add light
    scene.add(new THREE.AmbientLight(0xe3e3e3));

    // Add axes
    axes = buildAxes(5000);
    scene.add(axes);

    //renderer Settings
    rendererSettings();
    container.appendChild(renderer.domElement);

    //add eventListener
    renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
    renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
    renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
    renderer.domElement.addEventListener('contextmenu', onDocumentOnContextMenu, false);
    window.addEventListener('resize', onWindowResize, false);
  }

  //setting Camera and controls (TrackballControl.js)

  function cameraSettings() {
    camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 1200;

    //controls = new THREE.TrackballControls(camera);
    //controls.rotateSpeed = 0.5;
    //controls.zoomSpeed = 1.2;
    //controls.panSpeed = 0.8;
    //controls.noZoom = false;
    //controls.noPan = true;
    //controls.staticMoving = true;
    //controls.dynamicDampingFactor = 0.3;
  }

  function rendererSettings() {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.sortObjects = false;
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFShadowMap;
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    //controls.update();
    renderer.render(scene, camera);
  }
});