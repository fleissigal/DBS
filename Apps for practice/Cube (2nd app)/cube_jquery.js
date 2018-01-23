// Functions to execute as response to buttons/menus
$(document).ready(function(){

	$('.viewButton').click(function() {
		view = $(this).val();
		DBS.changeView(view);
	});

	$('#updateDimensionButton').click(function() {
		var roomNumber = $('#roomToChange').val();
		DBS.changeDimensions(roomNumber, $('#width').val(), $('#height').val(), $('#depth').val());
	});

	$('#resetDimensionsButton').click(function() {
		var roomNumber = $('#roomToChange').val();
		DBS.changeDimensions(roomNumber, 1, 1, 1);
	});

	
	$('#updateZoomButton').click(function() {
		var zoom = $('#zoom').val();
		DBS.setup.camera.fov = zoom;
		DBS.setup.camera.updateProjectionMatrix();
	});

	$('#resetZoomButton').click(function() {
		DBS.setup.camera.fov = 50;
		DBS.setup.camera.updateProjectionMatrix();
	});


	$('#updatePanButton').click(function() {
		var pan = $('#pan').val() / 10;
		DBS.setup.camera.position.x = pan;
		DBS.setup.camera.position.y = pan;
		DBS.setup.camera.position.z = pan;
	});


	$('#resetPanButton').click(function() {
		DBS.changeView("side");
	});


	$('#faceColor').change(function() {
		var roomNumber = $('#roomToChange').val();
		var faceNumber = $('#faceToChange').val();
		var colorString = ($(this).val()).substring(0, 2);
		var colorInt = parseInt(colorString); // This function is for removing leading zeros

		DBS.changeMaterial(roomNumber, faceNumber, colorInt);
	});

	$('#faceMaterial').change(function() {
		var roomNumber = $('#roomToChange').val();
		var faceNumber = $('#faceToChange').val();
		var materialString = ($(this).val()).substring(0, 2);
		var materialInt = parseInt(materialString); // This function is for removing leading zeros

		DBS.changeMaterial(roomNumber, faceNumber, materialInt);
	});

	$('.addRoomButton').click(function() {
		DBS.addRoom();
	});
	

});