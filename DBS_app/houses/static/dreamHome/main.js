
var panorama, viewer;
panorama = new PANOLENS.ImagePanorama( 'static/360/redDrapes.jpg' );
viewer = new PANOLENS.Viewer({container: canvasContainer});
viewer.add( panorama );


// Functions to execute as response to buttons/menus
$(document).ready(function(){


	$('#redDrapes').click(function() {
		viewer.remove( panorama );
		newPanorama = new PANOLENS.ImagePanorama( 'static/360/redDrapes.jpg' );
		viewer.add( newPanorama );
		viewer.setPanorama( newPanorama );
	});

	$('#whiteDrapes').click(function() {
		viewer.remove( panorama );
		newPanorama = new PANOLENS.ImagePanorama( 'static/360/whiteDrapes.jpg' );
		viewer.add( newPanorama );
		viewer.setPanorama( newPanorama );
	});

});