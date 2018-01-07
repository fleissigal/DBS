//1

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//2

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: "red" } );
var cube = new THREE.Mesh( geometry, material );
cube.name = "myCube";

scene.add( cube );

camera.position.z = 3;
camera.position.y = 1;

//3

function animate(object) {
	requestAnimationFrame( animate );
	//4
	cube.rotation.x += 0.00;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();


function removeObject(objectName) {
	var objectToDelete = scene.getObjectByName(objectName);
	scene.remove(objectToDelete);
}


function changeColor(chosenColor) {

	removeObject("myCube");

	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: chosenColor } );
	cube = new THREE.Mesh( geometry, material );
	cube.name = "myCube";

	scene.add( cube );

	camera.position.z = 3;
	camera.position.y = 1;

}


$(document).ready(function(){

	// This function calls a helper function to draw shapes on
	// the canvas when the "drawButton" button is clicked
	$("#red").click(function() {
		changeColor("red");
		animate();
	});
	$("#blue").click(function() {
		changeColor("blue");
		animate();
	});
	$("#yellow").click(function() {
		changeColor("yellow");
		animate();
	});
});




