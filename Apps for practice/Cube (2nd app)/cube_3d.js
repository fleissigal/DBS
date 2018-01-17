
var DBS = {

	setup: {

		scene: null,
		camera: null,
		renderer: null,
		controls: null,
		nextRoom: "1",
		rooms: [],

	},

	// Setup of the initial state of the app
	init:function() {

		DBS.setup.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		// Default position of the camera
		DBS.changeView("side");

		DBS.setup.controls = new THREE.TrackballControls( DBS.setup.camera );
		DBS.setup.controls.addEventListener('change', DBS.render);

		DBS.setup.scene = new THREE.Scene();

		DBS.setup.renderer = new THREE.WebGLRenderer();
		DBS.setup.renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( DBS.setup.renderer.domElement );

	},

	// The function that is responsible for animating
	animate:function() {
		requestAnimationFrame( DBS.animate );
		DBS.setup.controls.update();
		DBS.render();
	},

	render:function() {
		DBS.setup.renderer.render( DBS.setup.scene, DBS.setup.camera );
	},
	
	// Changing the colors of the different faces
	changeColors:function(roomNumber, faceNumber, color) {
		DBS.setup.rooms[roomNumber].geometry.faces[ faceNumber * 2 - 2 ].color.set(color);
		DBS.setup.rooms[roomNumber].geometry.faces[ faceNumber * 2 - 1 ].color.set(color);
		DBS.setup.rooms[roomNumber].geometry.colorsNeedUpdate = true;
	},

	changeDimensions:function(roomNumber, width, height, depth) {
		DBS.setup.rooms[roomNumber].shape.scale.x = width;
		DBS.setup.rooms[roomNumber].shape.scale.y = height;
		DBS.setup.rooms[roomNumber].shape.scale.z = depth;
	},

	// Changing the angle of the camera
	changeView:function(view) {
		DBS.setup.camera.position.x = 0;
		DBS.setup.camera.position.y = (view == "top") ? 0 : 3;
		DBS.setup.camera.position.z = 9;
	},

	Room:function(size) {
		this.width = size;
		this.height = size;
		this.depth = size;
		this.defaultColor = "white";

		this.geometry = null;
		this.material = null;
		this.shape = null;
	},

	// Adding one more room to the scene
	addRoom:function() {
		DBS.setup.rooms[DBS.setup.nextRoom] = new DBS.Room(1);
		var next = DBS.setup.nextRoom;
		var nextPosition = parseInt(next) - 1;

		DBS.setup.rooms[next].geometry = new THREE.BoxGeometry( DBS.setup.rooms[next].width, DBS.setup.rooms[next].height, DBS.setup.rooms[next].depth );
		DBS.setup.rooms[next].material = new THREE.MeshBasicMaterial( { color: DBS.setup.rooms[next].defaultColor, vertexColors: THREE.FaceColors } );
		DBS.setup.rooms[next].shape = new THREE.Mesh( DBS.setup.rooms[next].geometry, DBS.setup.rooms[next].material );
		DBS.setup.rooms[next].shape.position.set(nextPosition , 0, 0);
		DBS.setup.scene.add( DBS.setup.rooms[next].shape );

		DBS.setup.nextRoom++;
	},
}


// The program that runs
DBS.init();
DBS.animate();
