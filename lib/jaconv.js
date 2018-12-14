//---------------------------------------------------------------------
// ヘボン式ローマ字変換
//
// Copyright (c) 2011 Kazuhiko Arase
//
// URL: https://github.com/kazuhikoarase/jaconv
//
// Licensed under the MIT license:
//  http://www.opensource.org/licenses/mit-license.php
//
//---------------------------------------------------------------------
var jaconv;
(function (jaconv) {
    // 'ん' は、別途ハンドリングするのでデータに含めない
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
    /**
     * 全角ひらがなをヘボン式ローマ字で半角英文字に変換します。
     */
    function toHebon(s) {
        var hebon = '';
        var lastHebon = '';
        var lastChar = '';
        var i = 0;
        while (i < s.length) {
            var hr = getHebon(s, i);
            if (hr.c == 'っ') {
                // 'っち'
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
                // B,M,P の前の 'ん' は 'M' とする。
                var nextHr = getHebon(s, i + 1);
                if (nextHr.h != null && 'BMP'.indexOf(nextHr.h.charAt(0)) != -1) {
                    hr.h = 'M';
                }
                else {
                    hr.h = 'N';
                }
            }
            else if (hr.c == 'ー') {
                // 長音は無視
                hr.h = '';
            }
            if (hr.h != null) {
                // 変換できる文字の場合
                if (lastHebon != null) {
                    // 連続する母音の除去
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
                // 変換できない文字の場合
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
    /**
     * 全角ひらがなを全角カタカナに変換します。
     */
    function toKatakana(s) {
        var res = '';
        for (var i = 0; i < s.length; i += 1) {
            var cd = s.charCodeAt(i);
            res += (minHira <= cd && cd <= maxHira) ?
                String.fromCharCode(cd - minHira + minKata) : s.charAt(i);
        }
        return res;
    }
    jaconv.toKatakana = toKatakana;
    /**
     * 全角カタカナを全角ひらがなに変換します。
     */
    function toHiragana(s) {
        var res = '';
        for (var i = 0; i < s.length; i += 1) {
            var cd = s.charCodeAt(i);
            res += (minKata <= cd && cd <= maxKata) ?
                String.fromCharCode(cd - minKata + minHira) : s.charAt(i);
        }
        return res;
    }
    jaconv.toHiragana = toHiragana;
})(jaconv || (jaconv = {}));
//---------------------------------------------------------------------
// node 
//
var jaconv;
(function (jaconv) {
    if (typeof exports === 'object') {
        module.exports = jaconv;
    }
})(jaconv || (jaconv = {}));
//---------------------------------------------------------------------
// 全角・半角変換
//
// 2005/2/26 Kazuhiko Arase
//
var jaconv;
(function (jaconv) {
    var asciiData = [
        '\u0020', '\u3000',
        '!', '！',
        // 2重引用符
        //'\"', '＂',
        '\"', '”',
        '\"', '“',
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
        // 円記号
        //'\\', '＼',
        '\\', '￥',
        ']', '］',
        '^', '＾',
        '_', '＿',
        '`', '‘',
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
                // 変換テーブルに該当無し
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
    //---------------------------------------------------------
    // 全角-半角 マッピング (ASCII)
    //
    var asciiMap = createConversionMap(asciiData);
    //---------------------------------------------------------
    // 全角-半角 マッピング (カタカナ)
    //
    var kanaMap = createConversionMap(kanaData);
    // exports
    /**
     * 全角英数記号を半角に変換します。
     */
    function toHanAscii(s) {
        return asciiMap.convert(s, true);
    }
    jaconv.toHanAscii = toHanAscii;
    /**
     * 半角英数記号を全角に変換します。
     */
    function toZenAscii(s) {
        return asciiMap.convert(s, false);
    }
    jaconv.toZenAscii = toZenAscii;
    /**
     * 全角カタカナを半角に変換します。
     */
    function toHanKana(s) {
        return kanaMap.convert(s, false);
    }
    jaconv.toHanKana = toHanKana;
    /**
     * 半角カタカナを全角に変換します。
     */
    function toZenKana(s) {
        return kanaMap.convert(s, true);
    }
    jaconv.toZenKana = toZenKana;
    /**
     * 全角英数記号、カタカナを半角に変換します。
     * (toHanAscii, toHanKana の組み合わせ)
     */
    function toHan(s) {
        return toHanAscii(toHanKana(s));
    }
    jaconv.toHan = toHan;
    /**
     * 半角英数記号、カタカナを全角に変換します。
     * (toZenAscii, toZenKana の組み合わせ)
     */
    function toZen(s) {
        return toZenAscii(toZenKana(s));
    }
    jaconv.toZen = toZen;
    /**
     * 全角英数記号を半角に、半角カタカナを全角に変換します。
     * (toHanAscii, toZenKana の組み合わせ)
     */
    function normalize(s) {
        return toHanAscii(toZenKana(s));
    }
    jaconv.normalize = normalize;
})(jaconv || (jaconv = {}));

//# sourceMappingURL=jaconv.js.map
