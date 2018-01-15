
var DBS = {

	setup: {

		scene: null,
		camera: null,
		renderer: null,
		controls: null,
		nextRoom: "2",

	},

	room1: {
		
		width: 1,
		height: 1,
		depth: 1,
		defaultColor: "white",

		geometry: null,
		material: null,
		shape: null,
	},

	room2: {
		
		width: 1,
		height: 1,
		depth: 1,
		defaultColor: "red",

		geometry: null,
		material: null,
		shape: null,
	},

	room3: {
		
		width: 1,
		height: 1,
		depth: 1,
		defaultColor: "purple",

		geometry: null,
		material: null,
		shape: null,
	},


	room4: {
		
		width: 1,
		height: 1,
		depth: 1,
		defaultColor: "orange",

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

		// The default shape - a cube
		DBS.room1.geometry = new THREE.BoxGeometry( DBS.room1.width, DBS.room1.height, DBS.room1.depth );
		DBS.room1.material = new THREE.MeshBasicMaterial( { color: DBS.room1.defaultColor, vertexColors: THREE.FaceColors } );

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

	// Adding one more room to the scene
	addRoom:function() {

		eval("DBS.room" + DBS.setup.nextRoom + ".geometry = new THREE.BoxGeometry( DBS.room" + DBS.setup.nextRoom + ".width, DBS.room" + DBS.setup.nextRoom + ".height, DBS.room" + DBS.setup.nextRoom + ".depth );");
		eval("DBS.room" + DBS.setup.nextRoom + ".material = new THREE.MeshBasicMaterial( { color: DBS.room" + DBS.setup.nextRoom + ".defaultColor, vertexColors: THREE.FaceColors } );");
		eval("DBS.room" + DBS.setup.nextRoom + ".shape = new THREE.Mesh( DBS.room" + DBS.setup.nextRoom + ".geometry, DBS.room" + DBS.setup.nextRoom + ".material );");
		eval("DBS.room" + DBS.setup.nextRoom + ".shape.position.set(" + (DBS.setup.nextRoom - 1) + ", 0, 0);");
		eval("DBS.setup.scene.add( DBS.room" + DBS.setup.nextRoom + ".shape );");
		
		DBS.setup.nextRoom++;
	},
}


// The program that runs
DBS.init();
DBS.animate();
