let socket;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(51);

	socket = io.connect('http://localhost:3000');
	socket.on('mouse', newDrawing);
}

function newDrawing(data) {
	noStroke();
	ellipse(data.x, data.y, 36, 36);
	fill(255);
}

function mouseDragged() {
	console.log('Sending: ' + mouseX + ',' + mouseY);

	let data = {
		x: mouseX,
		y: mouseY,
	}
	socket.emit('mouse', data);

	noStroke();
	ellipse(mouseX, mouseY, 36, 36);
	fill(255);
}

function draw() {

}
