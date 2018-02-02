// Functions to execute as response to buttons/menus
$(document).ready(function(){

	// The button that controlls the view of the scene (camera position)
	$('.viewButton').click(function() {
		view = $(this).val();
		DBS.changeView(view);
	});

	// The button that updates the dimensions of a room (width, height, depth)
	$('#updateDimensionButton').click(function() {
		var roomNumber = $('#roomToChange').val();
		DBS.changeDimensions(roomNumber, $('#width').val(), $('#height').val(), $('#depth').val());
	});

	// The button that resets the dimensions of a room
	$('#resetDimensionsButton').click(function() {
		var roomNumber = $('#roomToChange').val();
		DBS.changeDimensions(roomNumber, 1, 1, 1);
	});

	// The button that updates the position of a room (x, y, z)
	$('#updatePositionButton').click(function() {
		var roomNumber = $('#roomToChange').val();
		DBS.changePosition(roomNumber, $('#x_axis').val(), $('#y_axis').val(), $('#z_axis').val());
	});

	// The button that resets the position of a room
	$('#resetPositionButton').click(function() {
		var roomNumber = $('#roomToChange').val();
		DBS.changePosition(roomNumber, roomNumber, 0, 0);
	});
	
	// The button that updates the zoom of the scene
	$('#updateZoomButton').click(function() {
		var zoom = $('#zoom').val();
		DBS.setup.camera.fov = zoom;
		DBS.setup.camera.updateProjectionMatrix();
	});

	// The button that resets the zoom of the scene
	$('#resetZoomButton').click(function() {
		DBS.setup.camera.fov = 50;
		DBS.setup.camera.updateProjectionMatrix();
	});

	// The button that updates the pan of the scene
	$('#updatePanButton').click(function() {
		var pan = $('#pan').val() / 10;
		DBS.setup.camera.position.x = pan;
		DBS.setup.camera.position.y = pan;
		DBS.setup.camera.position.z = pan;
	});

	// The button that resets the pan of the scene
	$('#resetPanButton').click(function() {
		DBS.changeView("side");
	});

	// The menu that updates the color of a specific face in a specific room
	$('#faceColor').change(function() {
		var roomNumber = $('#roomToChange').val();
		var faceNumber = $('#faceToChange').val();
		var colorString = ($(this).val()).substring(0, 2);
		var colorInt = parseInt(colorString); // This function is for removing leading zeros

		DBS.changeMaterial(roomNumber, faceNumber, colorInt);
	});

	// The menu that updates the material of a specific face in a specific room
	$('#faceMaterial').change(function() {
		var roomNumber = $('#roomToChange').val();
		var faceNumber = $('#faceToChange').val();
		var materialString = ($(this).val()).substring(0, 2);
		var materialInt = parseInt(materialString); // This function is for removing leading zeros

		DBS.changeMaterial(roomNumber, faceNumber, materialInt);
	});

	// The button that adds a new room to the scene
	$('#addRoomButton').click(function() {
		DBS.addRoom();
	});

	// The button that prints the door locations
	$('#printDoorLocations').click(function() {
		DBS.printDoorLocations();
	});

});