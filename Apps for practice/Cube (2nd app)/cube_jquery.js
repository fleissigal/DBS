// Functions to execute as response to buttons/menus
$(document).ready(function(){

	$('.viewButton').click(function() {
		view = $(this).val();
		DBS.changeView(view);
		animate();
	});

	$('#updateDimensionButton').click(function() {
		var roomNumber = $('#roomToChange').val();
		DBS.changeDimensions(roomNumber, $('#width').val(), $('#height').val(), $('#depth').val());
		DBS.animate();
	});

	$('#resetDimensionsButton').click(function() {
		var roomNumber = $('#roomToChange').val();
		DBS.changeDimensions(roomNumber, 1, 1, 1);
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


	$('#faceColor').change(function() {
		var roomNumber = $('#roomToChange').val();
		var faceNumber = $('#faceToChange').val();
		var color = $(this).val();
		var colorNumber;

		switch (color) {
			case "white":
				colorNumber = "0";
				break;
			case "blue":
				colorNumber = "1";
				break;
			case "yellow":
				colorNumber = "2";
				break;
			case "red":
				colorNumber = "3";
				break;
			case "green":
				colorNumber = "4";
				break;
			case "orange":
				colorNumber = "5";
				break;
			case "purple":
				colorNumber = "6";
				break;
			case "gray":
				colorNumber = "7";
				break;
			default: break;
		}

		DBS.changeColors(roomNumber, faceNumber, colorNumber);
		DBS.animate();
	});

	$('#faceMaterial').change(function() {
		var roomNumber = $('#roomToChange').val();
		var faceNumber = $('#faceToChange').val();
		var material = $(this).val();
		var materialNumber;

		switch (material) {
			case "woodenFloor":
				materialNumber = "8";
				break;
			case "carpet":
				materialNumber = "9";
				break;
			case "stoneFloor":
				materialNumber = "10";
				break;
			case "blackRoof":
				materialNumber = "11";
				break;
			case "redRoof":
				materialNumber = "12";
				break;
			case "roundTileRoof":
				materialNumber = "13";
				break;
			case "whiteWall":
				materialNumber = "14";
				break;
			case "stoneWall":
				materialNumber = "15";
				break;
			case "brickWall":
				materialNumber = "16";
				break;
			default: break;
		}

		DBS.changeMaterial(roomNumber, faceNumber, materialNumber);
		DBS.animate();
	});

	$('.addRoomButton').click(function() {
		DBS.addRoom();
		DBS.animate();
	});
	

});