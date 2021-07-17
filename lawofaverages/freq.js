var canvas, ctx, width, height;
ctx = (canvas = document.getElementById("canvas")).getContext("2d");
canvas.width = width = 640;
canvas.height = height = window.innerHeight - 20;
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

var set = [
	[452, "A"],
	[479, "A#"],
	[507, "B"],
	[537, "C"],
	[569, "C#"],
	[603, "D"],
	[639, "D#"],
	[677, "E"],
	[718, "F"],
	[760, "F#"],
	[806, "G"],
	[855, "G#"]
];
function hz2abc(hz) {
	var min = 16777215;
	var pitch = "";
	for (var i in set) {
		var o = 1;
		while (set[i][0] * o < hz) o *= 2;
		var w = (set[i][0] * o) % hz;
		if (w < min) {
			pitch = set[i][1];
			min = w;
		}
	}
	return pitch;
}

function d(id) {
	return document.getElementById(id);
}

function aaa() {
	ctx.clearRect(0, 0, width, height);

	var start = parseInt(d("start").value);

	var scale = parseFloat(d("scale").value);

	var offsetx = parseInt(d("offsetx").value);
	var offsety = parseInt(d("offsety").value);
	var len = parseInt(d("len").value);
	var law = parseFloat(d("law").value);

	ctx.strokeStyle = "rgba(0,0,0,0.5)";
	ctx.fillStyle = "rgba(0,0,0,0.2)";
	for (var i=-2; ; i++) {
		var t, b;
		for (var j in set) {
			t = ((set[j][0] * Math.pow(2, i)) - offsety) / scale;
			ctx.beginPath();
			ctx.moveTo(0, height - t);
			ctx.lineTo(width, height - t);
			ctx.stroke();
			
			console.log(t, set[j][0] * i);
			
			if (set[j][1].match("#") != null) {
				b = ((set[j-1][0] * Math.pow(2, i)) - offsety) / scale;
				ctx.fillRect(0, height - t, width, t - b);
			}
		}
		if (height < t) break;
	}

	ctx.strokeStyle = "rgba(255,0,0,0.3)";
	for (var i= height - (100 - offsety) / scale; i>=0 - offsety; i-= 100 / scale) {
		ctx.beginPath();
		ctx.moveTo(0, i);
		ctx.lineTo(width, i);
		ctx.stroke();
		
		ctx.strokeText(parseInt((height - i) * scale + offsety + 0.5) + " Hz", 10, i);
	}

	ctx.strokeStyle = "black";
	for (var i=0; i<law * 4 + 1; i++) {
		var f = height - freq(start, law, i) / scale;
		var fixedLen = (len * 13) / (law + 1);
		
		ctx.beginPath();
		ctx.moveTo(offsetx + i * fixedLen, f + offsety / scale);
		ctx.lineTo(offsetx + i * fixedLen + fixedLen, f + offsety / scale);
		ctx.stroke();
		
		var c = cent(start, freq(start, law, i))
		
		if (d("hz").checked)
			ctx.strokeText(parseInt(freq(start, law, i)) + "Hz", offsetx + i * fixedLen + fixedLen, f + offsety / scale + 10);
		
		if (d("cent").checked)
			ctx.strokeText(octave(parseInt(c)) + "¢", offsetx + i * fixedLen + fixedLen, f + offsety / scale + 10);
		
		if (d("abc").checked)
			ctx.strokeText(hz2abc(freq(start, law, i)), offsetx + i * fixedLen + fixedLen, f + offsety / scale + 10);
	}
}

aaa();

var iList = [
	"start",
	"scale",
	"offsetx",
	"offsety",
	"len",
	"law"
];
var cList = [
	"hz",
	"cent",
	"abc"
];

for (var i in iList) {
	d(iList[i]).addEventListener("keyup", function() {
		if (this.value !== "") {
			aaa();
		}
	});
	d(iList[i]).addEventListener("change", function() {
		if (this.value !== "") {
			aaa();
		}
	});
}
for (var i in cList) {
	d(cList[i]).addEventListener("click", function() {
		if (this.value !== "") {
			aaa();
		}
	});
}