var canvas, ctx, width, height;
ctx = (canvas = document.getElementById("canvas")).getContext("2d");
canvas.width  = width  = 640 * 1.5;
canvas.height = height = 480 * 1.5;
canvas.style = "border:1px solid black;";

(function() {
	init();
	aaa();
})();

var a, r, trX, trY, fontSize;
var angX, angY, angZ
var size;
var center;

function getFontSize() {
	return parseInt(ctx.font.split("px"));
}

function translate(x, y) {
	ctx.translate(-trX, -trY);
	ctx.translate(x, y);
	trX = x;
	trY = y;
}
function turn(t) {
	ctx.rotate(-r * rad);
	ctx.rotate(t * rad);
	r = t;
}
function turnText(t, str, x, y) {
	turn(0);
	translate(width/2 + x, height/2 + y);
	turn(t);
	ctx.fillText(str, -getFontSize()/2, getFontSize()/2);
}

function init() {
	a = -5;
	r = 0;
	angX = Math.random()*360 * 0 + -80, 
	angY = Math.random()*360 * 0 + 0, 
	angZ = Math.random()*360 * 0 + 0;
	M = 300;
	size = 200;
	center = new Point(0, 0, 0);
	fontSize = 40;
	ctx.font = fontSize + "px sans-serif";
	translate(width/2, height/2);
	
	document.getElementById("text").value = "頭が悪くてもプログラミングはできる";
}

function aaa() {
	var s = document.getElementById("text").value;
	var len = s.length;
	
	ctx.fillStyle = "#0006";
	ctx.beginPath();
	turn(0);
	ctx.fillRect(-width, -height, width*2, height*2);
	
	ctx.fillStyle = "#fff";
	for (var i=0; i<len; i++) {
		var th = (360 / len) * i;
		var c = s[i];
		
		var p = new Point(
			size * -Math.cos(th * rad * 1) * 1,
			size *  Math.sin(th * rad * 1) * 1,
			size *  Math.sin(th * rad * 1) * 0
		);
		var pos = p;
		
		// 回転
		pos = r3d("z", center, pos, a * 1);
		pos = r3d("x", center, pos, a * 0);
		pos = r3d("y", center, pos, a * 0);
		
		// 固定
		pos = r3d("z", center, pos, angZ);
		pos = r3d("x", center, pos, angX);
		pos = r3d("y", center, pos, angY);
		
		ctx.font = fontSize + "px sans-serif";
		var dsize = dSize(pos, getFontSize());
		ctx.font = dsize + "px sans-serif";
		
		pos = p3d(pos, getFontSize()/2, getFontSize()/2);
		
		turn(0);
		translate(width/2, height/2);
		turnText(a + th, c, pos.x + getFontSize()/2, pos.y);
	}
	
	a += 1;
	
	requestAnimationFrame(aaa);
}