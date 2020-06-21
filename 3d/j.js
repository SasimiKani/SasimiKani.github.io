function g_box(x, y, z, l){
	var i, j, m, p=[];
	for (i=0; i<360; i+=180){
		for (j=0; j<360; j+=90){
			m = rotation(l, l, l, j, 1, 0, 0);
			m = rotation(m[0], m[1], m[2], i, 0, 1, 0);
			p.push(new point_3d(m[0]+x, m[1]+y, m[2]+z));
		}
	}
	for (i=0; i<2; i++){
		polygon([p[0+i*4], p[1+i*4], p[2+i*4]]);
		polygon([p[0+i*4], p[3+i*4], p[2+i*4]]);
		polygon([p[0+i*4], p[(7+i*4)%8], p[(6+i*4)%8]]);
		polygon([p[0+i*4], p[(1+i*4)%8], p[(6+i*4)%8]]);
		polygon([p[1+i*4], p[2+i*4], p[(6+i*4)%8]]);
		polygon([p[0+i*4], p[3+i*4], p[(4+i*4)%8]]);
	}
}

function g_sphere(x, y, z, r, a){
	var i, j, m, p=[], aa=a*2+1;
	for (i=0; i<=180; i+=180/a){
		for (j=-180; j<=180; j+=180/a){
			m = rotation(0,0,r, i, 1,0,0);
			m = rotation(m[0], m[1], m[2], j, 0,0,1);
			p.push(new point_3d(m[0]+x, m[1]+y, m[2]+z));
		}
	}
	for (i=0; i<a; i++){
		for (j=0; j<a*2; j++){
			polygon([p[i*aa+j], p[i*aa+j+1], p[(i+1)*aa+j]]);
			polygon([p[i*aa+j+1], p[(i+1)*aa+j+1], p[(i+1)*aa+j]]);
		}
	}
}