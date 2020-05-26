var canvas, ctx, width, height;
ctx = (canvas = document.getElementsByTagName("canvas")[0]).getContext("2d");
canvas.width = width = 640;
canvas.height = height = 480;
canvas.style = "border:1px solid black;";

var image, a = 0, b = 1, p = 500;

(function(){
	draw();
})()

function alpha(a) {
	return "rgba(0,0,0," + a + ")";
}

function draw() {
	document.getElementsByTagName("input")[0].value = p;
	
	image = ctx.getImageData(0, 0, width, height);
	ctx.clearRect(0, 0, width, height);
	ctx.putImageData(image, -1, 0);
	
	for (var i=0; i<1000; i++) {
		ctx.beginPath();
		ctx.fillStyle = alpha(1/10);
		ctx.arc(width - 2, height/2 + height * noise.simplex2(a / p, b*i / p), 2, 0, Math.PI*2, false);
		ctx.fill();
	}
	
	a += b;
	
	requestAnimationFrame(draw);
}