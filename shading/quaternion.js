
var Vector = function(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
	
	this.new = function() {
		return new Vector(this.x, this.y, this.z);
	}
	
	this.getQuaternion = function() {
		return new Quaternion(0, this.x, this.y, this.z);
	}
};
var Quaternion = function(a, b, c, d) {
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
	
	// 共役
	this.conj = function() {
		return new Quaternion(this.a, -this.b, -this.c, -this.d);
	}
	// 乗算
	this.mul = function(q) {
		var pa = this.a;
		var pb = this.b;
		var pc = this.c;
		var pd = this.d;
		
		this.a = pa * q.a - pb * q.b - pc * q.c - pd * q.d;
		this.b = pa * q.b + pb * q.a + pc * q.d - pd * q.c;
		this.c = pa * q.c - pb * q.d + pc * q.a + pd * q.b;
		this.d = pa * q.d + pb * q.c - pc * q.b + pd * q.a;
		
		// めも
		// (2 + 3i + 4j + 5k)(6 + 7i + 8j + 9k)
		// 2*6 + 2*7i + 2*8j + 2*9k
		// + 3*6i - 3*7 + 3*8k - 3*9j
		// + 4*6j - 4*7k - 4*8 + 4*9i
		// + 5*6k + 5*7j - 5*8i - 5*9
	}
	// 加算
	this.add = function(q) {
		this.a += q.a;
		this.b += q.b;
		this.c += q.c;
		this.d += q.d;
	}
	this.getVector = function() {
		return new Vector(this.b, this.c, this.d);
	}
};

// 長さ
Vector.prototype.length = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
};

// 正規化
Vector.prototype.normalize = function (thickness) {
    var l = this.length();
    if(l) {
        this.scale(thickness / l);
    } else {
        this.z = thickness;
    }
};

// 比率
Vector.prototype.scale = function (s) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
};

// 回転
function rotate(p, u, ang) {
	var a = p.getQuaternion();
	
	var nu = new Vector(u.x, u.y, u.z);
	nu.normalize(1);
	var c = new Quaternion(Math.cos(ang * Math.PI / 180 / 2), 0, 0, 0);
	var s = new Quaternion(Math.sin(ang * Math.PI / 180 / 2), 0, 0, 0);
	var q = nu.getQuaternion();
	q.mul(s);
	q.add(c);
	var qc = q.conj();
	
	q.mul(a);
	q.mul(qc);
	
	return q.getVector();
}