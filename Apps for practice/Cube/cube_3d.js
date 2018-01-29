
var DBS = {

	setup: {

		scene: null,
		camera: null,
		renderer: null,
		controls: null,
		nextRoom: "1",
		rooms: [],
		materials: [
		    new THREE.MeshBasicMaterial( { color: "white", vertexColors: THREE.FaceColors } ),
		    new THREE.MeshBasicMaterial( { color: "blue", vertexColors: THREE.FaceColors } ),
		    new THREE.MeshBasicMaterial( { color: "yellow", vertexColors: THREE.FaceColors } ),
		    new THREE.MeshBasicMaterial( { color: "red", vertexColors: THREE.FaceColors } ),
		    new THREE.MeshBasicMaterial( { color: "green", vertexColors: THREE.FaceColors } ),
		    new THREE.MeshBasicMaterial( { color: "orange", vertexColors: THREE.FaceColors } ),
		    new THREE.MeshBasicMaterial( { color: "purple", vertexColors: THREE.FaceColors } ),
		    new THREE.MeshBasicMaterial( { color: "gray", vertexColors: THREE.FaceColors } ),

			new THREE.MeshBasicMaterial({
		        map: new THREE.TextureLoader().load( "images/woodenFloor.jpg" ) }),
		    new THREE.MeshBasicMaterial({
		        map: new THREE.TextureLoader().load( "images/carpet.jpg" ) }),
			new THREE.MeshBasicMaterial({
		        map: new THREE.TextureLoader().load( "images/stoneFloor.jpg" ) }),
			new THREE.MeshBasicMaterial({
		        map: new THREE.TextureLoader().load( "images/blackRoof.jpg" ) }),
		    new THREE.MeshBasicMaterial({
		        map: new THREE.TextureLoader().load( "images/redRoof.jpg" ) }),
			new THREE.MeshBasicMaterial({
		        map: new THREE.TextureLoader().load( "images/roundTileRoof.jpg" ) }),
			new THREE.MeshBasicMaterial({
		        map: new THREE.TextureLoader().load( "images/whiteWall.jpg" ) }),
		    new THREE.MeshBasicMaterial({
		        map: new THREE.TextureLoader().load( "images/stoneWall.jpg" ) }),
			new THREE.MeshBasicMaterial({
		        map: new THREE.TextureLoader().load( "images/brickWall.jpg" ) }),
		],
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

	// Changing the material / color of the face. We change two attributes because each of the cube's faces
	// is constructed from two triangles in Three js.
	changeMaterial:function(roomNumber, faceNumber, materialNumber) {
		DBS.setup.rooms[roomNumber].geometry.faces[ faceNumber * 2 - 2 ].materialIndex = materialNumber;
		DBS.setup.rooms[roomNumber].geometry.faces[ faceNumber * 2 - 1 ].materialIndex = materialNumber;
		DBS.setup.rooms[roomNumber].geometry.groupsNeedUpdate = true;

	},

	// Room constructor
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
		DBS.setup.rooms[next].shape = new THREE.Mesh( DBS.setup.rooms[next].geometry, DBS.setup.materials );

		for (var i = 1; i < 7; i++) {
			DBS.changeMaterial(next, i, 0);
		}

		DBS.setup.rooms[next].shape.position.set(nextPosition , 0, 0);
		DBS.setup.scene.add( DBS.setup.rooms[next].shape );

		DBS.setup.nextRoom++;
	},

}

// The program that runs
DBS.init();
DBS.animate();


// });
