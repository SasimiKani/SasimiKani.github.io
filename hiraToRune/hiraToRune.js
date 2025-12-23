let hira = ["あ", "い", "う", "え", "お", "きゃ", "きゅ", "きょ", "か", "き", "く", "け", "こ", "ぎゃ", "ぎゅ", "ぎょ", "が", "ぎ", "ぐ", "げ", "ご", "しゃ", "しゅ", "しょ", "さ", "し", "す", "せ", "そ", "じゃ", "じゅ", "じょ", "ざ", "じ", "ず", "ぜ", "ぞ", "ちゃ", "ち", "ちゅ", "ちぇ", "ちょ", "ぢゃ", "ぢ", "ぢゅ", "ぢぇ", "ぢょ", "つぁ", "つぃ", "つ", "つぇ", "つぉ", "た", "てぃ", "とぅ", "て", "と", "だ", "でぃ", "どぅ", "で", "ど", "にゃ", "にゅ", "にょ", "な", "に", "ぬ", "ね", "の", "ひゃ", "ひゅ", "ひょ", "ふぁ", "ふぃ", "ふぇ", "ふぉ", "は", "ひ", "ふ", "へ", "ほ", "びゃ", "びゅ", "びょ", "ゔぁ", "ゔぃ", "ゔ", "ゔぇ", "ゔぉ", "ば", "び", "ぶ", "べ", "ぼ", "ぴゃ", "ぴゅ", "ぴょ", "ぱ", "ぴ", "ぷ", "ぺ", "ぽ", "みゃ", "みゅ", "みょ", "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "りゃ", "りゅ", "りょ", "ら", "り", "る", "れ", "ろ", "わ", "を", "ん", "ー", "　", ]

let roma = ["a", "i", "u", "e", "o", "kya", "kyu", "kyo", "ka", "ki", "ku", "ke", "ko", "gya", "gyu", "gyo", "ga", "gi", "gu", "ge", "go", "sha", "shu", "sho", "sa", "shi", "su", "se", "so", "ja", "ju", "jo", "za", "ji", "zu", "ze", "zo", "cha", "chi", "chu", "che", "cho", "dya", "di", "dyu", "dye", "dyo", "tsa", "tsi", "tsu", "tse", "tso", "ta", "thi", "twu", "te", "to", "da", "dhi", "dwu", "de", "do", "nya", "nyu", "nyo", "na", "ni", "nu", "ne", "no", "hya", "hyu", "hyo", "fa", "fi", "fe", "fo", "ha", "hi", "fu", "he", "ho", "bya", "byu", "byo", "va", "vi", "vu", "ve", "vo", "ba", "bi", "bu", "be", "bo", "pya", "pyu", "pyo", "pa", "pi", "pu", "pe", "po", "mya", "myu", "myo", "ma", "mi", "mu", "me", "mo", "ya", "yu", "yo", "rya", "ryu", "ryo", "ra", "ri", "ru", "re", "ro", "wa", "wo", "n", "", " ", ]

let rune = {
	"a": "ᚨ",
	"b": "ᛒ",
	"ch": "ᛏ",
	"d": "ᛞ",
	"e": "ᛖ",
	"f": "ᚠ",
	"g": "ᚷ",
	"h": "ᚺ",
	"i": "ᛁ",
	"j": "ᛃ",
	"k": "ᚲ",
	"m": "ᛗ",
	"n": "ᚾ",
	"o": "ᛟ",
	"p": "ᛈ",
	"r": "ᚱ",
	"s": "ᛊ",
	"t": "ᛏ",
	"u": "ᚢ",
	"v": "ᚠ",
	"w": "ᚹ",
	"y": "ᛃ",
	"z": "ᛉ", 
}

function hiraToRune(str) {
	hira.forEach((c, i) => {
		str = str.replaceAll(c, roma[i])
	})
	Object.keys(rune).forEach(a => {
		str = str.replaceAll(a, rune[a])
	})
	str = str.replace(/っ(.)/g, "$1$1");
	return str
}

document.getElementById("hira").addEventListener("input", (e) => {
	document.getElementById("rune").value = hiraToRune(e.target.value);
})

/*

ᚠ	ᚢ	ᚦ	ᚨ	ᚱ	ᚲ	ᚷ	ᚹ
f	u	th	a	r	k	g	w

ᚺ	ᚾ	ᛁ	ᛃ	ᛇ	ᛈ	ᛉ	ᛊ
h	n	i	j	e	p	z	s

ᛏ	ᛒ	ᛖ	ᛗ	ᛚ	ᛜ	ᛟ	ᛞ
t	b	e	m	l	ng	o	d

*/