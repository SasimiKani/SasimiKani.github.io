var words = [
"a","akesi","ala","alasa","ale","anpa","ante","anu","apeja","awen","e",
"en","epiku","esu","ijo","ike","ilo","insa","jaki","jan","jasima","jelo",
"jo","kala","kalama","kama","kasi","ken","kepeken","kijetesantakalu","kili","kin","kipisi",
"kiwen","ko","kokosila","kon","ku","kule","kulupu","kute","la","lanpan","lape",
"laso","lawa","leko","len","lete","li","lili","linja","lipu","loje","lon",
"luka","lukin","lupa","ma","mama","mani","meli","meso","mi","mije","misikeke",
"moku","moli","monsi","monsuta","mu","mun","musi","mute","n","namako",
"nanpa","nasa","nasin","nena","ni","nimi","noka","o","oko","olin","ona",
"open","pakala","pali","palisa","pan","pana","pi","pilin","pimeja","pini","pipi",
"poka","poki","pona","pu","sama","seli","selo","seme","sewi","sijelo","sike",
"sin","sina","sinpin","sitelen","soko","sona","soweli","suli","suno","supa","suwi",
"tan","taso","tawa","telo","tenpo","toki","tomo","tonsi","tu","unpa","uta",
"utala","walo","wan","waso","wawa","weka","wile"];


function getSuggest(s) {
	var suggests = [];
	for (var i in words) {
		var word = words[i];
		var next = false;
		for (var j in s) {
			if (word[j] != s[j]) {
				next = true;
				break;
			}
		}
		if (!next) suggests.push(word);
	}
	return suggests;
}