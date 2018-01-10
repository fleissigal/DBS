// Global variables
var scene;
var camera;
var renderer;

var face1Color;
var face2Color;
var face3Color;
var face4Color;
var face5Color;
var face6Color;

var width;
var height;
var depth;

var geometry;
var material;
var shape;


// Setup of the initial state of the app
function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	face1Color = "red";
	face2Color = "red";
	face3Color = "red";
	face4Color = "red";
	face5Color = "red";
	face6Color = "red";

	width = 1;
	height = 1;
	depth = 1;

	// The default shape - a cube
	geometry = new THREE.BoxGeometry( width, height, depth );
	material = new THREE.MeshBasicMaterial( { color: "red" } );
	shape = new THREE.Mesh( geometry, material );
	shape.name = "myShape";
	shape.position.set(0, 0, 0);
	scene.add( shape );

	// Default position of the camera
	camera.position.x = 0;
	camera.position.y = 3;
	camera.position.z = 9;
}

// The function that is responsible for animating
function animate() {
	requestAnimationFrame( animate );

	shape.rotation.x += 0.003;
	shape.rotation.y += 0.005;
	shape.rotation.z += 0.005;

	renderer.render( scene, camera );
}

// Removing the object from the scene
function removeObject(objectName) {
	var objectToDelete = scene.getObjectByName(objectName);
	scene.remove(objectToDelete);
}

function changeShape() {
	removeObject("myShape");

	// Changing the dimensions
	geometry = new THREE.BoxGeometry( width, height, depth );	
	material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors } );
	shape = new THREE.Mesh( geometry, material );

	// Changing the colors of the different faces
	geometry.faces[ 0 ].color = new THREE.Color(face1Color);
	geometry.faces[ 1 ].color = new THREE.Color(face1Color);

	geometry.faces[ 2 ].color = new THREE.Color(face2Color);
	geometry.faces[ 3 ].color = new THREE.Color(face2Color);

	geometry.faces[ 4 ].color = new THREE.Color(face3Color);
	geometry.faces[ 5 ].color = new THREE.Color(face3Color);

	geometry.faces[ 6 ].color = new THREE.Color(face4Color);
	geometry.faces[ 7 ].color = new THREE.Color(face4Color);

	geometry.faces[ 8 ].color = new THREE.Color(face5Color);
	geometry.faces[ 9 ].color = new THREE.Color(face5Color);

	geometry.faces[ 10 ].color = new THREE.Color(face6Color);
	geometry.faces[ 11 ].color = new THREE.Color(face6Color);

	shape.name = "myShape";
	shape.position.set(0, 0, 0);
	scene.add( shape );
}

// Changing the angle of the camera
function changeView(view) {

	if (view == "top") {
		camera.position.x = 0;
		camera.position.y = 0;
		camera.position.z = 9;
	}

	if (view == "side") {
		camera.position.x = 0;
		camera.position.y = 3;
		camera.position.z = 9;
	}

}

// Functions to execute as response to buttons/menus
$(document).ready(function(){

	$('.viewButton').click(function() {
		view = $(this).val();
		changeView(view);
		animate();
	});

	$('#updateDimensionButton').click(function() {
		width = $('#width').val();
		height = $('#height').val();
		depth = $('#depth').val();
		changeShape();
		animate();
	});

	$('#resetDimensionsButton').click(function() {
		width = 1;
		height = 1;
		depth = 1;
		changeShape();
		animate();
	});

	
	$('#updateZoomButton').click(function() {
		zoom = $('#zoom').val();
		camera.fov = zoom;
		camera.updateProjectionMatrix();
		animate();
	});

	$('#resetZoomButton').click(function() {
		camera.fov = 50;
		camera.updateProjectionMatrix();
		animate();
	});


	$('#updatePanButton').click(function() {
		pan = $('#pan').val() / 10;
		camera.position.x = pan;
		camera.position.y = pan;
		camera.position.z = pan;
		animate();
	});


	$('#resetPanButton').click(function() {
		camera.position.x = 0;
		camera.position.y = 3;
		camera.position.z = 9;
		animate();
	});

	$('.faceMenu').change(function() {
		color = $(this).val();
		switch($(this).attr('id')) {
			case "face1":
				face1Color = color;
				break;
			case "face2":
				face2Color = color;
				break;
			case "face3":
				face3Color = color;
				break;
			case "face4":
				face4Color = color;
				break;
			case "face5":
				face5Color = color;
				break;
			case "face6":
				face6Color = color;
				break;
			default:
				break;
		}
		changeShape();
		animate();
	});

});


// The program that runs
init();
animate();
