
var panorama, viewer;
panorama = new PANOLENS.ImagePanorama( 'static/360/redDrapes.jpg' );
viewer = new PANOLENS.Viewer({container: canvasContainer});
viewer.add( panorama );

var basePrice = 100000;
$('#price').html(basePrice);


// Functions to execute as response to buttons/menus
$(document).ready(function(){

	// Red drapes option in the dropdown menu
	$('#redDrapes').click(function() {
		// Replaces the image with the new image
		viewer.remove( panorama );
		newPanorama = new PANOLENS.ImagePanorama( 'static/360/redDrapes.jpg' );
		viewer.add( newPanorama );
		viewer.setPanorama( newPanorama );
		// Updates the price
		redDrapesPrice = 1000; // In the future we will get this piece of data from the database
		$('#price').html(basePrice + redDrapesPrice);
	});

	$('#whiteDrapes').click(function() {
		// Replaces the image with the new image
		viewer.remove( panorama );
		newPanorama = new PANOLENS.ImagePanorama( 'static/360/whiteDrapes.jpg' );
		viewer.add( newPanorama );
		viewer.setPanorama( newPanorama );
		// Updates the price
		whiteDrapesPrice = 2000; // In the future we will get this piece of data from the database
		$('#price').html(basePrice + whiteDrapesPrice);
	});

});