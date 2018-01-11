
var DBS = {

	setup: {

		scene: null,
		camera: null,
		renderer: null,

	},

	room1: {

		face1Color: null,
		face2Color: null,
		face3Color: null,
		face4Color: null,
		face5Color: null,
		face6Color: null,
		
		width: null,
		height: null,
		depth: null,

		geometry: null,
		material: null,
		shape: null,
	},


	// Setup of the initial state of the app
	init:function() {

		DBS.setup.scene = new THREE.Scene();
		DBS.setup.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

		renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );

		DBS.room1.face1Color = "red";
		DBS.room1.face2Color = "red";
		DBS.room1.face3Color = "red";
		DBS.room1.face4Color = "red";
		DBS.room1.face5Color = "red";
		DBS.room1.face6Color = "red";

		DBS.room1.width = 1;
		DBS.room1.height = 1;
		DBS.room1.depth = 1;

		// The default shape - a cube
		DBS.room1.geometry = new THREE.BoxGeometry( DBS.room1.width, DBS.room1.height, DBS.room1.depth );
		DBS.room1.material = new THREE.MeshBasicMaterial( { color: "red" } );
		DBS.room1.shape = new THREE.Mesh( DBS.room1.geometry, DBS.room1.material );
		DBS.room1.shape.name = "myShape";
		DBS.room1.shape.position.set(0, 0, 0);
		DBS.setup.scene.add( DBS.room1.shape );

		// Default position of the camera
		// changeView("side");
		DBS.setup.camera.position.x = 0;
		DBS.setup.camera.position.y = 3;
		DBS.setup.camera.position.z = 9;
	},

	// The function that is responsible for animating
	animate:function() {
		requestAnimationFrame( DBS.animate );

		DBS.room1.shape.rotation.x += 0.003;
		DBS.room1.shape.rotation.y += 0.005;
		DBS.room1.shape.rotation.z += 0.005;

		renderer.render( DBS.setup.scene, DBS.setup.camera );
	},

	// Removing the object from the scene
	removeObject:function(objectName) {
		var objectToDelete = DBS.setup.scene.getObjectByName(objectName);
		DBS.setup.scene.remove(objectToDelete);
	},

	changeShape:function() {
		DBS.removeObject("myShape");

		// Changing the dimensions
		DBS.room1.geometry = new THREE.BoxGeometry( DBS.room1.width, DBS.room1.height, DBS.room1.depth );	
		DBS.room1.material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors } );
		DBS.room1.shape = new THREE.Mesh( DBS.room1.geometry, DBS.room1.material );

		// Changing the colors of the different faces
		DBS.room1.geometry.faces[ 0 ].color = new THREE.Color(DBS.room1.face1Color);
		DBS.room1.geometry.faces[ 1 ].color = new THREE.Color(DBS.room1.face1Color);

		DBS.room1.geometry.faces[ 2 ].color = new THREE.Color(DBS.room1.face2Color);
		DBS.room1.geometry.faces[ 3 ].color = new THREE.Color(DBS.room1.face2Color);

		DBS.room1.geometry.faces[ 4 ].color = new THREE.Color(DBS.room1.face3Color);
		DBS.room1.geometry.faces[ 5 ].color = new THREE.Color(DBS.room1.face3Color);

		DBS.room1.geometry.faces[ 6 ].color = new THREE.Color(DBS.room1.face4Color);
		DBS.room1.geometry.faces[ 7 ].color = new THREE.Color(DBS.room1.face4Color);

		DBS.room1.geometry.faces[ 8 ].color = new THREE.Color(DBS.room1.face5Color);
		DBS.room1.geometry.faces[ 9 ].color = new THREE.Color(DBS.room1.face5Color);

		DBS.room1.geometry.faces[ 10 ].color = new THREE.Color(DBS.room1.face6Color);
		DBS.room1.geometry.faces[ 11 ].color = new THREE.Color(DBS.room1.face6Color);

		DBS.room1.shape.name = "myShape";
		DBS.room1.shape.position.set(0, 0, 0);
		DBS.setup.scene.add( DBS.room1.shape );
	},

	// Changing the angle of the camera
	changeView:function(view) {
		DBS.setup.camera.position.x = 0;

		if (view == "top") {
			DBS.setup.camera.position.y = 0;
		} else {
			DBS.setup.camera.position.y = 3;
		}

		DBS.setup.camera.position.z = 9;
	},
}

// The program that runs
DBS.init();
DBS.animate();
