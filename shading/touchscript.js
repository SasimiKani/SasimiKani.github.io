function disableScroll(event) {
  event.preventDefault();
}

canvas.addEventListener('touchstart', function(e) {
	var rect = canvas.getBoundingClientRect();
	downX = e.changedTouches[0].clientX - rect.left;
	downY = e.changedTouches[0].clientY - rect.top;
	down = true;
});
canvas.addEventListener('touchmove', disableScroll, { passive: false });
canvas.addEventListener('touchmove', function(e) {
	if (down) {
		var rect = canvas.getBoundingClientRect();
		var X = e.changedTouches[0].clientX - rect.left;
		var Y = e.changedTouches[0].clientY - rect.top;
		
		moveX += downX - X;
		moveY -= downY - Y;
		
	downX = e.changedTouches[0].clientX - rect.left;
	downY = e.changedTouches[0].clientY - rect.top;
		
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
canvas.addEventListener('touchend', function(e) {
	down = false;
});