var PI = Math.PI;
var rad = PI / 180;
var M = 300;
var Point = function(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
};

// xyz : ("x" | 0) | ("y" | 1) | ("z" | 2)
// po : center as Point
// p : position as Point
// t : angle as degree
var r3d = function(xyz, po, p, t) {
	var x = p.x - po.x;
	var y = p.y - po.y;
	var z = p.z - po.z;
	
	var s = Math.sin(t * rad);
	var c = Math.cos(t * rad);
	
	var pos;
	
	switch (xyz) {
	case "x":
	case "X":
	case 0:
		pos = new Point(
			x * 1 + y * 0 + z * 0,
			x * 0 + y * -c + z * s,
			x * 0 + y * s + z * c
		);
		break;
	case "y":
	case "Y":
	case 1:
		var pos = new Point(
			y * 0 + z * s + x * c,
			y * 1 + z * 0 + x * 0,
			y * 0 + z * -c + x * s
		);
		break;
	case "z":
	case "Z":
	case 2:
		var pos = new Point(
			z * 0 + x * -c + y * s,
			z * 0 + x * s + y * c,
			z * 1 + x * 0 + y * 0
		);
		break;
	}
	
	return pos;
}
var p3d = function(pos, offsetX = 0, offsetY = 0) {
	var p = pos;
	pos.x = p.x * M / (p.z + M) + offsetX;
	pos.y = p.y * M / (p.z + M) + offsetY;
	return pos;
}
var dSize = function(pos, size) {
	return ((pos.x * M / (pos.z + M)) - (pos.x - size/2) * M / (pos.z + M)) * 2
}

var Rx = function(po, p, t) {
	var x = p.x - po.x;
	var y = p.y - po.y;
	var z = p.z - po.z;
	
	var s = Math.sin(t * rad);
	var c = Math.cos(t * rad);
	
	var pos = new Point(
		x * 1 + y * 0 + z * 0,
		x * 0 + y * -c + z * s,
		x * 0 + y * s + z * c
	);
	
	return pos;
};
var Ry = function(po, p, t) {
	var x = p.x - po.x;
	var y = p.y - po.y;
	var z = p.z - po.z;
	
	var s = Math.sin(t * rad);
	var c = Math.cos(t * rad);
	
	var pos = new Point(
		y * 0 + z * s + x * c,
		y * 1 + z * 0 + x * 0,
		y * 0 + z * -c + x * s
	);
	
	return pos;
};
var Rz = function(po, p, t) {
	var x = p.x - po.x;
	var y = p.y - po.y;
	var z = p.z - po.z;
	
	var s = Math.sin(t * rad);
	var c = Math.cos(t * rad);
	
	var pos = new Point(
		z * 0 + x * -c + y * s,
		z * 0 + x * s + y * c,
		z * 1 + x * 0 + y * 0
	);
	
	return pos;
};