
// Functions to execute as response to buttons/menus
$(document).ready(function(){

	var basePrice = 100000;
	$('#price').html("$" + basePrice);


	$('.option').click(function() {
		// Replaces the image with the new image
		var imageName = String($(this).attr('id'));
		viewer.remove( panorama );
		newPanorama = new PANOLENS.ImagePanorama( '/static/360/' + imageName + '.jpg' );
		viewer.add( newPanorama );
		viewer.setPanorama( newPanorama );

	});

	$('.room').change(function() {

		var newUrl = 'http://localhost:8000/configurator/housePlan=' + $(this).attr('houseID') + '/floorPlan='
			+ $(this).attr('floorID') + '/roomPlan=' + $(this).attr('roomID') + '/option=1/';

		window.location.href = newUrl;


	});

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






