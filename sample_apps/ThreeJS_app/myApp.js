// Setup the environment

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var face1Color = "red";
var face2Color = "red";
var face3Color = "red";
var face4Color = "red";
var face5Color = "red";
var face6Color = "red";

var width = 1;
var height = 1;
var depth = 1;

// Default shape

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: "red" } );
var shape = new THREE.Mesh( geometry, material );

shape.name = "myShape";
shape.position.set(0, 0, 0);
scene.add( shape );

camera.position.x = 0;
camera.position.y = 3;
camera.position.z = 9;


// Functions

function animate() {
	requestAnimationFrame( animate );

	shape.rotation.x += 0.003;
	shape.rotation.y += 0.005;
	shape.rotation.z += 0.005;

	renderer.render( scene, camera );
}

animate();



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


$(document).ready(function(){

	$('.viewButton').click(function() {
		view = $(this).val();
		changeView(view);
		animate();
	});

	$('#dimensionButton').click(function() {
		width = $('#width').val();
		height = $('#height').val();
		depth = $('#depth').val();
		changeShape();
		animate();
	});

	$('#zoomPanButton').click(function() {
		zoom = $('#zoom').val();
		pan = $('#pan').val();
		camera.fov = zoom;
		camera.position.x = pan;
		camera.position.y = pan;
		camera.position.z = pan;
		camera.updateProjectionMatrix();
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




