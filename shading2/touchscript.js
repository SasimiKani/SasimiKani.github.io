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
		
		downX = e.clientX - rect.left;
		downY = e.clientY - rect.top;
		
		for (var i in cubes) {
			cubes[i].rotation(moveX, moveY);
		}
		
		moveX = moveY = 0;
	}
});
canvas.addEventListener('touchend', function(e) {
	down = false;
});