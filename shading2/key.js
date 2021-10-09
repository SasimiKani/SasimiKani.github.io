/*----キーイベント----*/
var key=[null];
var keyCodes = [];

function getKey(keyCode){
	var i;
	for (i=0; i<key.length; i++){
		if (key[i] == keyCode)
			return 1;
	}
	return 0;
}
function showKey(){
	console.log(key);
}
addEventListener('keydown', function(e){
	var i;
	if (
	e.keyCode != 9 &&	// Tab(9)
	e.keyCode != 18 &&	// Alt(18)
	e.keyCode != 91 &&	// Win(91)
	e.keyCode != 114 &&	// F3
	!(116 <= e.keyCode && e.keyCode <= 118) &&	// F5~F7
	!(121 <= e.keyCode && e.keyCode <= 123) &&	// F10~F12
	e.keyCode != 191 && // /
	e.keyCode != 111	// /
	){
		if (!key[0])
			key = [e.keyCode];
		else{
			for (i=0; i<key.length; i++)
				if (key[i] == e.keyCode) break;
			if (i == key.length)
				key.push(e.keyCode);
		}
	} else
		key = [null];
	
	//showKey();
});
addEventListener('keyup', function(e){
	var i;
	if (key.length == 1)
		key = [null];
	else {
		for (i=0; i<key.length; i++)
			if (key[i] == e.keyCode) break;
		key.splice(i, 1);
	}
});