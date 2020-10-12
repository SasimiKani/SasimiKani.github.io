var canvas, ctx, width, height;
ctx = (canvas = document.getElementById("canvas")).getContext("2d");
canvas.style = "position:absolute; top:0; left:0;";
canvas.width = width = window.innerWidth;
canvas.height = height = window.innerHeight;

var back = "black";
var fore = ["white", "red"];
var cnt = 0;

(function(){
	init();
	draw();
})();

function pen(x, y, r, v, t, parent=null) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.v = v;
	this.t = t;
	
	this.parent = parent;
	this.child = null;
	
	this.hand = {
		x: this.r * Math.cos(this.t * Math.PI / 180),
		y: this.r * Math.sin(this.t * Math.PI / 180)
	};
	
	this.initial = {x:x, y:y, r:r, v:v, t:t, handx:this.hand.x, handy: this.hand.y};
	
	this.insertChild = function(r, v, t, node=this) {
		if (node.child == null) {
			node.child = new pen(node.x + node.hand.x, node.y + node.hand.y, r, v, node.t + t, node);
		} else {
			this.insertChild(r, v, t, node.child);
		}
	};
	
	this.update = function(node=this) {
		node.t += node.v;
		node.hand.x = node.r * Math.cos(node.t * Math.PI / 180);
		node.hand.y = node.r * Math.sin(node.t * Math.PI / 180);
		
		if (node.child != null) {
			node.child.x = node.x + node.hand.x;
			node.child.y = node.y + node.hand.y;
			
			this.update(node.child);
		}
	}
	this.graph = function(type=0, node=this) {
		if (type == 0 || type == 1) {
			ctx.beginPath();
			ctx.arc(node.x, node.y, node.r, 0, Math.PI*2, false);
			ctx.stroke();
		}
		if (type == 0 || type == 2) {
			ctx.beginPath();
			ctx.moveTo(node.x, node.y);
			ctx.lineTo(node.x + node.hand.x, node.y + node.hand.y);
			ctx.stroke();
		}
		if (node.child != null) {
			this.graph(type, node.child);
		}
	};
	
	this.lastX = function(node=this) {
		if (node.child != null) {
			return node.hand.x + this.lastX(node.child);
		} else {
			return this.x + node.hand.x;
		}
	}
	this.lastY = function(node=this) {
		if (node.child != null) {
			return node.hand.y + this.lastY(node.child);
		} else {
			return this.y + node.hand.y;
		}
	}
	this.childNum = function(node=this) {
		if (node.child != null) {
			return 1 + this.childNum(node.child);
		} else {
			return 1;
		}
	}
	
	this.init = function(node=this) {
		node.initial.x = node.x = node.initial.x;
		node.initial.y = node.y = node.initial.y;
		node.initial.r = node.r = node.initial.r;
		node.initial.v = node.v = node.initial.v;
		node.initial.t = node.t = node.initial.t + (this.childNum() - node.childNum() + 1);
		node.initial.handx = node.hand.x = node.initial.handx;
		node.initial.handy = node.hand.y = node.initial.handy;
		
		if (node.child != null) {
			node.init(node.child);
		}
	}
}

var p;
function init() {
	function R(k) {
		return (width < height ? width / 5 : height / 5) / k;
	}
	function V(k) {
		return Math.random()*k+1;
	}
	function T(k) {
		return Math.random()*360;
	}
	
	p = [];
	for (var n=0; n<2; n++) {
		for (var i=0, k=1; i<25; i++, k++) {
			i == 0 ? 
				p.push(new pen(width/2, height/2, R(k), V(k), T(k))) :
				p[n].insertChild(R(k), V(k), T(k));
		}
	}
}
function draw() {
	var x, y;
	
	ctx.clearRect(0, 0, width, height);
	
	ctx.globalCompositeOperation = 'source-over';
	
	ctx.strokeStyle = fore[0];
	ctx.beginPath();
	for (var i=0; i<=360*2; i++) {
		for (var n in p) {
			p[n].update();
		}
		x = p[1].lastX();
		y = p[0].lastY();
		i==0 ?
			ctx.moveTo(x, y):
			ctx.lineTo(x, y);
	}
	//ctx.moveTo(0, 0);
	//ctx.lineTo(x, y);
	ctx.stroke();
	
	ctx.globalCompositeOperation = 'destination-over';
	ctx.strokeStyle = fore[1];
	for (var n in p) {
		p[n].graph(3);
		p[n].init();
	}
	
	ctx.fillStyle = back;
	ctx.fillRect(0, 0, width, height);
	
	cnt++;
	
	requestAnimationFrame(draw);
}

canvas.addEventListener("click", function(e){
	canvas.toBlob(function(blob){
		var url = URL.createObjectURL(blob);
		location.href = url;
	});
});