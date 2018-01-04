//1

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//2

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0xc70039 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 3;
camera.position.y = 1;

//3

function animate() {
	requestAnimationFrame( animate );
	//4
	cube.rotation.x += 0.00;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}
animate();