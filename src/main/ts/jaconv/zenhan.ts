//---------------------------------------------------------------------
// 全角・半角変換
//
// 2005/2/26 Kazuhiko Arase
//

namespace jaconv {

  var asciiData = [

    '\u0020', '\u3000',
    '!', '！',

    // 2重引用符
    //'\"', '＂',
    '\"', '”', // 一対多の変換の逆変換は先優先
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

  declare type StringMap = { [k : string] : string };

  var createConversionMap = function(data : string[]) {

    var map1 : StringMap = {};
    var map2 : StringMap = {};

    var add = function(s1 : string, s2 : string) {
      if (!map1[s1]) {
        map1[s1] = s2;
      }
      if (!map2[s2]) {
        map2[s2] = s1;
      }
    };

    var convert = function(s :  string, reverse : boolean) {

      var map = !reverse? map1 : map2;

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
    }

    if (data.length % 2 != 0) {
      throw 'bad data length:' + data.length;
    }
    var len = data.length / 2;
    for (var i = 0; i < len; i += 1) {
      add(data[i * 2], data[i * 2 + 1]);
    }

    return { convert : convert };
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
  export function toHanAscii(s : string) {
    return asciiMap.convert(s, true);
  }

  /**
   * 半角英数記号を全角に変換します。
   */
  export function toZenAscii(s : string) {
    return asciiMap.convert(s, false);
  }

  /**
   * 全角カタカナを半角に変換します。
   */
  export function toHanKana(s : string) {
    return kanaMap.convert(s, false);
  }

  /**
   * 半角カタカナを全角に変換します。
   */
  export function toZenKana(s : string) {
    return kanaMap.convert(s, true);
  }

  /**
   * 全角英数記号、カタカナを半角に変換します。
   * (toHanAscii, toHanKana の組み合わせ)
   */
  export function toHan(s : string) {
    return toHanAscii(toHanKana(s) );
  }

  /**
   * 半角英数記号、カタカナを全角に変換します。
   * (toZenAscii, toZenKana の組み合わせ)
   */
  export function toZen(s : string) {
    return toZenAscii(toZenKana(s) );
  }

  /**
   * 全角英数記号を半角に、半角カタカナを全角に変換します。
   * (toHanAscii, toZenKana の組み合わせ)
   */
  export function normalize(s : string) {
    return toHanAscii(toZenKana(s) );
  }
}
