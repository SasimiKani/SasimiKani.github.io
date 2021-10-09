var index = 0;
function getIndex() {
	return index++;
}
function sortAsIndex(list, view) {
	var pb = [];
	for (var i in list) {
		p = rotate(list[i].pos, new Vector(0, 1, 0), camY);// カメラ回転
		p = rotate(p          , new Vector(1, 0, 0), camX);// カメラ回転
		pb.push(p);
	}
	for (var i=0; i<list.length-1; i++) {
		for (var k=i+1; k<list.length; k++) {
			for (var j in list) {
				if (i == list[j].index) {
					for (var l in list) {
						if (k == list[l].index) {
							if (Math.pow(pb[j].x,2) + Math.pow(pb[j].y,2) + Math.pow(pb[j].z - view.z,2)
								 < Math.pow(pb[l].x,2) + Math.pow(pb[l].y,2) + Math.pow(pb[l].z - view.z,2)) {
								
								var tmp = list[j].index;
								list[j].index = list[l].index;
								list[l].index = tmp;
							}
							break;
						}
					}
					break;
				}
			}
		}
	}
	
	return list;
}
