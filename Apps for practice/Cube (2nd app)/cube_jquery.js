// Functions to execute as response to buttons/menus
$(document).ready(function(){

	$('.viewButton').click(function() {
		view = $(this).val();
		DBS.changeView(view);
		animate();
	});

	$('#updateDimensionButton').click(function() {
		var roomName = $('#roomMenu').val();
		DBS.changeDimensions(roomName, $('#width').val(), $('#height').val(), $('#depth').val());
		DBS.animate();
	});

	$('#resetDimensionsButton').click(function() {
		var roomName = $('#roomMenu').val();
		DBS.changeDimensions(roomName, 1, 1, 1);
		DBS.animate();
	});

	
	$('#updateZoomButton').click(function() {
		var zoom = $('#zoom').val();
		DBS.setup.camera.fov = zoom;
		DBS.setup.camera.updateProjectionMatrix();
		DBS.animate();
	});

	$('#resetZoomButton').click(function() {
		DBS.setup.camera.fov = 50;
		DBS.setup.camera.updateProjectionMatrix();
		DBS.animate();
	});


	$('#updatePanButton').click(function() {
		var pan = $('#pan').val() / 10;
		DBS.setup.camera.position.x = pan;
		DBS.setup.camera.position.y = pan;
		DBS.setup.camera.position.z = pan;
		DBS.animate();
	});


	$('#resetPanButton').click(function() {
		DBS.changeView("side");
		DBS.animate();
	});

	$('.faceMenu').change(function() {
		var roomName = $('#roomMenu').val();
		var color = $(this).val();
		var faceNumber = $(this).attr('id');

		DBS.changeColors(roomName, faceNumber, color);
		DBS.animate();
	});

	$('.addRoomButton').click(function() {
		DBS.addRoom();
		DBS.animate();
	});

	

});