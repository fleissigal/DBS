//1 - setup of the environment

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var color = "red";
var shapeName = "cube";
//2 - default shape

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( {color: "red"} );
var shape = new THREE.Mesh( geometry, material );
shape.name = "myShape";
shape.position.set(0, 0, 0);
scene.add( shape );
camera.position.z = 5;
camera.position.y = 1;

// var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// var material = new THREE.MeshBasicMaterial( {color: "blue"} );
// var shape2 = new THREE.Mesh( geometry, material );
// shape2.name = "myShape2";
// shape2.position.set(3, 0, 0);
// scene.add( shape2 );
// camera.position.z = 5;
// camera.position.y = 1;

//3

function animate() {
	requestAnimationFrame( animate );
	//4

	shape.rotation.x += 0.0;
	shape.rotation.y += 0.005;

	// shape2.rotation.x += 0.0;
	// shape2.rotation.y += 0.005;
	
	renderer.render( scene, camera );
}

animate();


function removeObject(objectName) {
	var objectToDelete = scene.getObjectByName(objectName);
	scene.remove(objectToDelete);
}

function changeColor() {
	removeObject("myShape");
	if (shapeName == "sphere") {
		material = new THREE.MeshBasicMaterial( {color: color, wireframe:true} );
	} else {
		material = new THREE.MeshBasicMaterial( {color: color} );
	}
	shape = new THREE.Mesh( geometry, material );
	shape.position.set(0, 0, 0);
	shape.name = "myShape";
	scene.add( shape );
}

function changeObject() {

	removeObject("myShape");

	if (shapeName == "cube") {
		geometry = new THREE.BoxGeometry( 1, 1, 1 );
		material = new THREE.MeshBasicMaterial( {color: color} );
	}

	if (shapeName == "sphere") {
		geometry = new THREE.SphereGeometry(0.7, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
		material = new THREE.MeshBasicMaterial( {color: color, wireframe:true} );
	}

	if (shapeName == "pyramid") {
		geometry = new THREE.CylinderGeometry( 0, 1, 1, 4 );
		material = new THREE.MeshBasicMaterial( {color: color} );

	}

	shape = new THREE.Mesh( geometry, material );
	shape.position.set(0, 0, 0);
	shape.name = "myShape";
	scene.add( shape );
	camera.position.z = 5;
	camera.position.y = 1;
}


$(document).ready(function(){

	$('.shapeButton').click(function() {
		shapeName = $(this).val();
		changeObject();
		animate();
	});


	$('.colorButton').click(function() {
		color = $(this).val();
		changeColor();
		animate();
	});

});




