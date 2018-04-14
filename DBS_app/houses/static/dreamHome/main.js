
// Functions to execute as response to buttons/menus
$(document).ready(function(){

	$('#price').html();

	// This function changes the image in the canvas when the user clicks on one of the dropdown menu options
	$('.dropDownMenu').change(function() {
		var imageName = $('#roomInfo').attr('houseID') + "-" + $('#roomInfo').attr('floorID') + "-" + $('#roomInfo').attr('roomID');
		var selectedValue = $(this)[0].options[$(this)[0].selectedIndex].id;
		var selecedValuePrice = parseInt($('#' + selectedValue).attr("optionPrice"));

		// Requires ordering the dropdown menus by increasing option ID's order
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
	        url : "/saveConfig/",
	        type : 'POST',
	        data : {
	        		'username': $('#roomInfo').attr('username'),
	        		'housePlan': $('#roomInfo').attr('houseID'),
	        		'floorPlan': $('#roomInfo').attr('floorID'),
	        		'roomPlan': $('#roomInfo').attr('roomID'),
	        		'option': $(this).val(),
	        		'price': $('#price').html(),
	        		},
	        dataType: 'json',
	        success : function(response) {
	       		$('#price').html(response.price);
	        },
	    });

	});


	$('#summary').click(function() {


		$.ajax({
	        url : "/summary/",
	        type : 'POST',
	        data : {
	        		'username': $('#roomInfo').attr('username'),
	        		'housePlan': $('#roomInfo').attr('houseID'),
	        		'floorPlan': $('#roomInfo').attr('floorID'),
	        		'roomPlan': $('#roomInfo').attr('roomID'),
	        		},
	        dataType: 'json',
	        success : function(response) {

	        	var options = JSON.parse(response.options);

				var list = "<ul>";

				for (var i = 0; i < options.length ; i++) {
					list += "<li>" + options[i].fields['name'] + " - $" + options[i].fields['price'] + "</li>";
				}

				list += "</ul>";

				$('#optionsSummary').html(list);

	        },
	    });

	});

	// Sending CSRF token with the ajax jquery call
	$.ajaxSetup({
	    beforeSend: function(xhr, settings) {
	        if (settings.type == 'POST' || settings.type == 'PUT' || settings.type == 'DELETE') {
	            function getCookie(name) {
	                var cookieValue = null;
	                if (document.cookie && document.cookie != '') {
	                    var cookies = document.cookie.split(';');
	                    for (var i = 0; i < cookies.length; i++) {
	                        var cookie = jQuery.trim(cookies[i]);
	                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                            break;
	                        }
	                    }
	                }
	                return cookieValue;
	            }
	            if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
	                // Only send the token to relative URLs i.e. locally.
	                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
	            }
	        }
	    }
	});


	// This function loads the page with the default room image and the room dropdown menus (option types) when the user
	// clicks on one of the room buttons
	$('.room').click(function() {

		var username = $(this).attr('username');
		var houseID = $(this).attr('houseID');
		var floorID = $(this).attr('floorID');
		var roomID = $(this).attr('roomID');

		if ($('#roomInfo').attr('viewerMode') == "false") {
			moveToRoom(username, houseID, floorID, roomID, "configurator");
		} else {
			var input = confirm('You are currently in viewer mode and therefore your changes will not get saved. Are you sure you want to continue?');
			if (input) {
				moveToRoom(username, houseID, floorID, roomID, "viewer");
			} else {
				return;
			}
		}

	});

	// Go to the clicked room in the right mode
	function moveToRoom(user, houseID, floorID, roomID, mode) {

		username = "";
		if (mode == "configurator") {
			username = '/' + user;
		}

		// constructing the new url to load with a GET request, with the right data
		// Whenever there are no options in the url, the image with the default options is being loaded
		var newUrl = 'http://localhost:8000/' + mode + username + '/housePlan=' + houseID + '/floorPlan='
			+ floorID + '/roomPlan=' + roomID;

		window.location.href = newUrl;
	}

	// This function presents the uploaded image in the canvas
	$('#submitImage').submit(function() {

		fileName = $('#fileInput').val().replace(/.*[\/\\]/, '');
		Cookies.set('uploadedImage', 'static/media/' + fileName);

	});

	// Sharing the room URL
	$('#shareRoom').click(function() {

		var newUrl = 'http://localhost:8000/viewer/housePlan=' + $('#roomInfo').attr('houseID') + '/floorPlan='
			+ $('#roomInfo').attr('floorID') + '/roomPlan=' + $('#roomInfo').attr('roomID') + '/?';

		$('.dropDownMenu').each(function() {
			var selectedValue = $(this)[0].options[$(this)[0].selectedIndex].id;
			var selectedValueID = $('#' + selectedValue).attr("optionID");
			newUrl += "&option=" + selectedValueID;

		});

	    prompt("Copy and paste the link below", newUrl);

	});

});

function urlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);	
    http.send();
    return http.status!=404;
}




