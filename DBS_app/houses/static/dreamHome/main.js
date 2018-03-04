
var panorama, viewer;
panorama = new PANOLENS.ImagePanorama( 'static/360/kitchenBlueCabinets.jpg' );
viewer = new PANOLENS.Viewer({ container: canvasContainer });
viewer.add( panorama );

var basePrice = 100000;
$('#price').html("$" + basePrice);


// Functions to execute as response to buttons/menus
$(document).ready(function(){


	$('#gridRadio').click(function(){
	    if ($('#kitchenGrid').is(':checked'))
	    {

		// Replaces the image with the new image
		viewer.remove( panorama );
		newPanorama = new PANOLENS.ImagePanorama( 'static/360/kitchenBlueCabinets.jpg' );
		viewer.add( newPanorama );
		viewer.setPanorama( newPanorama );
		// Updates the price
		redDrapesPrice = 1000; // In the future we will get this piece of data from the database
		newPrice = basePrice + redDrapesPrice;
		$('#price').html("$" + newPrice);

		$('#dd').html(
			"<h1>Options</h1>"
	        +"<div class=\"dropdown\">"
	          +"<button class=\"btn btn-primary dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">Cabinet Options"
	          +"<span class=\"caret\"></span></button>"
	          +"<ul class=\"dropdown-menu\">"
	            +"<li><a class=\"dropdown-item\" id=\"blueCabinets\">Blue Cabinets</a></li>"
	            +"<li><a class=\"dropdown-item\" id=\"silverCabinets\">Silver Cabinets</a></li>"
	          +"</ul>"
	        +"</div>"
		);

	    }

	    if ($('#livingroomGrid').is(':checked'))
	    {


		// Replaces the image with the new image
		viewer.remove( panorama );
		newPanorama = new PANOLENS.ImagePanorama( 'static/360/livingroomRedDrapes.jpg' );
		viewer.add( newPanorama );
		viewer.setPanorama( newPanorama );
		// Updates the price
		redDrapesPrice = 1000; // In the future we will get this piece of data from the database
		newPrice = basePrice + redDrapesPrice;
		$('#price').html("$" + newPrice);

		$('#dd').html(
			"<h1>Options</h1>"
            +"<div class=\"dropdown\">"
              +"<button class=\"btn btn-primary dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">Drape Options"
              +"<span class=\"caret\"></span></button>"
              +"<ul class=\"dropdown-menu\">"
                +"<li><a class=\"dropdown-item\" id=\"redDrapes\">Red Drapes</a></li>"
                +"<li><a class=\"dropdown-item\" id=\"whiteDrapes\">White Drapes</a></li>"
              +"</ul>"
            +"</div>"
		);

		}


	    if ($('#bedroomGrid').is(':checked'))
	    {
	    	viewer.remove( panorama );
			$('#dd').html("");

	    }


	    if ($('#bathroomGrid').is(':checked'))
	    {
	    	viewer.remove( panorama );
			$('#dd').html("");
	    }


	    if ($('#masterbedroomGrid').is(':checked'))
	    {
	    	viewer.remove( panorama );
			$('#dd').html("");
	    }

	});


	// Red drapes option in the dropdown menu
	$('#redDrapes').click(function() {
		// Replaces the image with the new image
		viewer.remove( panorama );
		newPanorama = new PANOLENS.ImagePanorama( 'static/360/livingroomRedDrapes.jpg' );
		viewer.add( newPanorama );
		viewer.setPanorama( newPanorama );
		// Updates the price
		redDrapesPrice = 1000; // In the future we will get this piece of data from the database
		newPrice = basePrice + redDrapesPrice;
		$('#price').html("$" + newPrice);

	});

	$('#whiteDrapes').click(function() {
		// Replaces the image with the new image
		viewer.remove( panorama );
		newPanorama = new PANOLENS.ImagePanorama( 'static/360/livingroomWhiteDrapes.jpg' );
		viewer.add( newPanorama );
		viewer.setPanorama( newPanorama );
		// Updates the price
		whiteDrapesPrice = 2000; // In the future we will get this piece of data from the database
		newPrice = basePrice + whiteDrapesPrice;
		$('#price').html("$" + newPrice);

	});

	$('#blueCabinets').click(function() {
		// Replaces the image with the new image
		viewer.remove( panorama );
		newPanorama = new PANOLENS.ImagePanorama( 'static/360/kitchenBlueCabinets.jpg' );
		viewer.add( newPanorama );
		viewer.setPanorama( newPanorama );
		// Updates the price
		blueCabinets = 1500; // In the future we will get this piece of data from the database
		newPrice = basePrice + blueCabinets;
		$('#price').html("$" + newPrice);

	});

	$('#silverCabinets').click(function() {
		// Replaces the image with the new image
		viewer.remove( panorama );
		newPanorama = new PANOLENS.ImagePanorama( 'static/360/kitchenSilverCabinets.jpg' );
		viewer.add( newPanorama );
		viewer.setPanorama( newPanorama );
		// Updates the price
		silverCabinets = 1800; // In the future we will get this piece of data from the database
		newPrice = basePrice + silverCabinets;
		$('#price').html("$" + newPrice);

	});

});