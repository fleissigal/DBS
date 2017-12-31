// function draw() {
// 	document.write(5);
// }
$(document).ready(function(){

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
});

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
			drawCircle(number);
			break;
		case "square":
			drawSquare(number);
			break;
		case "triangle":
			drawTriangle(number);
			break;
		default:
			break;
	}
}

function drawCircle(number) {
	var canvas = $("#myCanvas")[0];
	var ctx = canvas.getContext('2d');

	for (i = 1; i < number + 1; i++) {
		ctx.beginPath();
		ctx.arc(i * 100, 100, 30, 0, 2*Math.PI);
		ctx.fill();
	}
}

function drawSquare(number) {
	var canvas = $("#myCanvas")[0];
	var ctx = canvas.getContext('2d');

	for (i = 1; i < number + 1; i++) {
		ctx.fillRect(i * 10, i * 10, i * 10, i * 10);
	}
}

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
