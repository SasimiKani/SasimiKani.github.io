var canvas, ctx, width, height;
ctx = (canvas = document.getElementById("canvas")).getContext("2d");
canvas.width = width = 640;
canvas.height = height = 480;
canvas.style = "border:1px solid black;";
ctx.fillStyle = ctx.strokeStyle = "rgb(204,204,204)";

(function() {
	init();
	aaa();
})();

var ang, p, a, u;
var ax = 0, ay = 1, az = 0;
var down = false;
var downX, downY;
var moveX = 0, moveY = 0;
function init() {
	ang = 0;
	u = new Vector(0, 100, 0);
	p = [
		new Vector(-100, -100, -100), // ~1, ~2, ~4
		new Vector(-100, -100,  100), // 0~, ~3, ~5
		new Vector(-100,  100, -100), // 0~, ~3, ~6
		new Vector(-100,  100,  100), // 1~, 2~, ~7
		new Vector( 100, -100,- 100), // 0~, ~5, ~6
		new Vector( 100, -100,  100), // 1~, 4~, ~7
		new Vector( 100,  100, -100), // 2~, 4~, ~7
		new Vector( 100,  100,  100)  // 3~, 5~, 6~
	];
	adr = [[1,2,4], [3,5], [3,6], [7], [5,6], [7], [7], []];
	faces = [
		[0,1,3,2],
		[4,5,1,0],
		[5,7,3,1],
		[6,7,5,4],
		[0,2,6,4],
		[6,2,3,7]
	];
	ctx.translate(width/2, height/2);
}
function aaa() {
	clear();
	
	var uu = new Vector(u.x, u.y, u.z);
	uu = rotate(uu, new Vector(0, 1, 0), moveX);
	uu = rotate(uu, new Vector(1, 0, 0), moveY);
	
	var b = [];
	for (var i in p) {
		// 四元数計算 a: 座標 u: 回転軸 ang: 回転角度
		var c = rotate(p[i], new Vector(0, 1, 0), moveX);
		c = rotate(c, new Vector(1, 0, 0), moveY);
		c = rotate(c, uu, ang *0);
		b.push(c);
	}
	
	for (var i in p) {
		// 遠近法適用
		var x = 350 * b[i].x / (b[i].z - 500);
		var y = 350 * b[i].y / (b[i].z - 500);
		var sy = y - 350 * (b[i].y + 5) / (b[i].z - 500);
		
		// 描画
		ctx.fillStyle = "rgb(204,204,204)";
		/*
		// 頂点描画
		ctx.beginPath();
		ctx.arc(x, y, sy, 0, Math.PI*2, false);
		ctx.fill();
		*/
		/*
		// 辺描画
		for (var j in adr[i]) {
			ctx.moveTo(x, y);
			
			// 遠近法適用
			var x2 = 350 * b[adr[i][j]].x / (b[adr[i][j]].z - 500);
			var y2 = 350 * b[adr[i][j]].y / (b[adr[i][j]].z - 500);
			
			ctx.lineTo(x2, y2);
			ctx.stroke();
		}
		*/
		
		// 面描画
		var c = [];
		for (var j in faces) {
			var va = new Vector(
				b[faces[j][2]].x - b[faces[j][0]].x,
				b[faces[j][2]].y - b[faces[j][0]].y,
				b[faces[j][2]].z - b[faces[j][0]].z
			);
			var vb = new Vector(
				b[faces[j][2]].x - b[faces[j][1]].x,
				b[faces[j][2]].y - b[faces[j][1]].y,
				b[faces[j][2]].z - b[faces[j][1]].z
			);
			var vc = new Vector(
				va.y * vb.z - va.z * vb.y,
				va.z * vb.x - va.x * vb.z,
				va.x * vb.y - va.y * vb.x
			);
			vc.normalize(64);
			c.push(vc);
		}
		for (var j=0; j<faces.length-1; j++) {
			for (var k=j+1; k<faces.length; k++) {
				if (c[j].z > c[k].z) {
					var tmp = [faces[j], c[j]];
					faces[j] = faces[k]; c[j] = c[k];
					faces[k] = tmp[0]; c[k] = tmp[1];
				}
			}
		}
		for (var j in faces) {
			ctx.fillStyle = "rgb("+(c[j].y+128)+","+(c[j].y+128)+","+(c[j].y+128)+")";
			
			ctx.beginPath();
			for (var k in faces[j]) {
				// 遠近法適用
				var x = 350 * b[faces[j][k]].x / (b[faces[j][k]].z - 500);
				var y = 350 * b[faces[j][k]].y / (b[faces[j][k]].z - 500);
				
				if (k == 0) ctx.moveTo(x, y);
				else ctx.lineTo(x, y);
			}
			ctx.fill();
		}
	}
	
	ang++;
	
	requestAnimationFrame(aaa);
}
function clear() {
	var tmp = ctx.fillStyle;
	ctx.fillStyle = "rgb(64,64,64)";
	ctx.fillRect(-width, -height, width * 2, height * 2);
	ctx.fillStyle = tmp;
}

canvas.addEventListener('mousedown', function(e) {
	var rect = canvas.getBoundingClientRect();
	downX = e.clientX - rect.left;
	downY = e.clientY - rect.top;
	
	down = true;
});
canvas.addEventListener('mousemove', function(e) {
	if (down) {
		var rect = canvas.getBoundingClientRect();
		var X = e.clientX - rect.left;
		var Y = e.clientY - rect.top;
		
		moveX += downX - X;
		moveY -= downY - Y;
		
		downX = e.clientX - rect.left;
		downY = e.clientY - rect.top;
		
		var uu = new Vector(u.x, u.y, u.z);
		uu = rotate(uu, new Vector(0, 1, 0), moveX);
		uu = rotate(uu, new Vector(1, 0, 0), moveY);
		
		u = uu.new();
		
		for (var i in p) {
			// 四元数計算 a: 座標 u: 回転軸 ang: 回転角度
			var b = rotate(p[i], new Vector(0, 1, 0), moveX);
			b = rotate(b, new Vector(1, 0, 0), moveY);
			b = rotate(b, uu, 0);
			
			p[i] = b.new();
		}
		moveX = moveY = 0;
	}
});
canvas.addEventListener('mouseup', function(e) {
	down = false;
});