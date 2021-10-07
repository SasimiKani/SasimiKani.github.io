var canvas, ctx, width, height;
ctx = (canvas = document.getElementById("canvas")).getContext("2d");
canvas.width = width = window.innerWidth - 20;
canvas.height = height = window.innerHeight - 200;
canvas.style = "border:1px solid black;";

function freq(a, r, n) {
	return a * Math.pow(Math.pow(2, 1/r), n);
}

function cent(r1, r2) {
	return Math.log(r2 / r1) / Math.log(2) * 1200;
}
function octave(c) {
	return c % 1200;
}

function d(id) {
	return document.getElementById(id);
}

function law2radix(r) {
	return Math.pow(2, 1 / r);
}

function aaa() {
	ctx.clearRect(0, 0, width, height);
	
	var radix = parseFloat(d("radix").value);
	
	var b = height/4*3;
	var l = 22;
	var size = 3;
	
	ctx.strokeStyle = "rgba(255,0,0,0.5)";
	ctx.lineWidth = 1;
	for (var h=0; h<13; h++) {
		ctx.beginPath();
		ctx.moveTo(0, b - 100 / size * h);
		ctx.lineTo(width, b - 100 / size * h);
		ctx.stroke();
	}
	
	ctx.strokeStyle = "black";
	ctx.lineWidth = 2;
	for (var i=0; l*i<width; i++) {
		var x = i * l;
		var y = cent(440, 440 * Math.pow(radix, i)) % 1200 / size;
		
		ctx.beginPath();
		ctx.moveTo(x, b - y);
		ctx.lineTo(x + l - 20, b - y);
		ctx.stroke();
		
		ctx.fillText(parseInt(radix * 100) / 100 + " ^ " + i + " 倍", x, b - y + 12);
		ctx.fillText(parseInt(cent(440, 440 * Math.pow(radix, i))  % 1200) + " ¢", x, b - y + 25);
	}
	
	//d("radix").value = parseFloat(d("radix").value) + 0.005;
	//requestAnimationFrame(aaa);
}

aaa();

var iList = [
	"radix"
];
for (var i in iList) {
	d(iList[i]).addEventListener("keyup", function() {
		if (this.value != "") {
			aaa();
		}
	});
}
for (var i in iList) {
	d(iList[i]).addEventListener("change", function() {
		if (this.value != "") {
			aaa();
		}
	});
}

var iList = [
	"law",
	"pattern"
];
for (var i in iList) {
	d(iList[i]).addEventListener("keyup", function() {
		d("radix").value = Math.pow(law2radix(d("law").value), d("pattern").value);
		aaa();
	});
	d(iList[i]).addEventListener("change", function() {
		d("radix").value = Math.pow(law2radix(d("law").value), d("pattern").value);
		aaa();
	});
}