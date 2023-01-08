var canvas, ctx, wid, hei;
canvas = document.getElementsByTagName("canvas")[0];
wid = canvas.width = 640;
hei = canvas.height = 480;
ctx = canvas.getContext("2d");

function nextX(x, a) {
	return a * x * (1 - x);
}
function line(x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

ctx.translate(0, hei/2);
var t = 0;
ctx.fillStyle = "rgb(45, 45, 45)";
ctx.strokeStyle = "rgb(242, 242, 242)";

function aaa() {
	ctx.fillStyle = "rgb(45, 45, 45)";
	ctx.fillRect(0, -hei/2, wid, hei);
	var x = 0.5, a = 3.999, step = 8, amp = 1.5, freq = 1;
	
	for (var i=0; i<t; i++) {
		x = nextX(x, a);
	}
	
	for (var i=0; i<wid+1; i+=step) {
		var subStep = (t % 1) * step;
		var ampStyle = Math.sin(freq*(i-subStep) * 180 / wid * Math.PI / 180) * hei/2;
		var nextAmpStyle = Math.sin(freq*(i+step-subStep) * 180 / wid * Math.PI / 180) * hei/2;
		var next = nextX(x, a);
		
		if (i == 0) {
			ctx.beginPath();
			ctx.moveTo(i-subStep, (x * amp - amp/2) * ampStyle);
			ctx.lineTo(i+step-subStep, (x * amp - amp/2) * ampStyle);
			ctx.lineTo(i+step-subStep, (next * amp - amp/2) * nextAmpStyle);
		} else {
			ctx.lineTo(i+step-subStep, (x * amp - amp/2) * ampStyle);
			ctx.lineTo(i+step-subStep, (next * amp - amp/2) * nextAmpStyle);
		}
		
		x = next;
	}
	ctx.lineTo(wid, hei/2);
	ctx.lineTo(0, hei/2);
	ctx.fillStyle = "rgb(242, 242, 242)";
	ctx.fill();
	
	t+=0.1;
	requestAnimationFrame(aaa);
}

(function() {
	aaa();
})();