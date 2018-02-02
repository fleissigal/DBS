
// The variable that holds the different rooms, colors, materials and more
var DBS = {

	setup: {

		scene: null,
		camera: null,
		renderer: null,
		controls: null,
		nextRoom: "1",
		rooms: [],
		materials: [
			// All the available colors in the app
		    new THREE.MeshBasicMaterial( { color: "white", vertexColors: THREE.FaceColors } ),
		    new THREE.MeshBasicMaterial( { color: "blue", vertexColors: THREE.FaceColors } ),
		    new THREE.MeshBasicMaterial( { color: "yellow", vertexColors: THREE.FaceColors } ),
		    new THREE.MeshBasicMaterial( { color: "red", vertexColors: THREE.FaceColors } ),
		    new THREE.MeshBasicMaterial( { color: "green", vertexColors: THREE.FaceColors } ),
		    new THREE.MeshBasicMaterial( { color: "orange", vertexColors: THREE.FaceColors } ),
		    new THREE.MeshBasicMaterial( { color: "purple", vertexColors: THREE.FaceColors } ),
		    new THREE.MeshBasicMaterial( { color: "gray", vertexColors: THREE.FaceColors } ),

			// All the available materials in the app
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
			new THREE.MeshBasicMaterial({
		        map: new THREE.TextureLoader().load( "images/door.jpg" ) }),
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

	// The function that is responsible for rendering
	render:function() {
		DBS.setup.renderer.render( DBS.setup.scene, DBS.setup.camera );
	},

	// The function that changes the dimensions of a specific room
	changeDimensions:function(roomNumber, width, height, depth) {
		DBS.setup.rooms[roomNumber].shape.scale.x = width;
		DBS.setup.rooms[roomNumber].shape.scale.y = height;
		DBS.setup.rooms[roomNumber].shape.scale.z = depth;
	},

	// The function that changes the angle of the camera
	changeView:function(view) {
		DBS.setup.camera.position.x = 0;
		DBS.setup.camera.position.y = (view == "forward") ? 0 : 3;
		DBS.setup.camera.position.z = (view == "top") ? 0 : 9;
	},

	// The function that changes the position of a specific room
	changePosition:function(roomNumber, x, y, z) {
		DBS.setup.rooms[roomNumber].shape.position.set(x , y, z);
	},

	// Changing the material / color of the face. Two attributes are being changed because each of the cube's faces
	// is constructed from two triangles in Three js.
	changeMaterial:function(roomNumber, faceNumber, materialNumber) {
		DBS.setup.rooms[roomNumber].geometry.faces[ faceNumber * 2 - 2 ].materialIndex = materialNumber;
		DBS.setup.rooms[roomNumber].geometry.faces[ faceNumber * 2 - 1 ].materialIndex = materialNumber;
		DBS.setup.rooms[roomNumber].geometry.groupsNeedUpdate = true;
		
		if (materialNumber == 17) {
			DBS.setup.rooms[roomNumber].doors[faceNumber - 1] = true;
		} else {
			DBS.setup.rooms[roomNumber].doors[faceNumber - 1] = false;
		}
	},

	// The Room constructor. Default color of all the faces is white
	Room:function(size) {
		this.width = size;
		this.height = size;
		this.depth = size;
		this.defaultColor = "white";

		this.geometry = null;
		this.material = null;
		this.shape = null;

		this.doors = [false, false, false, false, false, false];
	},

	// Adding one more room to the scene
	addRoom:function() {
		DBS.setup.rooms[DBS.setup.nextRoom] = new DBS.Room(1);
		var next = DBS.setup.nextRoom;
		// console.log(next);
		var nextPosition = Number.parseInt(next) - 1;

		DBS.setup.rooms[next].geometry = new THREE.BoxGeometry( DBS.setup.rooms[next].width, DBS.setup.rooms[next].height, DBS.setup.rooms[next].depth );
		DBS.setup.rooms[next].shape = new THREE.Mesh( DBS.setup.rooms[next].geometry, DBS.setup.materials );
		// console.log(next);

		for (var i = 1; i < 7; i++) {
			// console.log(next);
			DBS.changeMaterial( next, i, 0 );
		}

		DBS.setup.rooms[next].shape.position.set(nextPosition , 0, 0);
		DBS.setup.scene.add( DBS.setup.rooms[next].shape );

		DBS.setup.nextRoom++;
	},

	// Prints the locations of all the doors in the house
	printDoorLocations:function() {
		var next = Number.parseInt(DBS.setup.nextRoom);
		console.log("Doors are at:");
		for (var i = 1; i < next; i++) {
			for (var j = 0; j < 6; j++) {
				if (DBS.setup.rooms[i].doors[j] == true) {
					console.log("Room number: " + i + ", " + "Face number: " + (j + 1));
				}
			}
		}
	},
}

// The program that runs
DBS.init();
DBS.animate();


