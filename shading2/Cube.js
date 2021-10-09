var Cube = function(pos, size, color=new Vector(0, 0, 50), name="cube") {
	this.name = "cube";
	this.pos = pos;
	this.color = color;
	this.p = [
		new Vector(-size, -size, -size),
		new Vector(-size, -size,  size),
		new Vector(-size,  size, -size),
		new Vector(-size,  size,  size),
		new Vector( size, -size,- size),
		new Vector( size, -size,  size),
		new Vector( size,  size, -size),
		new Vector( size,  size,  size) 
	];
	this.adr = [[1,2,4], [3,5], [3,6], [7], [5,6], [7], [7], []];
	this.faces = [
		[2,3,1,0],
		[6,7,3,2],
		[4,5,7,6],
		[0,1,5,4],
		[4,6,2,0],
		[1,3,7,5]
	];
	{
		this.b = [];
		for (var i in this.p) {
			this.b.push(this.p[i]);
		}
		this.c = [];
		this.d = [];
		this.index = getIndex();
	}
};

Cube.prototype.rotation = function(rx, ry) {
	for (var i in this.p) {
		// 四元数計算 a: 座標 u: 回転軸 ang: 回転角度
		var c = rotate(this.b[i], new Vector(0, 1, 0), rx);
		c = rotate(c, new Vector(1, 0, 0), ry);
		this.b[i] = c;
	}
};
Cube.prototype.sort = function() {
	this.c = [];
	this.d = [];
	
	var pb = [];
	for (var i in this.b) {
		var p = new Vector(this.b[i].x + this.pos.x,
							this.b[i].y + this.pos.y,
							this.b[i].z + this.pos.z);
		p = rotate(p, new Vector(0, 1, 0), camY);// カメラ回転
		p = rotate(p, new Vector(1, 0, 0), camX);// カメラ回転
		pb.push(p);
	}
	var pos = rotate(this.pos, new Vector(0, 1, 0), camY);// カメラ回転
	    pos = rotate(     pos, new Vector(1, 0, 0), camX);// カメラ回転
	
	for (var i in this.faces) {
		var va = new Vector(
			this.b[this.faces[i][2]].x - this.b[this.faces[i][0]].x,
			this.b[this.faces[i][2]].y - this.b[this.faces[i][0]].y,
			this.b[this.faces[i][2]].z - this.b[this.faces[i][0]].z
		);
		var vb = new Vector(
			this.b[this.faces[i][2]].x - this.b[this.faces[i][1]].x,
			this.b[this.faces[i][2]].y - this.b[this.faces[i][1]].y,
			this.b[this.faces[i][2]].z - this.b[this.faces[i][1]].z
		);
		var vc = new Vector(
			va.y * vb.z - va.z * vb.y,
			va.z * vb.x - va.x * vb.z,
			va.x * vb.y - va.y * vb.x
		);
		vc.normalize(100);
		this.c.push(vc);
		
		va = new Vector(
			pb[this.faces[i][2]].x - pb[this.faces[i][0]].x,
			pb[this.faces[i][2]].y - pb[this.faces[i][0]].y,
			pb[this.faces[i][2]].z - pb[this.faces[i][0]].z
		);
		vb = new Vector(
			pb[this.faces[i][2]].x - pb[this.faces[i][1]].x,
			pb[this.faces[i][2]].y - pb[this.faces[i][1]].y,
			pb[this.faces[i][2]].z - pb[this.faces[i][1]].z
		);
		var vd = new Vector(
			va.y * vb.z - va.z * vb.y,
			va.z * vb.x - va.x * vb.z,
			va.x * vb.y - va.y * vb.x
		);
		vd.normalize(100);
		this.d.push(vd);
	}
	for (var i=0; i<this.faces.length-1; i++) {
		for (var j=i+1; j<this.faces.length; j++) {
			if (Math.pow(this.d[i].x + pos.x,2) + Math.pow(this.d[i].y + pos.y,2) + Math.pow(this.d[i].z + pos.z - center,2)
					> Math.pow(this.d[j].x + pos.x,2) + Math.pow(this.d[j].y + pos.y,2) + Math.pow(this.d[j].z + pos.z - center,2)) {
				var tmp = [this.faces[i], this.c[i], this.d[i]];
				this.faces[i] = this.faces[j]; this.c[i] = this.c[j]; this.d[i] = this.d[j];
				this.faces[j] = tmp[0];        this.c[j] = tmp[1];    this.d[j] = tmp[2];
			}
		}
	}
};
Cube.prototype.graph = function(view, center, type="face") {
	var l = light.new();
	l.normalize(1);
	
	// posから光源のベクトル
	var v = new Vector(
		light.x - this.pos.x,
		light.y - this.pos.y,
		light.z - this.pos.z);
	var x = view.z * (v.x) / ((v.z) - center);
	var y = view.z * (v.y) / ((v.z) - center);
	
	if (type == "face")
	for (var i in this.faces) {
		var x = view.z * (this.c[i].x) / ((this.c[i].z) - center);
		var y = view.z * (this.c[i].y) / ((this.c[i].z) - center);
		
		// 光源との角度
		var lightAng = (v.x * this.c[i].x + v.y * this.c[i].y + v.z * this.c[i].z) /
			(Math.sqrt(Math.pow(v.x,2) + Math.pow(v.y,2) + Math.pow(v.z,2))
			* Math.sqrt(Math.pow(this.c[i].x,2) + Math.pow(this.c[i].y,2) + Math.pow(this.c[i].z,2)));
		
		//ctx.fillStyle = "rgba("
		//	+(64-(this.c[i].x*l.x+this.c[i].y*l.y+this.c[i].z*l.z)+this.color.x)+","
		//	+(64-(this.c[i].x*l.x+this.c[i].y*l.y+this.c[i].z*l.z)+this.color.y)+","
		//	+(64-(this.c[i].x*l.x+this.c[i].y*l.y+this.c[i].z*l.z)+this.color.z)+",1)";
		//ctx.fillStyle = "hsl("+this.color.x+", "+this.color.y+"%, "+
		//	(60-(this.c[i].x*l.x+this.c[i].y*l.y+this.c[i].z*l.z)/10)+"%)";
		ctx.fillStyle = "hsl("+this.color.x+", "+this.color.y+"%, "+
			((100 - (lightAng + 1) * 40) / v.length() * brightness * 2)+"%)";
		
		ctx.beginPath();
		for (var j in this.faces[i]) {
			var pb = new Vector(this.pos.x + this.b[this.faces[i][j]].x,
								this.pos.y + this.b[this.faces[i][j]].y,
								this.pos.z + this.b[this.faces[i][j]].z);
			pb = rotate(pb, new Vector(0, 1, 0), camY);// カメラ回転
			pb = rotate(pb, new Vector(1, 0, 0), camX);// カメラ回転
			
			// 遠近法適用
			var x = view.z * (pb.x) / ((pb.z) - center);
			var y = view.z * (pb.y) / ((pb.z) - center);
			
			if (j == 0) ctx.moveTo(x, y);
			else ctx.lineTo(x, y);
		}
		ctx.fill();
	}
	
	if (type == "frame")
	for (var i in this.adr) {
		var pb = new Vector(this.pos.x + this.b[i].x,
							this.pos.y + this.b[i].y,
							this.pos.z + this.b[i].z);
		pb = rotate(pb, new Vector(0, 1, 0), camY);// カメラ回転
		pb = rotate(pb, new Vector(1, 0, 0), camX);// カメラ回転
		
		// 遠近法適用
		var x = view.z * (pb.x) / ((pb.z) - center);
		var y = view.z * (pb.y) / ((pb.z) - center);
		
		var adr = this.adr[i];
		for (var j in adr) {
			var pb2 = new Vector(this.pos.x + this.b[adr[j]].x,
								this.pos.y + this.b[adr[j]].y,
								this.pos.z + this.b[adr[j]].z);
			pb2 = rotate(pb2, new Vector(0, 1, 0), camY);// カメラ回転
			pb2 = rotate(pb2, new Vector(1, 0, 0), camX);// カメラ回転
			
			// 遠近法適用
			var x2 = view.z * (pb2.x) / ((pb2.z) - center);
			var y2 = view.z * (pb2.y) / ((pb2.z) - center);
			
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x2, y2);
			ctx.stroke();
		}
 	}
};