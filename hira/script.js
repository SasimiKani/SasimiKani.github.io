hira = [
    'あ', 'い', 'う', 'え', 'お', 
    'か', 'き', 'く', 'け', 'こ', 
    'きゃ', 'きゅ', 'きょ', 
    'さ', 'し', 'す', 'せ', 'そ', 
    'しゃ', 'しゅ', 'しぇ', 'しょ', 
    'た', 'ち', 'つ', 'て', 'と', 
    'ちゃ', 'ちゅ', 'ちぇ', 'ちょ', 
    'な', 'に', 'ぬ', 'ね', 'の', 
    'にゃ', 'にゅ', 'にょ', 
    'は', 'ひ', 'ふ', 'へ', 'ほ', 
    'ひゃ', 'ふぃ', 'ひゅ', 'ふゅ', 'ひょ', 
    'ま', 'み', 'む', 'め', 'も', 
    'みゃ', 'みゅ', 'みょ', 
    'や', 'ゆ', 'よ', 
    'ら', 'り', 'る', 'れ', 'ろ', 
    'りゃ', 'りゅ', 'りょ', 
    'わ', 'を', 
    'ん', 'ー', '　', 
    'が', 'ぎ', 'ぐ', 'げ', 'ご', 
    'ぎゃ', 'ぎゅ', 'ぎょ', 
    'ざ', 'じ', 'ず', 'ぜ', 'ぞ', 
    'じゃ', 'じゅ', 'じぇ', 'じょ', 
    'だ', 'ぢ', 'づ', 'で', 'ど', 
    'ぢゃ', 'ぢゅ', 'ぢぇ', 'ぢょ', 
    'ば', 'び', 'ぶ', 'べ', 'ぼ', 
    'びゃ', 'びゅ', 'びょ', 
    'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ', 
    'ぴゃ', 'ぴゅ', 'ぴょ', 
    'ゃ', 'ぃ', 'ゅ', 'ぇ', 'ょ', 'っ'
];
roma = [
    'a', 'i', 'u', 'e', 'o', 
    'ka', 'ki', 'ku', 'ke', 'ko', 
    'kya', 'kyu', 'kyo', 
    'sa', 'shi', 'su', 'se', 'so', 
    'sha', 'shu', 'she', 'sho', 
    'ta', 'chi', 'tsu', 'te', 'to', 
    'cha', 'chu', 'che', 'cho', 
    'na', 'ni', 'nu', 'ne', 'no', 
    'nya', 'nyu', 'nyo', 
    'ha', 'hi', 'fu', 'he', 'ho', 
    'hya', 'fi', 'hyu', 'fu', 'hyo', 
    'ma', 'mi', 'mu', 'me', 'mo', 
    'mya', 'myu', 'myo', 
    'ya', 'yu', 'yo', 
    'ra', 'ri', 'ru', 're', 'ro', 
    'rya', 'ryu', 'ryo', 
    'wa', 'wo', 
    'nn', '', ' ', 
    'ga', 'gi', 'gu', 'ge', 'go', 
    'gya', 'gyu', 'gyo', 
    'za', 'ji', 'zu', 'ze', 'zo', 
    'ja', 'ju', 'je', 'jo', 
    'da', 'ji', 'zu', 'de', 'do', 
    'ja', 'ju', 'je', 'jo', 
    'ba', 'bi', 'bu', 'be', 'bo', 
    'bya', 'byu', 'byo', 
    'pa', 'pi', 'pu', 'pe', 'po', 
    'pya', 'pyu', 'pyo'
];

function bo(ro) {
	boin = ['a', 'i', 'u', 'e', 'o'];
	if (!(ro in [''])) {
		if (boin.indexOf(ro[ro.length-1]) > -1) {
			return ro.slice(0, -1) + hira[roma.indexOf(ro[ro.length-1])];
		} else {
			return ro;
		}
	} else {
		return ro;
	}
}

function f(s) {
	result = "";
	
	i = 0;
	
	function henkan(s_, i_) {
		c = "" // 文字
		if (i_ == s_.length-1) { // 最後の文字かどうか
			c = s_[i_];
		} else {
			if (['ゃ', 'ぃ', 'ゅ', 'ぇ', 'ょ'].indexOf(s_[i_+1]) > -1) { // 拗音の判定
				c = s_.slice(i_, i_+2);
			} else {
				c = s_[i_];
			}
		}
		return c;
	}
	while (i < s.length) {
		if (s[i] == 'っ') {
			c = henkan(s, i+1);
			idx = hira.indexOf(c);
			result += roma[idx][0];
			
			i += 1;
		} else {
			c = henkan(s, i);
			idx = hira.indexOf(c);
			result += bo(roma[idx]);
			
			i += c.length;
		}
	}
	
	return result;
}

function get_hira() {
	try {
		bf = document.querySelector("#hira").value;
		test = [...bf].map(x => hira.indexOf(x)); // ひらがな以外が入力されると-1が入る
		if (test.indexOf(-1) > -1) {
			throw new Error("ひらがなだけ入力してください");
		}
		return bf;
	} catch (e) {
		document.querySelector("#err").innerText = e.message;
		setTimeout(function() {
			document.querySelector("#err").innerText = "";
		}, 1500);
	}
}

document.querySelector("#trans").addEventListener("click", function() {
	document.querySelector("#roma").value = f(get_hira());
});
document.querySelector("#trans_rev").addEventListener("click", function() {
	document.querySelector("#roma").value = [...f(get_hira())].reverse().join('');
});

document.querySelector("#copy").addEventListener("click", function() {
	var target = document.getElementById("roma");
	target.select();
	document.execCommand("Copy");
	
	document.querySelector("#msg").innerText = "コピーしました";
	setTimeout(function() {
		document.querySelector("#msg").innerText = "";
	}, 1500);
});