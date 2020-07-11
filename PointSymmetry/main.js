var canvas, ctx, width, height;
ctx = (canvas = document.getElementById("canvas")).getContext("2d");

width = canvas.width = window.innerWidth;
height = canvas.height = window.innerHeight;
canvas.style = "position: absolute; top: 0; left: 0;";

var box = {
	size: 20,
	color: "black",
	graph: function(x, y) {
		ctx.fillRect(x * this.size, y * this.size, this.size, this.size);
	}
};
var o = {x: width/2, y: height/2};
o.w = o.x < o.y ? o.y : o.x;
var board = [];
var cnt = 0;
for (var i=0; (i + 1) * box.size < o.w; i++) {
	board.push([]);
	for (var j=0; (j + 1) * box.size < o.w; j++) {
		board[i].push(Math.random() < 0.5 ? 0 : 1);
	}
	cnt++;
}

function update() {
	var tmp = board.map(x => x);
	
	for (var i=0; i<cnt; i++) {
		for (var j=0; j<cnt; j++) {
			var find = 0;
			for (var k=-1; k<2; k++) {
				for (var l=-1; l<2; l++) {
					if (!(k==0 && l==0) && (0 <= i+k && i+k < board.length) && (0 <= j+l && j+l < board.length)) {
						if (tmp[i+k][j+l] == 1) {
							find++;
						}
					}
				}
			}
			if (find < 2 || 4 <= find) {
				board[i][j] = 0;
			}
			if (find == 3) {
				board[i][j] = 1;
			}
		}
	}
	
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, width, height);
	ctx.fillStyle = box.color;
	for (var i=0; i<cnt; i++) {
		for (var j=0; j<cnt; j++) {
			if (board[i][j] == 1) {
				box.graph(o.x / box.size - i - 1, o.y / box.size - j - 1);
				box.graph(o.x / box.size - j - 1, o.y / box.size + i);
				box.graph(o.x / box.size + j, o.y / box.size - i - 1);
				box.graph(o.x / box.size + i, o.y / box.size + j);
			}
		}
	}
}

(function() {
	update();
	setInterval(function(){update();}, 1000);
})();