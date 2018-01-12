// Functions to execute as response to buttons/menus
$(document).ready(function(){

	$('.viewButton').click(function() {
		view = $(this).val();
		DBS.changeView(view);
		animate();
	});

	$('#updateDimensionButton').click(function() {
		// DBS.room1.width = ;
		// DBS.room1.height = ;
		// DBS.room1.depth = ;
		DBS.changeDimensions($('#width').val(), $('#height').val(), $('#depth').val());
		DBS.animate();
	});

	$('#resetDimensionsButton').click(function() {
		// DBS.room1.width = 1;
		// DBS.room1.height = 1;
		// DBS.room1.depth = 1;
		DBS.changeDimensions(1, 1, 1);
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
		DBS.setup.camera.position.x = 0;
		DBS.setup.camera.position.y = 3;
		DBS.setup.camera.position.z = 9;
		DBS.animate();
	});

	$('.faceMenu').change(function() {
		var color = $(this).val();
		var id = $(this).attr('id');

		DBS.changeColors(id, color);
		DBS.animate();
	});

	// $('#canvas').mousemove(function() {
	// 	camera.position.x += ;
	// 	camera.position.y += ;
	// 	// camera.position.z += ;
	// });

});