
var DBS = {

	setup: {

		scene: null,
		camera: null,
		renderer: null,
		controls: null,

	},

	room1: {
		
		width: 1,
		height: 1,
		depth: 1,

		geometry: null,
		material: null,
		shape: null,
	},


	// Setup of the initial state of the app
	init:function() {

		DBS.setup.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		// Default position of the camera
		DBS.changeView("side");

		DBS.setup.controls = new THREE.TrackballControls( DBS.setup.camera );
		DBS.setup.controls.addEventListener('change', DBS.render);

		DBS.setup.scene = new THREE.Scene();

		// DBS.room1.width = 1;
		// DBS.room1.height = 1;
		// DBS.room1.depth = 1;

		// The default shape - a cube
		DBS.room1.geometry = new THREE.BoxGeometry( DBS.room1.width, DBS.room1.height, DBS.room1.depth );
		DBS.room1.material = new THREE.MeshBasicMaterial( { color: "white", vertexColors: THREE.FaceColors } );

		DBS.room1.shape = new THREE.Mesh( DBS.room1.geometry, DBS.room1.material );
		DBS.room1.shape.position.set(0, 0, 0);
		DBS.setup.scene.add( DBS.room1.shape );

		DBS.setup.renderer = new THREE.WebGLRenderer();
		DBS.setup.renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( DBS.setup.renderer.domElement );

	},

	// The function that is responsible for animating
	animate:function() {
		requestAnimationFrame( DBS.animate );
		DBS.setup.controls.update();

		// DBS.room1.shape.rotation.x += 0.003;
		// DBS.room1.shape.rotation.y += 0.005;
		// DBS.room1.shape.rotation.z += 0.005;
		DBS.render();
	},

	render:function() {
		DBS.setup.renderer.render( DBS.setup.scene, DBS.setup.camera );

	},
	
	// Changing the colors of the different faces
	changeColors:function(faceNumber, color) {
		var num = parseInt(faceNumber);
		DBS.room1.geometry.faces[ num * 2 - 2 ].color.set(color);
		DBS.room1.geometry.faces[ num * 2 - 1 ].color.set(color);

		DBS.room1.geometry.colorsNeedUpdate = true;

	},

	changeDimensions:function(width, height, depth) {
		DBS.room1.shape.scale.x = width;
		DBS.room1.shape.scale.y = height;
		DBS.room1.shape.scale.z = depth;
	},

	// Changing the angle of the camera
	changeView:function(view) {
		DBS.setup.camera.position.x = 0;
		DBS.setup.camera.position.y = (view == "top") ? 0 : 3;
		DBS.setup.camera.position.z = 9;
	},
}

// The program that runs
DBS.init();
DBS.animate();
