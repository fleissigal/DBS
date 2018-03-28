
// Functions to execute as response to buttons/menus
$(document).ready(function(){

	// The default price for the base house
	var basePrice = 100000;
	$('#price').html(basePrice);

	// This function changes the image in the canvas when the user clicks on one of the dropdown menu options
	$('.dropDownMenu').change(function() {
		var imageName = $('#roomInfo').attr('houseID') + "-" + $('#roomInfo').attr('floorID') + "-" + $('#roomInfo').attr('roomID');
		var selecedValuePrice 

		var selectedValue = $(this)[0].options[$(this)[0].selectedIndex].id;
		var selecedValuePrice = parseInt($('#' + selectedValue).attr("optionPrice"));
		var newPrice = parseInt($('#price').html()) + selecedValuePrice;
		$('#price').html(newPrice);

		$('.dropDownMenu').each(function() {
			var ddSelectedValue = $(this)[0].options[$(this)[0].selectedIndex].id;
			var ddSelectedValueID = $('#' + ddSelectedValue).attr("optionID");
			imageName += "-";
			imageName += ddSelectedValueID;

		});

		// Replaces the image with the new image
		viewer.remove( panorama );
		var imageToLoad = '/static/360/' + imageName + '.jpg';

		if (urlExists(imageToLoad)) {
          	newPanorama = new PANOLENS.ImagePanorama( imageToLoad );
        	viewer.add( newPanorama );
			viewer.setPanorama( newPanorama );

        } else {
        	alert("The configuration \"" + imageName + "\" does not exist in the database");
        }

        $.ajax({
	        url: "/saveConfiguration2/",
	        type : 'GET',
	        data : { 'username': $(this).attr('username'),
	        		'housePlan': $('#roomInfo').attr('houseID'),
	        		'floorPlan': $('#roomInfo').attr('floorID'),
	        		'roomPlan': $('#roomInfo').attr('roomID'),
	        		'option': $(this).val() },
	        dataType: 'json',
	        success : function(json) {}
	    });

	});

	// This function loads the page with the default room image and the room dropdown menus (option types)  when the user
	// clicks on one of the room buttons
	$('.room').click(function() {

		if ($(this).attr('username')) {
			moveToRoom($(this).attr('houseID'), $(this).attr('floorID'), $(this).attr('roomID'));
		} else {
			var input = confirm('You are not logged-in and therefore the changes will not get saved. Are you sure you want to continue?');
			if (input) {
				moveToRoom($(this).attr('houseID'), $(this).attr('floorID'), $(this).attr('roomID'));
			} else {
				return;
			}
		}

	});

	function moveToRoom(houseID, floorID, roomID) {
		// constructing the new url to load with a GET request, with the right data
		// Whenever there are no options in the url, the image with the default options is being loaded
		var newUrl = 'http://localhost:8000/configurator/housePlan=' + $(this).attr('houseID') + '/floorPlan='
			+ $(this).attr('floorID') + '/roomPlan=' + $(this).attr('roomID');

		window.location.href = newUrl;
	}

	// This function presents the uploaded image in the canvas
	$('#submitImage').submit(function() {

		fileName = $('#fileInput').val().replace(/.*[\/\\]/, '');
		Cookies.set('uploadedImage', 'static/media/' + fileName);

	});


	$('#shareRoom').click(function() {

		var newUrl = 'http://localhost:8000/configurator/housePlan=' + $('#roomInfo').attr('houseID') + '/floorPlan='
			+ $('#roomInfo').attr('floorID') + '/roomPlan=' + $('#roomInfo').attr('roomID') + '/?';

		$('.dropDownMenu').each(function() {
			var selectedValue = $(this)[0].options[$(this)[0].selectedIndex].id;
			var selectedValueID = $('#' + selectedValue).attr("optionID");
			newUrl += "&option=" + selectedValueID;

		});

	    prompt("Copy and paste the link below", newUrl);

	});

	$('.option').change(function() {
			console.log(444);

			$.get('saveConfiguration2/', {username: $(this).attr('username')}, function(data){});

		// $.ajax({
	 //        url: "/saveConfiguration2/",
	 //        type : 'GET',
	 //        data : {},
	 //        // data : { 'username': $(this).attr('username'),
	 //        // 		'housePlan': $('#roomInfo').attr('houseID'),
	 //        // 		'floorPlan': $('#roomInfo').attr('floorID'),
	 //        // 		'roomPlan': $('#roomInfo').attr('roomID'),
	 //        // 		'option': $(this).attr('optionID') },
	 //        dataType: 'json',
	 //        success : function(json) {
	 //            // $("#request-access").hide();
	 //            // console.log("requested access complete");
	 //        }
	 //    });

	});

});

function urlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);	
    http.send();
    return http.status!=404;
}




