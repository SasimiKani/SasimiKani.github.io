var canvas, ctx, width, height;
ctx = (canvas = document.getElementById("canvas")).getContext("2d");

var back_color = "black";
width = canvas.width = window.innerWidth;
height = canvas.height = window.innerHeight;
canvas.style = "position: absolute; top: 0; left: 0; background-color: back_color;";

var box = {
	size: 10,
	color: "rgb(192, 192, 192)",
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

function getAdjacentLivesCount(tmp, _x, _y) {
	var count = 0;
	for (var y=-1; y<=1; y++)
		for (var x=-1; x<=1; x++) {
			if ((x == 0) && (y == 0))
				continue;
			
			var x2 = (cnt + _x + x) % cnt;
			var y2 = (cnt + _y + y) % cnt;
			count += tmp[x2][y2];
		}
	
	return count;
}
function update() {
	/*for (var i=0; i<cnt; i++) {
		for (var j=0; j<cnt-1; j++) {
			board[i][j] = board[i][j+1];
		}
		board[i][j] = 1;
	}*/
	var tmp = board.map(x => x.map(a => 0));
	
	for (var i=0; i<cnt; i++) {
		for (var j=0; j<cnt; j++) {
			var find = getAdjacentLivesCount(board, i, j);
			
			var next = board[i][j];
			if (board[i][j]) {
				if (find <= 1 || find >= 4)
					next = 0;
			}
			else {
				if (find == 3)
					next = 1;
			}
			tmp[i][j] = next;
		}
	}
	board = tmp.map(x => x);
	
	ctx.fillStyle = back_color;
	ctx.fillRect(0, 0, width, height);
	ctx.fillStyle = box.color;
	for (var i=0; i<cnt; i++) {
		for (var j=0; j<cnt; j++) {
			if (board[i][j]) {
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
	setInterval(function(){update();}, 100);
})();

//canvas.addEventListener("click", function() { update(); });