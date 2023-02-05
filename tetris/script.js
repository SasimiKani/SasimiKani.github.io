var canvas, ctx, width, height;
canvas = document.querySelector("canvas#main");
notice = document.querySelector("canvas#notice");
ctx = canvas.getContext("2d");
noticeCtx = notice.getContext("2d");

var blockSize = 30, hSize = 10, vSize = 20;
width = canvas.width = blockSize * hSize;
height = canvas.height = blockSize * vSize;
canvas.style = "border: 1px solid black; float:left;";

notice.width = blockSize * 6;
notice.height = blockSize * 4;
notice.style = "border: 1px solid black; float:left; margin-left: 5px;";

var blocks = [
	[[0, 1], [1, 0], [1, 1], "yellow", "O"],
	[[-1, 0], [1, 0], [2, 0], "lightblue", "I"],
	[[-1, 0], [1, 0], [1, 1], "blue", "J"],
	[[-1, 0], [1, 0], [-1, 1], "orange", "L"],
	[[1, 0], [-1, 1], [0, 1], "green", "S"],
	[[-1, 0], [0, 1], [1, 1], "red", "Z"],
	[[-1, 0], [1, 0], [0, 1], "violet", "T"]
];
var colors = ["yellow", "lightblue", "blue", "orange", "green", "red", "violet"];

var fieldBlocks = [];
var now;
var noticeBlock;
function pushBlock() {
	now = noticeBlock;
	pushNotice();
}
function pushNotice() {
	var type = blocks[parseInt(Math.random() * blocks.length)];
	noticeBlock = [5, 0, Object.assign(type), 0];
}

function putBlock(x, y, ctx) {
	ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
	ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
}
function viewBlock(x, y, tBlock, r) {
	var tBlock = rotateBlock(tBlock, r);
	
	ctx.fillStyle = tBlock[3];
	putBlock(x, y, ctx);
	for (var i=0; i<3; i++) {
		putBlock(x + tBlock[i][0], y + tBlock[i][1], ctx);
	}
}
function viewNoticeBlock() {
	var tBlock = noticeBlock[2];
	
	noticeCtx.fillStyle = tBlock[3];
	putBlock(2, 1, noticeCtx);
	for (var i=0; i<3; i++) {
		putBlock(2 + tBlock[i][0], 1 + tBlock[i][1], noticeCtx);
	}
}
function rotateBlock(tBlock, r) {
	var newBlock = [];
	var ang = 90 * r * Math.PI / 180;
	
	if (tBlock[4] == "O") {
		ang = 90 * 0 * Math.PI / 180;
	} else if ("ISZ".match(tBlock[4]) != null) {
		ang = 90 * (r % 2) * Math.PI / 180;
	} else {
		ang = 90 * (r % 4) * Math.PI / 180;
	}
	
	var isOutRange = [0, 0];
	for (var i=0; i<3; i++) {
		var x = -Math.round(tBlock[i][0] * -Math.cos(ang) + tBlock[i][1] * Math.sin(ang));
		var y = Math.round(tBlock[i][0] * Math.sin(ang) + tBlock[i][1] * Math.cos(ang));
		newBlock.push([x, y]);
		
		try {
			while (y + now[1] < 0) {
				now[1]++;
			}
			while (x + now[0] < 0 || fieldBlocks[y + now[1]][x + now[0]] > -1 && x < 0) {
				now[0]++;
			}
			while (hSize <= x + now[0] || fieldBlocks[y + now[1]][x + now[0]] > -1 && x > 0) {
				now[0]--;
			}
		} catch {
			console.log("y: " + y + " now[1]: " + now[1]);
		}
	}
	
	newBlock.push(tBlock[3]);
	return newBlock;
}

var deletedLines = 0;
function deleteLine() {
	for (var i=0; i<vSize; i++) {
		if (fieldBlocks[i].indexOf(-1) == -1) {
			fieldBlocks[i] = fieldBlocks[i].map(n => -1);
			deletedLines++;
			for (var y=i; y>0; y--) {
				fieldBlocks[y] = fieldBlocks[y-1];
			}
		}
	}
}

function main() {
	ctx.clearRect(0, 0, width, height);
	noticeCtx.clearRect(0, 0, width, height);
	
	document.querySelector("#lines").innerText = deletedLines;
	
	ctx.fillStyle = "lightgray";
	ctx.fillRect(0, 0, width, height);
	ctx.strokeStyle = "gray";
	for (var i=0; i<hSize; i++) {
		ctx.beginPath();
		ctx.moveTo(i * blockSize, 0);
		ctx.lineTo(i * blockSize, height);
		ctx.stroke();
	}
	for (var i=0; i<vSize; i++) {
		ctx.beginPath();
		ctx.moveTo(0, i * blockSize);
		ctx.lineTo(width, i * blockSize);
		ctx.stroke();
	}
	
	ctx.strokeStyle = "black";
	for (var i=0; i<hSize; i++) {
		for (var j=0; j<vSize; j++) {
			if (fieldBlocks[j][i] > -1) {
				var line = fieldBlocks[j].map(b => b > -1 ? 0 : -1);
				var nBlock = rotateBlock(now[2], now[3]) ;
				if (now[1] == j) line[now[0]] = 0;
				for (var k=0; k<3; k++) {
					if (nBlock[k][1] + now[1] == j) line[nBlock[k][0] + now[0]] = 0;
				}
				if (line.indexOf(-1) == -1) {
					ctx.fillStyle = "white";
				} else {
					ctx.fillStyle = colors[fieldBlocks[j][i]];
				}
				putBlock(i, j, ctx);
			}
		}
	}
	viewBlock(now[0], now[1], now[2], now[3]);
	viewNoticeBlock()
	
	requestAnimationFrame(main);
}

function checkBlock() {
	var x, y, tBlock;
	tBlock = rotateBlock(now[2], now[3]);
	
	x = now[0];
	y = now[1];
	if (y == vSize - 1 || fieldBlocks[y+1][x] > -1) return true;
	for (var i=0; i<3; i++) {
		x = tBlock[i][0] + now[0];
		y = tBlock[i][1] + now[1];
		if (y == vSize - 1 || fieldBlocks[y+1][x] > -1) return true;
	}
	return false;
}
function decision() {
	if (checkBlock()) {
		var x, y, tBlock;
		tBlock = rotateBlock(now[2], now[3]);
		
		x = now[0];
		y = now[1];
		fieldBlocks[y][x] = colors.indexOf(tBlock[3]);
		for (var i=0; i<3; i++) {
			x = tBlock[i][0] + now[0];
			y = tBlock[i][1] + now[1];
			fieldBlocks[y][x] = colors.indexOf(tBlock[3]);
		}
		deleteLine();
		pushBlock();
		return true;
	}
	return false;
}

addEventListener("keydown", function(e) {
	function checkRange(mv) {
		var x, y, tBlock;
		tBlock = rotateBlock(now[2], now[3]);
		
		x = now[0];
		y = now[1];
		if (x + mv < 0 || hSize <= x + mv || fieldBlocks[y][x + mv] > -1) return false;
		for (var i=0; i<3; i++) {
			x = tBlock[i][0] + now[0];
			y = tBlock[i][1] + now[1];
			if (x + mv < 0 || hSize <= x + mv || fieldBlocks[y][x + mv] > -1) return false;
		}
		return true;
	}
	
	switch (e.keyCode) {
	case 37: // ←
		if (checkRange(-1)) now[0]--;
		break;
	case 39: // →
		if (checkRange(+1)) now[0]++;
		break;
	case 40: // ↓
		decision();
		now[1]++;
		break;
	case 90: // Z
		now[3] = (now[3] + 3) % 4;
		break;
	case 88: // X
		now[3] = (now[3] + 1) % 4;
		break;
	}
});

for (var i=0; i<vSize; i++) {
	fieldBlocks.push([]);
	for (var j=0; j<hSize; j++) {
		fieldBlocks[i].push(-1);
	}
}
pushNotice();
pushBlock();
main();

setInterval(function() {
	if (!decision()) {
		now[1]++;
	}
}, 1000);