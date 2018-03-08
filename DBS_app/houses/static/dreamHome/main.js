
// Functions to execute as response to buttons/menus
$(document).ready(function(){

	// The default price for the base house
	var basePrice = 100000;
	$('#price').html("$" + basePrice);

	// This function changes the image in the canvas when the user clicks on one of the dropdown menu options
	$('.option').click(function() {
		var imageName = String($(this).attr('id'));
		// Replaces the image with the new image
		viewer.remove( panorama );
		newPanorama = new PANOLENS.ImagePanorama( '/static/360/' + imageName + '.jpg' );
		viewer.add( newPanorama );
		viewer.setPanorama( newPanorama );

	});

	// This function loads the page with the default room image and the room dropdown menus (option types)  when the user
	// clicks on one of the room buttons
	$('.room').change(function() {

		// constructing the new url to load with a GET request, with the right data
		var newUrl = 'http://localhost:8000/configurator/housePlan=' + $(this).attr('houseID') + '/floorPlan='
			+ $(this).attr('floorID') + '/roomPlan=' + $(this).attr('roomID') + '/option=1/';

		window.location.href = newUrl;

	});

	// This function presents the uploaded image in the canvas
	$('#submitImage').submit(function() {
		fileName = $('#fileInput').val().replace(/.*[\/\\]/, '');
		Cookies.set('uploadedImage', 'static/media/' + fileName);

	});

		// $.get( newUrl, function( data ) {
		//   $( "body" ).html( data );
		// });

		// $.ajax(newUrl, {
		//     type: 'get',
		//     // data: { subject_id: subject_id },
		//     dataType: 'html',
		//     success : function(html) {
		//  		$( "body" ).html( html );
		//     },
		//     error: function() {
		//         alert("Error");
		//     }
		// });


		// $.get({
		//     method: 'GET',
		//     url: 'index.html',
		//     // headers: {
		//     //     'Content-Type': 'application/json',
		//     // },
		//     // query parameters go under "data" as an Object
		//     data: {
		//         housePlan: $(this).attr('houseID'),
		//         floorPlan: $(this).attr('floorID'),
		//     }
		// });

});






