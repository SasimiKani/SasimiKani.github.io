var Point = function(pos, size, color=new Vector(0, 0, 50), name="point") {
	this.name = name;
	this.pos = pos;
	this.size = size;
	this.color = color;
	{
		this.index = getIndex();
	}
};

Point.prototype.graph = function(view, center) {
	ctx.fillStyle = "hsl("+this.color.x+", "+this.color.y+"%, "+this.color.z+"%)";
	
	var pb = new Vector(this.pos.x, this.pos.y, this.pos.z);
	pb = rotate(pb, new Vector(0, 1, 0), camY);// カメラ回転
	pb = rotate(pb, new Vector(1, 0, 0), camX);// カメラ回転
	
	// 遠近法適用
	var x = view.z * (pb.x) / ((pb.z) - center);
	var y = view.z * (pb.y) / ((pb.z) - center);
	var dx = view.z * (pb.x - this.size) / ((pb.z) - center) - x;
	
	ctx.beginPath();
	ctx.arc(x, y, dx, 0, Math.PI*2, false);
	ctx.fill();
};
Point.prototype.sort = function() {};
Point.prototype.rotation = function() {};