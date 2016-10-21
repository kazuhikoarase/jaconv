var jaconv;
(function (jaconv) {
    var hebonMap = {
        'あ': 'A', 'い': 'I', 'う': 'U', 'え': 'E', 'お': 'O',
        'か': 'KA', 'き': 'KI', 'く': 'KU', 'け': 'KE', 'こ': 'KO',
        'さ': 'SA', 'し': 'SHI', 'す': 'SU', 'せ': 'SE', 'そ': 'SO',
        'た': 'TA', 'ち': 'CHI', 'つ': 'TSU', 'て': 'TE', 'と': 'TO',
        'な': 'NA', 'に': 'NI', 'ぬ': 'NU', 'ね': 'NE', 'の': 'NO',
        'は': 'HA', 'ひ': 'HI', 'ふ': 'FU', 'へ': 'HE', 'ほ': 'HO',
        'ま': 'MA', 'み': 'MI', 'む': 'MU', 'め': 'ME', 'も': 'MO',
        'や': 'YA', 'ゆ': 'YU', 'よ': 'YO',
        'ら': 'RA', 'り': 'RI', 'る': 'RU', 'れ': 'RE', 'ろ': 'RO',
        'わ': 'WA', 'ゐ': 'I', 'ゑ': 'E', 'を': 'O',
        'ぁ': 'A', 'ぃ': 'I', 'ぅ': 'U', 'ぇ': 'E', 'ぉ': 'O',
        'が': 'GA', 'ぎ': 'GI', 'ぐ': 'GU', 'げ': 'GE', 'ご': 'GO',
        'ざ': 'ZA', 'じ': 'JI', 'ず': 'ZU', 'ぜ': 'ZE', 'ぞ': 'ZO',
        'だ': 'DA', 'ぢ': 'JI', 'づ': 'ZU', 'で': 'DE', 'ど': 'DO',
        'ば': 'BA', 'び': 'BI', 'ぶ': 'BU', 'べ': 'BE', 'ぼ': 'BO',
        'ぱ': 'PA', 'ぴ': 'PI', 'ぷ': 'PU', 'ぺ': 'PE', 'ぽ': 'PO',
        'きゃ': 'KYA', 'きゅ': 'KYU', 'きょ': 'KYO',
        'しゃ': 'SHA', 'しゅ': 'SHU', 'しょ': 'SHO',
        'ちゃ': 'CHA', 'ちゅ': 'CHU', 'ちょ': 'CHO', 'ちぇ': 'CHE',
        'にゃ': 'NYA', 'にゅ': 'NYU', 'にょ': 'NYO',
        'ひゃ': 'HYA', 'ひゅ': 'HYU', 'ひょ': 'HYO',
        'みゃ': 'MYA', 'みゅ': 'MYU', 'みょ': 'MYO',
        'りゃ': 'RYA', 'りゅ': 'RYU', 'りょ': 'RYO',
        'ぎゃ': 'GYA', 'ぎゅ': 'GYU', 'ぎょ': 'GYO',
        'じゃ': 'JA', 'じゅ': 'JU', 'じょ': 'JO',
        'びゃ': 'BYA', 'びゅ': 'BYU', 'びょ': 'BYO',
        'ぴゃ': 'PYA', 'ぴゅ': 'PYU', 'ぴょ': 'PYO'
    };
    var aaSet = {
        'AA': true, 'EE': true, 'II': false,
        'OO': true, 'OU': true, 'UU': true
    };
    var getHebon = function (s, index) {
        var h = null;
        var c = null;
        if (index + 1 < s.length) {
            c = s.substring(index, index + 2);
            h = hebonMap[c];
        }
        if (!h && index < s.length) {
            c = s.substring(index, index + 1);
            h = hebonMap[c];
        }
        return { c: c, h: h || null };
    };
    function toHebon(s) {
        s = jaconv.toHiragana(jaconv.toZenKana(s));
        var hebon = '';
        var lastHebon = '';
        var lastChar = '';
        var i = 0;
        while (i < s.length) {
            var hr = getHebon(s, i);
            if (hr.c == 'っ') {
                var nextHr = getHebon(s, i + 1);
                if (nextHr.h != null) {
                    if (nextHr.h.indexOf('CH') == 0) {
                        hr.h = 'T';
                    }
                    else {
                        hr.h = nextHr.h.substring(0, 1);
                    }
                }
            }
            else if (hr.c == 'ん') {
                var nextHr = getHebon(s, i + 1);
                if (nextHr.h != null && 'BMP'.indexOf(nextHr.h.charAt(0)) != -1) {
                    hr.h = 'M';
                }
                else {
                    hr.h = 'N';
                }
            }
            else if (hr.c == 'ー') {
                hr.h = '';
            }
            if (hr.h != null) {
                if (lastHebon != null) {
                    var htest = lastHebon + hr.h;
                    if (htest.length > 2) {
                        htest = htest.substring(htest.length - 2);
                    }
                    if (aaSet[htest]) {
                        hr.h = '';
                    }
                }
                hebon += hr.h;
            }
            else {
                hebon += hr.c;
            }
            lastHebon = hr.h;
            lastChar = hr.c;
            i += hr.c.length;
        }
        return hebon;
    }
    jaconv.toHebon = toHebon;
})(jaconv || (jaconv = {}));
var jaconv;
(function (jaconv) {
    var minHira = 'ぁ'.charCodeAt(0);
    var maxHira = 'ゖ'.charCodeAt(0);
    var minKata = 'ァ'.charCodeAt(0);
    var maxKata = 'ヶ'.charCodeAt(0);
    function toKatakana(s) {
        var res = '';
        for (var i = 0; i < s.length; i += 1) {
            var c = s.charAt(i);
            var cd = c.charCodeAt(0);
            res += (minHira <= cd && cd <= maxHira) ?
                String.fromCharCode(cd - minHira + minKata) : c;
        }
        return res;
    }
    jaconv.toKatakana = toKatakana;
    function toHiragana(s) {
        var res = '';
        for (var i = 0; i < s.length; i += 1) {
            var c = s.charAt(i);
            var cd = c.charCodeAt(0);
            res += (minKata <= cd && cd <= maxKata) ?
                String.fromCharCode(cd - minKata + minHira) : c;
        }
        return res;
    }
    jaconv.toHiragana = toHiragana;
})(jaconv || (jaconv = {}));
var jaconv;
(function (jaconv_1) {
    var asciiData = [
        '\u0020', '\u3000',
        '!', '！',
        '\"', '“',
        '\"', '”',
        '#', '＃',
        '$', '＄',
        '%', '％',
        '&', '＆',
        '\'', '’',
        '(', '（',
        ')', '）',
        '*', '＊',
        '+', '＋',
        ',', '，',
        '-', '－',
        '.', '．',
        '/', '／',
        '0', '０',
        '1', '１',
        '2', '２',
        '3', '３',
        '4', '４',
        '5', '５',
        '6', '６',
        '7', '７',
        '8', '８',
        '9', '９',
        ':', '：',
        ';', '；',
        '<', '＜',
        '=', '＝',
        '>', '＞',
        '?', '？',
        '@', '＠',
        'A', 'Ａ',
        'B', 'Ｂ',
        'C', 'Ｃ',
        'D', 'Ｄ',
        'E', 'Ｅ',
        'F', 'Ｆ',
        'G', 'Ｇ',
        'H', 'Ｈ',
        'I', 'Ｉ',
        'J', 'Ｊ',
        'K', 'Ｋ',
        'L', 'Ｌ',
        'M', 'Ｍ',
        'N', 'Ｎ',
        'O', 'Ｏ',
        'P', 'Ｐ',
        'Q', 'Ｑ',
        'R', 'Ｒ',
        'S', 'Ｓ',
        'T', 'Ｔ',
        'U', 'Ｕ',
        'V', 'Ｖ',
        'W', 'Ｗ',
        'X', 'Ｘ',
        'Y', 'Ｙ',
        'Z', 'Ｚ',
        '[', '［',
        '\\', '￥',
        ']', '］',
        '^', '＾',
        '_', '＿',
        '`', '‘',
        '`', '’',
        'a', 'ａ',
        'b', 'ｂ',
        'c', 'ｃ',
        'd', 'ｄ',
        'e', 'ｅ',
        'f', 'ｆ',
        'g', 'ｇ',
        'h', 'ｈ',
        'i', 'ｉ',
        'j', 'ｊ',
        'k', 'ｋ',
        'l', 'ｌ',
        'm', 'ｍ',
        'n', 'ｎ',
        'o', 'ｏ',
        'p', 'ｐ',
        'q', 'ｑ',
        'r', 'ｒ',
        's', 'ｓ',
        't', 'ｔ',
        'u', 'ｕ',
        'v', 'ｖ',
        'w', 'ｗ',
        'x', 'ｘ',
        'y', 'ｙ',
        'z', 'ｚ',
        '{', '｛',
        '|', '｜',
        '}', '｝',
        '~', '～'
    ];
    var kanaData = [
        '。', '｡',
        '「', '｢',
        '」', '｣',
        '、', '､',
        '・', '･',
        'ヲ', 'ｦ',
        'ァ', 'ｧ',
        'ィ', 'ｨ',
        'ゥ', 'ｩ',
        'ェ', 'ｪ',
        'ォ', 'ｫ',
        'ャ', 'ｬ',
        'ュ', 'ｭ',
        'ョ', 'ｮ',
        'ッ', 'ｯ',
        'ー', 'ｰ',
        'ア', 'ｱ',
        'イ', 'ｲ',
        'ウ', 'ｳ',
        'エ', 'ｴ',
        'オ', 'ｵ',
        'カ', 'ｶ',
        'キ', 'ｷ',
        'ク', 'ｸ',
        'ケ', 'ｹ',
        'コ', 'ｺ',
        'ガ', 'ｶﾞ',
        'ギ', 'ｷﾞ',
        'グ', 'ｸﾞ',
        'ゲ', 'ｹﾞ',
        'ゴ', 'ｺﾞ',
        'サ', 'ｻ',
        'シ', 'ｼ',
        'ス', 'ｽ',
        'セ', 'ｾ',
        'ソ', 'ｿ',
        'ザ', 'ｻﾞ',
        'ジ', 'ｼﾞ',
        'ズ', 'ｽﾞ',
        'ゼ', 'ｾﾞ',
        'ゾ', 'ｿﾞ',
        'タ', 'ﾀ',
        'チ', 'ﾁ',
        'ツ', 'ﾂ',
        'テ', 'ﾃ',
        'ト', 'ﾄ',
        'ダ', 'ﾀﾞ',
        'ヂ', 'ﾁﾞ',
        'ヅ', 'ﾂﾞ',
        'デ', 'ﾃﾞ',
        'ド', 'ﾄﾞ',
        'ナ', 'ﾅ',
        'ニ', 'ﾆ',
        'ヌ', 'ﾇ',
        'ネ', 'ﾈ',
        'ノ', 'ﾉ',
        'ハ', 'ﾊ',
        'ヒ', 'ﾋ',
        'フ', 'ﾌ',
        'ヘ', 'ﾍ',
        'ホ', 'ﾎ',
        'バ', 'ﾊﾞ',
        'ビ', 'ﾋﾞ',
        'ブ', 'ﾌﾞ',
        'ベ', 'ﾍﾞ',
        'ボ', 'ﾎﾞ',
        'パ', 'ﾊﾟ',
        'ピ', 'ﾋﾟ',
        'プ', 'ﾌﾟ',
        'ペ', 'ﾍﾟ',
        'ポ', 'ﾎﾟ',
        'マ', 'ﾏ',
        'ミ', 'ﾐ',
        'ム', 'ﾑ',
        'メ', 'ﾒ',
        'モ', 'ﾓ',
        'ヤ', 'ﾔ',
        'ユ', 'ﾕ',
        'ヨ', 'ﾖ',
        'ラ', 'ﾗ',
        'リ', 'ﾘ',
        'ル', 'ﾙ',
        'レ', 'ﾚ',
        'ロ', 'ﾛ',
        'ワ', 'ﾜ',
        'ン', 'ﾝ',
        'ヴ', 'ｳﾞ',
        '゛', 'ﾞ',
        '゜', 'ﾟ',
        'ヰ', 'ｲ',
        'ヱ', 'ｴ',
        'ヮ', 'ﾜ',
        'ヵ', 'ｶ',
        'ヶ', 'ｹ'
    ];
    var createConversionMap = function (data) {
        var map1 = {};
        var map2 = {};
        var add = function (s1, s2) {
            if (!map1[s1]) {
                map1[s1] = s2;
            }
            if (!map2[s2]) {
                map2[s2] = s1;
            }
        };
        var convert = function (s, reverse) {
            var map = !reverse ? map1 : map2;
            var converted = '';
            for (var i = 0; i < s.length; i += 1) {
                if (i + 1 < s.length) {
                    var c = map[s.substring(i, i + 2)];
                    if (c) {
                        converted += c;
                        i += 1;
                        continue;
                    }
                }
                var c = map[s.substring(i, i + 1)];
                if (c) {
                    converted += c;
                    continue;
                }
                converted += s.substring(i, i + 1);
            }
            return converted;
        };
        if (data.length % 2 != 0) {
            throw 'bad data length:' + data.length;
        }
        var len = data.length / 2;
        for (var i = 0; i < len; i += 1) {
            add(data[i * 2], data[i * 2 + 1]);
        }
        return { convert: convert };
    };
    var asciiMap = createConversionMap(asciiData);
    var kanaMap = createConversionMap(kanaData);
    function toHanAscii(s) {
        return asciiMap.convert(s, true);
    }
    jaconv_1.toHanAscii = toHanAscii;
    function toZenAscii(s) {
        return asciiMap.convert(s, false);
    }
    jaconv_1.toZenAscii = toZenAscii;
    function toHanKana(s) {
        return kanaMap.convert(s, false);
    }
    jaconv_1.toHanKana = toHanKana;
    function toZenKana(s) {
        return kanaMap.convert(s, true);
    }
    jaconv_1.toZenKana = toZenKana;
    function toHan(s) {
        return toHanAscii(toHanKana(s));
    }
    jaconv_1.toHan = toHan;
    function toZen(s) {
        return toZenAscii(toZenKana(s));
    }
    jaconv_1.toZen = toZen;
    function normalize(s) {
        return toHanAscii(toZenKana(s));
    }
    jaconv_1.normalize = normalize;
    !function (jaconv) {
        if (typeof exports === 'object') {
            module.exports = jaconv;
        }
    }(jaconv);
})(jaconv || (jaconv = {}));
