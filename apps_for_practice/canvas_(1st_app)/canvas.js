// Assignment 3:

$(document).ready(function(){

	// This function calls a helper function to draw shapes on
	// the canvas when the "drawButton" button is clicked
	$("#drawButton").click(function() {

		var canvas = $("#myCanvas")[0];

		if (canvas.getContext) {
			var ctx = canvas.getContext('2d');

			var shape = $('#shape').find(":selected").val();
			var number = $('#number').find(":selected").val();
			var color = $('#color').find(":selected").val();
			var num = parseInt(number);

			draw(shape, num, color);

		}
	});

	// This function clears the canvas
	$("#clearButton").click(function() {

		var canvas = $("#myCanvas")[0];
		var ctx = canvas.getContext('2d');

		ctx.clearRect(0, 0, canvas.width, canvas.height);

	});
});

// This function determines the color of the shape to be drawn
// and calls the appropriate shape drawing function with the right
// number of times

var shapesSize = 30;

function draw(shape, number, color) {
	var canvas = $("#myCanvas")[0];
	var ctx = canvas.getContext('2d');

	switch(color) {
		case "blue":
			ctx.fillStyle = 'rgb(0, 0, 255)'; // Blue color
			break;
		case "red":
			ctx.fillStyle = 'rgb(255, 0, 0)'; // Red color
			break;
		case "yellow":
			ctx.fillStyle = 'rgb(255, 255, 0)'; // Yellow color
			break;
		default:
			break;
	}

	switch(shape) {
		case "circle":
			// drawCircle(number);
			drawCircleV2(number);
			break;
		case "square":
			// drawSquare(number);
			drawSquareV2(number);
			break;
		case "triangle":
			// drawTriangle(number);
			drawTriangleV2(number);
			break;
		default:
			break;
	}
}

// This function draws a circle "number" times
function drawCircle(number) {
	var canvas = $("#myCanvas")[0];
	var ctx = canvas.getContext('2d');

	for (i = 1; i < number + 1; i++) {
		ctx.beginPath();
		ctx.arc(i * 100, 100, 30, 0, 2*Math.PI);
		ctx.fill();
	}
}

// This function draws a square "number" times
function drawSquare(number) {
	var canvas = $("#myCanvas")[0];
	var ctx = canvas.getContext('2d');

	for (i = 1; i < number + 1; i++) {
		ctx.fillRect(i * 10, i * 10, i * 10, i * 10);
	}
}

// This function draws a triangle "number" times
function drawTriangle(number) {
	var canvas = $("#myCanvas")[0];
	var ctx = canvas.getContext('2d');

	for (i = 1; i < number + 1; i++) {
		ctx.beginPath();
	    ctx.moveTo(i * 80, i * 80);
	    ctx.lineTo((i * 80) + 30 , i * 80);
	    ctx.lineTo((i * 80) + 15, (i * 80) - 30);
	    ctx.fill();
	}
}

/* Assignment 4
* We should get the ImageData object, then look for areas
* where new shapes can be placed: we scan an area for its pixels.
* Only if this area is big enough to hold a specific shape
* and all the pixels in it are white can we draw a new shape in it
*/ 


// This function checks if there is a location where a 20x20 pixels
// square can be placed, by calling a helper function, and if there
// is - the function draws it (for now - it draws a square at every
// location where a square can be placed)
function drawSquareV2(number) {
	var canvas = $("#myCanvas")[0];
	var ctx = canvas.getContext('2d');
	var count = 0;

	var startingPointIsGood = false;
	
	for (var i = 0; i < canvas.width; i++) {
		for (var j = 0; j < canvas.height; j++) {
			startingPointIsGood = checkStartingPoint(i, j);
			if (startingPointIsGood == true) {
				ctx.fillRect(i, j, shapesSize, shapesSize);
				count++;
				if (count == number) return;
			}
		}
	}
}

function drawCircleV2(number) {
	var canvas = $("#myCanvas")[0];
	var ctx = canvas.getContext('2d');
	var count = 0;

	var startingPointIsGood = false;
	
	for (var i = 0; i < canvas.width; i++) {
		for (var j = 0; j < canvas.height; j++) {
			startingPointIsGood = checkStartingPoint(i, j);
			if (startingPointIsGood == true) {
				ctx.beginPath();
				ctx.arc(i + shapesSize/2, j + shapesSize/2, shapesSize/2, 0, 2*Math.PI);
				ctx.fill();
			    count++;
				if (count == number) return;
			}
		}
	}
}

function drawTriangleV2(number) {
	var canvas = $("#myCanvas")[0];
	var ctx = canvas.getContext('2d');
	var count = 0;

	var startingPointIsGood = false;
	
	for (var i = 0; i < canvas.width; i++) {
		for (var j = 0; j < canvas.height; j++) {
			startingPointIsGood = checkStartingPoint(i, j);
			if (startingPointIsGood == true) {
				ctx.beginPath();
			    ctx.moveTo(i, j);
			    ctx.lineTo(i + shapesSize, j);
			    ctx.lineTo(i + shapesSize/2, j + shapesSize);
			    ctx.fill();
			    count++;
				if (count == number) return;
			}
		}
	}
}

// This function checks for 20x20 pixels that are white
// for a square to be placed in it. It checks its red, green
// and blue components

function checkStartingPoint(x, y) {
	var k = 0;
	var l = 0;

	var canvas = $("#myCanvas")[0];
	var ctx = canvas.getContext('2d');
	var myImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

	for (k = 0; k < shapesSize; k++) {
		for (l = 0; l < shapesSize; l++) {
			
			redComponent = myImageData.data[((myImageData.width * (y + l)) + (x + k)) * 4];
			greenComponent = myImageData.data[((myImageData.width * (y + l)) + (x + k)) * 4 + 1];
			blueComponent = myImageData.data[((myImageData.width * (y + l)) + (x + k)) * 4 + 2];
			alphaComponent = myImageData.data[((myImageData.width * (y + l)) + (x + k)) * 4 + 3];

			if (redComponent != 0 || greenComponent != 0 || blueComponent != 0 || alphaComponent != 0) {
				return false;
			}
		}
	}

	return true;
}

// Improvement for this function: checking every 2nd/3rd pixel

// Improvement 2: using the random function