function draw() {

	var canvas = document.getElementById('myCanvas');

	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');

		// Squares
		ctx.fillStyle = 'rgb(0, 0, 255)'; // Blue color
		ctx.fillRect(10, 10, 10, 10);

		ctx.fillStyle = 'rgb(255, 0, 0)'; // Red color
		ctx.fillRect(20, 20, 20, 20);

		ctx.fillStyle = 'rgb(255, 255, 0)'; // Yellow color
		ctx.fillRect(30, 30, 30, 30);

		// Triangle
		ctx.beginPath();
	    ctx.moveTo(75, 50);
	    ctx.lineTo(100, 75);
	    ctx.lineTo(100, 25);
	    ctx.fill();

	    // Circle
		var circle = new Path2D();
		circle.moveTo(100, 100);
		circle.arc(100, 35, 25, 0, 2*Math.PI);
		ctx.fill(circle);

	}
}

function drawCircle(ctx, color, number) {

}

function drawSquare(ctx, color, number) {

}

function drawTriangle(ctx, color, number) {

}