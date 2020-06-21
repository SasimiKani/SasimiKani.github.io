var c_style = [
	"border:1px solid black;",
	"position:absolute; top:0; left:0;"
];
var canvas, ctx, width, height;
var PI = 3.141592, rad = PI / 180;
ctx = (canvas = document.getElementById("canvas")).getContext("2d");
width = canvas.width = 640;
height = canvas.height = 640;
canvas.style = c_style[1];

function Point(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
	
	this.add = function(p) {
		this.x += p.x;
		this.y += p.y;
		this.z += p.z;
	}
}

function Rx(p, t) {
	t *= rad;
	var s = Math.sin(t);
	var c = Math.cos(t);
	var x = p.x, y = p.y, z = p.z;
	
	return new Point(
		x * 1 + y * 0 + z * 0,
		x * 0 + y * c + z *-s,
		x * 0 + y * s + z * c
	);
}
function Ry(p, t) {
	t *= rad;
	var s = Math.sin(t);
	var c = Math.cos(t);
	var x = p.x, y = p.y, z = p.z;
	
	return new Point(
		y * 0 + z * s + x * c,
		y * 1 + z * 0 + x * 0,
		y * 0 + z * c + x *-s
	);
}
function Rz(p, t) {
	t *= rad;
	var s = Math.sin(t);
	var c = Math.cos(t);
	var x = p.x, y = p.y, z = p.z;
	
	return new Point(
		z * 0 + x * c + y *-s,
		z * 0 + x * s + y * c,
		z * 1 + x * 0 + y * 0
	);
}
function p3d(p0) {
	var v = new Point(0, 0, -1000);
	var screen = -600
	var a = new Point(
		p0.x - v.x,
		p0.y - v.y,
		p0.z - v.z
	);
	return new Point(
		screen * (a.x / a.z),
		screen * (a.y / a.z),
		a.z
	);
}

function Box(o, pos, size) {
	this.p = [];
	this.pos = pos;
	for (var i=-1; i<2; i+=2) {
		for (var j=-1; j<2; j+=2) {
			for (var k=-1; k<2; k+=2) {
				this.p.push(new Point(
					o.x + i * size/2,
					o.y + j * size/2,
					o.z + k * size/2
				));
			}
		}
	}
	
	this.graph = function(tx=0, ty=0, tz=0) {
		var gp = [];
		for (var i in this.p) {
			var p1 = Rz(
				Rx(
					Ry(this.p[i], ty),
				tx),
			tz);
			p1.add(new Point(this.pos.x, this.pos.y, this.pos.z));
			p1 = p3d(p1);
			p1.add(new Point(width/2, height/2, 0));
			gp.push(p1);
		}
		/*
		for (var i in gp) {
			ctx.beginPath();
			ctx.arc(gp[i].x, gp[i].y, 4, 0, Math.PI*2, false);
			ctx.stroke();
		}
		*/
		ctx.beginPath();
		ctx.moveTo(gp[0].x, gp[0].y); 
		ctx.lineTo(gp[1].x, gp[1].y);
		ctx.lineTo(gp[3].x, gp[3].y);
		ctx.lineTo(gp[2].x, gp[2].y);
		ctx.lineTo(gp[0].x, gp[0].y); 
		ctx.lineTo(gp[4].x, gp[4].y); 
		ctx.lineTo(gp[5].x, gp[5].y); 
		ctx.lineTo(gp[7].x, gp[7].y);
		ctx.lineTo(gp[6].x, gp[6].y);
		ctx.lineTo(gp[4].x, gp[4].y);
		ctx.stroke();
		for (var i=1; i<4; i++) {
			ctx.beginPath();
			ctx.moveTo(gp[0 + i].x, gp[0 + i].y); 
			ctx.lineTo(gp[4 + i].x, gp[4 + i].y);
			ctx.stroke();
		}
	}
}
function createBox(o, pos, size) {
	if (o == null || pos == null || size == null) {
		return null;
	} else {
		return new Box(o, pos, size);
	}
}

const box_size = 120; // 立方体のサイズ
const isRotation = true; // 動く？
const background_color = "black";

var box = [];
var a = [0, 0, 0];

(function() {
	for (var x=-2; x<=2; x++) {
		for (var y=-2; y<=2; y++) {
			box.push(createBox(new Point(0, 0, 0), new Point(x * 200, y * 200, 0), box_size));
		}
	}
	ctx.fillStyle = "white";
	ctx.strokeStyle = "#004";
	aaa();
})();

function aaa() {
	if (ctx.fillStyle != "#000000") {
		ctx.fillRect(0, 0, width, height);
	} else {
		ctx.clearRect(0, 0, width, height);
	}
	for (var i in box) {
		var c = parseInt(i / 5, 10) - 2;
		var r = i % 5 - 2;
		box[i].graph(a[0] + 10 * r, a[1] - 10 * c, a[2]);
	}
	if (isRotation) a = a.map(val => val += 0.4);
	
	requestAnimationFrame(aaa);
}