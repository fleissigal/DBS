
// Functions to execute as response to buttons/menus
$(document).ready(function(){

	// The default price for the base house
	var basePrice = 100000;
	$('#price').html("$" + basePrice);

	// This function changes the image in the canvas when the user clicks on one of the dropdown menu options
	$('.dropDownMenu').change(function() {
		// var imageName = $(this)[0].options[$(this)[0].selectedIndex].id;
		var imageName = $('#roomInfo').attr('houseID') + "-" + $('#roomInfo').attr('floorID') + "-" + $('#roomInfo').attr('roomID');

		$('.dropDownMenu').each(function() {
			var selectedValue = $(this)[0].options[$(this)[0].selectedIndex].id;
			var selectedValueID = $('#' + selectedValue).attr("optionID");
			imageName += "-";
			imageName += selectedValueID;

		});

		// Replaces the image with the new image
		viewer.remove( panorama );
		newPanorama = new PANOLENS.ImagePanorama( '/static/360/' + imageName + '.jpg' );
		// TODO: add that if no such photo exists, show an error message
		viewer.add( newPanorama );
		viewer.setPanorama( newPanorama );

	});

	// This function loads the page with the default room image and the room dropdown menus (option types)  when the user
	// clicks on one of the room buttons
	$('.room').change(function() {

		// constructing the new url to load with a GET request, with the right data
		var newUrl = 'http://localhost:8000/configurator/housePlan=' + $(this).attr('houseID') + '/floorPlan='
			+ $(this).attr('floorID') + '/roomPlan=' + $(this).attr('roomID'); // Whenever there are no options in the url, the image with the default options is being loaded

		window.location.href = newUrl;

	});

	// This function presents the uploaded image in the canvas
	$('#submitImage').submit(function() {

		fileName = $('#fileInput').val().replace(/.*[\/\\]/, '');
		Cookies.set('uploadedImage', 'static/media/' + fileName);

	});

	//
	$('#shareRoom').click(function() {

		var newUrl = 'http://localhost:8000/configurator/housePlan=' + $('#roomInfo').attr('houseID') + '/floorPlan='
			+ $('#roomInfo').attr('floorID') + '/roomPlan=' + $('#roomInfo').attr('roomID') + '/?';

		$('.dropDownMenu').each(function() {
			var selectedValue = $(this)[0].options[$(this)[0].selectedIndex].id;
			var selectedValueID = $('#' + selectedValue).attr("optionID");
			newUrl += "&option=" + selectedValueID;

		});

		alert("Copy and paste the following link to share it:\n\n" + newUrl);

	});

});

function urlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}



