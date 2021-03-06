var canvas, ctx, wid, hei;
ctx = (canvas = document.getElementById("canvas")).getContext("2d");
canvas.width = wid = window.innerWidth;
canvas.height = hei = window.innerHeight;
canvas.style = "position:absolute; top:0; left:0;";

var a = 0, p = 200, it = 16;

function round(n, c, r=10) {
	return Math.round(n / Math.pow(r, c)) * Math.pow(r, c);
}

function main() {
	ctx.globalCompositeOperation = "source-over";
	
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, wid, hei);
	
	var x, y, z;
	for (x=0; x<wid+it; x+=it) {
		for (y=0; y<hei+it; y+=it) {
			z = round(noise.simplex3((x) / p, (y) / p, a / p) * 128 + 128, 1, 32);
			ctx.fillStyle = "rgb(" + z + "," + z + "," + z + ")";
			ctx.fillRect(x, y, it, it);
		}
	}
	
	ctx.globalCompositeOperation = "lighter";
	
	for (x=0; x<wid+it; x+=it) {
		for (y=0; y<hei+it; y+=it) {
			z = noise.simplex3(x, y, a / 10) * 32 + 32;
			ctx.fillStyle = "rgb(" + z + "," + noise.simplex2(z, a) + "," + z + ")";
			ctx.fillRect(x, y, it, it);
		}
	}
	
	a+=5;
	requestAnimationFrame(main);
}

main();