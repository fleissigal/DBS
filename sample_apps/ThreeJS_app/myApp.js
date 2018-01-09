// Setup the environment

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var color = "red";
var shapeName = "cube";


// Default shape

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( {color: "red"} );
var shape = new THREE.Mesh( geometry, material );
shape.name = "myShape";
shape.position.set(0, 0, 0);
scene.add( shape );

camera.position.x = 0;
camera.position.y = 2;
camera.position.z = 5;


// Functions

function animate() {
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
}

animate();



function removeObject(objectName) {
	var objectToDelete = scene.getObjectByName(objectName);
	scene.remove(objectToDelete);
}

function changeColor() {
	removeObject("myShape");

	material = new THREE.MeshBasicMaterial( {color: color} );
	shape = new THREE.Mesh( geometry, material );
	shape.position.set(0, 0, 0);
	shape.name = "myShape";
	scene.add( shape );
}


function changeView(view) {

	if (view == "top") {
		camera.position.x = 0;
		camera.position.y = 0;
		camera.position.z = 5;
	}

	if (view == "side") {
		camera.position.x = 0;
		camera.position.y = 2;
		camera.position.z = 5;
	}

}

function changeDimension(height, width, depth) {
	console.log(height);
	removeObject("myShape");

	geometry = new THREE.BoxGeometry( width, height, depth );
	material = new THREE.MeshBasicMaterial( {color: color} );
	shape = new THREE.Mesh( geometry, material );
	shape.position.set(0, 0, 0);
	shape.name = "myShape";
	scene.add( shape );

}


$(document).ready(function(){

	$('.viewButton').click(function() {
		view = $(this).val();
		changeView(view);
		animate();
	});

	$('.colorButton').click(function() {
		color = $(this).val();
		changeColor();
		animate();
	});

	$('#dimensionButton').click(function() {
		var height = $('#height').val();
		var	width = $('#width').val();
		var depth = $('#depth').val();
		changeDimension(height, width, depth);
		animate();
	});

});




