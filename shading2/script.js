var canvas, ctx, width, height;
ctx = (canvas = document.getElementById("canvas")).getContext("2d");
canvas.width = width = 640;
canvas.height = height = 480;
canvas.style = "border:1px solid black;";
ctx.fillStyle = ctx.strokeStyle = "rgb(204,204,204)";

canvas.addEventListener("mousedown", function() { canvas.style.cursor = "grabbing"; });
canvas.addEventListener("mouseup", function() { canvas.style.cursor = "grab"; });

(function() {
	init();
	aaa();
})();

var view, center = 550;
var light, brightness;
var ang, p, ppos, a, u;
var camX = 0, camY = 0;
var ax = 0, ay = 1, az = 0;
var down = false;
var downX, downY;
var moveX = 0, moveY = 0;
function init() {
	view = new Vector(0, 0, 500);
	light = new Vector(0, 200, 0);
	brightness = 100;
	ang = 0;
	u = new Vector(0, 100, 0);
	
	shapes = [];
	
	for (var i=-3; i<4; i++) {
		for (var j=-3; j<4; j++) {
			if (Math.abs(i + j) % 2 == 1) continue;
			shapes.push(new Cube(new Vector(i * 60, -110, j * 60), 25));
		}
	}
	for (var i=0; i<360; i+=360/12) {
		shapes.push(new Cube(new Vector(
			180 * Math.sin(i * Math.PI/180),
			-50,
			180 * Math.cos(i * Math.PI/180)
		), 25, new Vector(i, 50, 50)));
	}
	
	shapes.push(new Point(light, 10, new Vector(0, 0, 100), "light"));

//	p = [
//		new Vector(-50, -50, -50), // ~1, ~2, ~4
//		new Vector(-50, -50,  50), // 0~, ~3, ~5
//		new Vector(-50,  50, -50), // 0~, ~3, ~6
//		new Vector(-50,  50,  50), // 1~, 2~, ~7
//		new Vector( 50, -50,- 50), // 0~, ~5, ~6
//		new Vector( 50, -50,  50), // 1~, 4~, ~7
//		new Vector( 50,  50, -50), // 2~, 4~, ~7
//		new Vector( 50,  50,  50)  // 3~, 5~, 6~
//	];
//	ppos = new Vector(0, 0, 0);
//	adr = [[1,2,4], [3,5], [3,6], [7], [5,6], [7], [7], []];
//	faces = [
//		[2,3,1,0],
//		[6,7,3,2],
//		[4,5,7,6],
//		[0,1,5,4],
//		[4,6,2,0],
//		[1,3,7,5]
//	];
	ctx.translate(width/2, height/2);
}

function setBrightness(value) {
	brightness = value;
	for (var i in shapes) {
    if (shapes[i].name == "light") {
        shapes[i].color.z = value;
        break;
    }
}
}

function aaa() {
	clear();
	
	var d = 1;
	if (getKey(keys.left) || getKey(keys.right) && getKey(keys.up) || getKey(keys.down)) {
		d = 1/Math.SQRT2;
	}
	for (var i in shapes) {
		if (getKey(keys.left)) {
			shapes[i].pos.x += 5 * d;
		}
		if (getKey(keys.right)) {
			shapes[i].pos.x -= 5 * d;
		}
		if (getKey(keys.up)) {
			shapes[i].pos.y += 5 * d;
		}
		if (getKey(keys.down)) {
			shapes[i].pos.y -= 5 * d;
		}
	}
	if (getKey(keys.d) && camY <  30) { camY++; }
	if (getKey(keys.a) && camY > -30) { camY--; }
	if (getKey(keys.w) && camX <  45) { camX++; }
	if (getKey(keys.s) && camX > -45) { camX--; }
	
	if (getKey(keys.T4)) { light.x += 5; }
	if (getKey(keys.T6)) { light.x -= 5; }
	if (getKey(keys.T8)) { light.y += 5; }
	if (getKey(keys.T2)) { light.y -= 5; }
	
	if (getKey(16)) { view.z *= 1.02; }
	if (getKey(17) && view.z > 10) { view.z /= 1.02; }
	
	shapes = sortAsIndex(shapes, view);
	for (var i in shapes) {
		for (var j in shapes) {
			if (i == shapes[j].index) {
				shapes[j].sort();
 				shapes[j].graph(view, center, "face");
				//shapes[j].graph(view, center, "frame");
				break;
			}
		}
	}
	
//	var b = [];
//	for (var i in p) {
//		// 四元数計算 a: 座標 u: 回転軸 ang: 回転角度
//		var c = rotate(p[i], new Vector(0, 1, 0), moveX);
//		c = rotate(c, new Vector(1, 0, 0), moveY);
//		c = rotate(c, uu, ang *0);
//		b.push(c);
//	}
//	
//	for (var i in p) {
//		// 遠近法適用
//		/*
//		var x = view * b[i].x / (b[i].z - center);
//		var y = view * b[i].y / (b[i].z - center);
//		var sy = y - view * (b[i].y + 5) / (b[i].z - center);
//		*/
//		
//		// 描画
//		ctx.fillStyle = "rgb(204,204,204)";
//		/*
//		// 頂点描画
//		ctx.beginPath();
//		ctx.arc(x, y, sy, 0, Math.PI*2, false);
//		ctx.fill();
//		*/
//		/*
//		// 辺描画
//		for (var j in adr[i]) {
//			ctx.moveTo(x, y);
//			
//			// 遠近法適用
//			var x2 = view * b[adr[i][j]].x / (b[adr[i][j]].z - center);
//			var y2 = view * b[adr[i][j]].y / (b[adr[i][j]].z - center);
//			
//			ctx.lineTo(x2, y2);
//			ctx.stroke();
//		}
//		*/
//		
//		var c = [];
//		for (var j in faces) {
//			var va = new Vector(
//				b[faces[j][2]].x - b[faces[j][0]].x,
//				b[faces[j][2]].y - b[faces[j][0]].y,
//				b[faces[j][2]].z - b[faces[j][0]].z
//			);
//			var vb = new Vector(
//				b[faces[j][2]].x - b[faces[j][1]].x,
//				b[faces[j][2]].y - b[faces[j][1]].y,
//				b[faces[j][2]].z - b[faces[j][1]].z
//			);
//			var vc = new Vector(
//				va.y * vb.z - va.z * vb.y,
//				va.z * vb.x - va.x * vb.z,
//				va.x * vb.y - va.y * vb.x
//			);
//			vc.normalize(64);
//			c.push(vc);
//		}
//		// ソート
//		for (var j=0; j<faces.length-1; j++) {
//			for (var k=j+1; k<faces.length; k++) {
//				if (Math.pow(c[j].x + ppos.x,2) + Math.pow(c[j].y + ppos.y,2) + Math.pow(c[j].z + ppos.z - center,2)
//						> Math.pow(c[k].x + ppos.x,2) + Math.pow(c[k].y + ppos.y,2) + Math.pow(c[k].z + ppos.z - center,2)) {
//					var tmp = [faces[j], c[j]];
//					faces[j] = faces[k]; c[j] = c[k];
//					faces[k] = tmp[0]; c[k] = tmp[1];
//				}
//			}
//		}
//		// 面描画
//		var l = light.new();
//		l.normalize(1);
//		for (var j in faces) {
//			//light = rotate(light, new Vector(0, 0, 1), 0.01);
//			ctx.fillStyle = "rgba("
//				+(64-(c[j].x*l.x+c[j].y*l.y+c[j].z*l.z)+128)+","
//				+(64-(c[j].x*l.x+c[j].y*l.y+c[j].z*l.z)+64)+","
//				+(64-(c[j].x*l.x+c[j].y*l.y+c[j].z*l.z)+256)+",1)";
//			
//			ctx.beginPath();
//			for (var k in faces[j]) {
//				// 遠近法適用
//				var x = view * (b[faces[j][k]].x + ppos.x) / ((b[faces[j][k]].z + ppos.z) - center);
//				var y = view * (b[faces[j][k]].y + ppos.y) / ((b[faces[j][k]].z + ppos.z) - center);
//				
//				if (k == 0) ctx.moveTo(x, y);
//				else ctx.lineTo(x, y);
//			}
//			ctx.fill();
//			
//			// 外積描画
//			// 遠近法適用
//			/*
//			var x = view * (c[j].x + ppos.x) / ((c[j].z + ppos.z) - center);
//			var y = view * (c[j].y + ppos.y) / ((c[j].z + ppos.z) - center);
//			ctx.beginPath();
//			ctx.arc(x, y, 4, 0, Math.PI*2, false);
//			ctx.fill();
//			*/
//		}
//	}
	
	// 光源描画
	/*
	ctx.fillStyle = "rgb(255,255,255)";
	// 遠近法適用
	var x = view * light.x / (light.z - center);
	var y = view * light.y / (light.z - center);
	ctx.beginPath();
	ctx.arc(x, y, 10, 0, Math.PI*2, false);
	ctx.fill();
	*/
	
	// 座標描画
	/*
	ctx.fillStyle = "rgb(204,204,204)";
	for (var i in p) {
		// 遠近法適用
		var x = view * b[i].x / (b[i].z - center);
		var y = view * b[i].y / (b[i].z - center);
		var sy = y - view * (b[i].y + 5) / (b[i].z - center);
		ctx.fillText("["+i+"]"+"("+parseInt(b[i].x)+","+parseInt(b[i].y)+","+parseInt(b[i].z)+")", x, y);
	}
	*/
	
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
		
		for (var i in shapes) {
			shapes[i].rotation(moveX, moveY);
		}
		
//		var uu = new Vector(u.x, u.y, u.z);
//		uu = rotate(uu, new Vector(0, 1, 0), moveX);
//		uu = rotate(uu, new Vector(1, 0, 0), moveY);
//		
//		u = uu.new();
//		
//		for (var i in p) {
//			// 四元数計算 a: 座標 u: 回転軸 ang: 回転角度
//			var b = rotate(p[i], new Vector(0, 1, 0), moveX);
//			b = rotate(b, new Vector(1, 0, 0), moveY);
//			b = rotate(b, uu, 0);
//			
//			p[i] = b.new();
//		}
		moveX = moveY = 0;
	}
});
canvas.addEventListener('mouseup', function(e) {
	down = false;
});