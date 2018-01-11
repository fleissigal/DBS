// Functions to execute as response to buttons/menus
$(document).ready(function(){

	$('.viewButton').click(function() {
		view = $(this).val();
		DBS.changeView(view);
		animate();
	});

	$('#updateDimensionButton').click(function() {
		DBS.room1.width = $('#width').val();
		DBS.room1.height = $('#height').val();
		DBS.room1.depth = $('#depth').val();
		DBS.changeShape();
		DBS.animate();
	});

	$('#resetDimensionsButton').click(function() {
		DBS.room1.width = 1;
		DBS.room1.height = 1;
		DBS.room1.depth = 1;
		DBS.changeShape();
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
		color = $(this).val();
		switch($(this).attr('id')) {
			case "face1":
				DBS.room1.face1Color = color;
				break;
			case "face2":
				DBS.room1.face2Color = color;
				break;
			case "face3":
				DBS.room1.face3Color = color;
				break;
			case "face4":
				DBS.room1.face4Color = color;
				break;
			case "face5":
				DBS.room1.face5Color = color;
				break;
			case "face6":
				DBS.room1.face6Color = color;
				break;
			default:
				break;
		}
		DBS.changeShape();
		DBS.animate();
	});

	// $('#canvas').mousemove(function() {
	// 	camera.position.x += ;
	// 	camera.position.y += ;
	// 	// camera.position.z += ;
	// });

});