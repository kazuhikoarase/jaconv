package com.d_project.jaconv;

import java.util.HashMap;
import java.util.Map;

/**
 * JaConv
 * @author kazuhiko arase
 */
@SuppressWarnings({"serial", "unused"})
public class JaConv {

  private JaConv() {
  }

  protected static class JMap<K, V> extends HashMap<K, V> {
    JMap<K, V> _(K k, V v) { put(k, v); return this; }
  }

  // 'ん' は、別途ハンドリングするのでデータに含めない
  private static final Map<String,String> hebonMap =
    new JMap<String,String>().
    _("あ", "A")._("い", "I")._("う", "U")._("え", "E")._("お", "O").
    _("か", "KA")._("き", "KI")._("く", "KU")._("け", "KE")._("こ", "KO").
    _("さ", "SA")._("し", "SHI")._("す", "SU")._("せ", "SE")._("そ", "SO").
    _("た", "TA")._("ち", "CHI")._("つ", "TSU")._("て", "TE")._("と", "TO").
    _("な", "NA")._("に", "NI")._("ぬ", "NU")._("ね", "NE")._("の", "NO").
    _("は", "HA")._("ひ", "HI")._("ふ", "FU")._("へ", "HE")._("ほ", "HO").
    _("ま", "MA")._("み", "MI")._("む", "MU")._("め", "ME")._("も", "MO").
    _("や", "YA")._("ゆ", "YU")._("よ", "YO").
    _("ら", "RA")._("り", "RI")._("る", "RU")._("れ", "RE")._("ろ", "RO").
    _("わ", "WA")._("ゐ", "I")._("ゑ", "E")._("を", "O").
    _("ぁ", "A")._("ぃ", "I")._("ぅ", "U")._("ぇ", "E")._("ぉ", "O").
    _("が", "GA")._("ぎ", "GI")._("ぐ", "GU")._("げ", "GE")._("ご", "GO").
    _("ざ", "ZA")._("じ", "JI")._("ず", "ZU")._("ぜ", "ZE")._("ぞ", "ZO").
    _("だ", "DA")._("ぢ", "JI")._("づ", "ZU")._("で", "DE")._("ど", "DO").
    _("ば", "BA")._("び", "BI")._("ぶ", "BU")._("べ", "BE")._("ぼ", "BO").
    _("ぱ", "PA")._("ぴ", "PI")._("ぷ", "PU")._("ぺ", "PE")._("ぽ", "PO").
    _("きゃ", "KYA")._("きゅ", "KYU")._("きょ", "KYO").
    _("しゃ", "SHA")._("しゅ", "SHU")._("しょ", "SHO").
    _("ちゃ", "CHA")._("ちゅ", "CHU")._("ちょ", "CHO")._("ちぇ", "CHE").
    _("にゃ", "NYA")._("にゅ", "NYU")._("にょ", "NYO").
    _("ひゃ", "HYA")._("ひゅ", "HYU")._("ひょ", "HYO").
    _("みゃ", "MYA")._("みゅ", "MYU")._("みょ", "MYO").
    _("りゃ", "RYA")._("りゅ", "RYU")._("りょ", "RYO").
    _("ぎゃ", "GYA")._("ぎゅ", "GYU")._("ぎょ", "GYO").
    _("じゃ", "JA")._("じゅ", "JU")._("じょ", "JO").
    _("びゃ", "BYA")._("びゅ", "BYU")._("びょ", "BYO").
    _("ぴゃ", "PYA")._("ぴゅ", "PYU")._("ぴょ","PYO");

  private static final Map<String,Boolean> aaSet =
    new JMap<String,Boolean>().
    _("AA", true)._("EE", true)._("II", false). // I は連続しても省略しない
    _("OO", true)._("OU", true)._("UU", true);

  protected static Hebon getHebon(String s, int index) {
    String h = null;
    String c = null;
    if (index + 1 < s.length() ) {
      c = s.substring(index, index + 2);
      h = hebonMap.get(c);
    }
    if (h == null && index < s.length() ) {
      c = s.substring(index, index + 1);
      h = hebonMap.get(c);
    }
    return new Hebon(c, h);
  }

  protected static class Hebon {
    public String c;
    public String h;
    public Hebon(String c, String h) {
      this.c = c;
      this.h = h;
    }
  }

  /**
   * 全角ひらがなをヘボン式ローマ字で半角英文字に変換します。
   */
  public static String toHebon(String s) {

    StringBuilder hebon = new StringBuilder();
    String lastHebon = "";
    String lastChar = "";
    int i = 0;

    while (i < s.length() ) {

      Hebon hr = getHebon(s, i);

      if (hr.c.equals("っ") ) {

        // 'っち'
        Hebon nextHr = getHebon(s, i + 1);
        if (nextHr.h != null) {
          if (nextHr.h.indexOf("CH") == 0) {
            hr.h = "T";
          } else {
            hr.h = nextHr.h.substring(0, 1);
          }
        }

      } else if (hr.c.equals("ん") ) {

        // B,M,P の前の 'ん' は 'M' とする。
        Hebon nextHr = getHebon(s, i + 1);
        if (nextHr.h != null && "BMP".indexOf(nextHr.h.charAt(0) ) != -1) {
          hr.h = "M";
        } else {
          hr.h = "N";
        }

      } else if (hr.c.equals("ー") ) {

        // 長音は無視
        hr.h = "";
      }

      if (hr.h != null) {

        // 変換できる文字の場合
        if (lastHebon != null) {

          // 連続する母音の除去
          String htest = lastHebon + hr.h;
          if (htest.length() > 2) {
            htest = htest.substring(htest.length() - 2);
          }
          Boolean b = aaSet.get(htest);
          if (b != null && b.booleanValue() ) {
            hr.h = "";
          }
        }

        hebon.append(hr.h);

      } else {

        // 変換できない文字の場合
        hebon.append(hr.c);
      }

      lastHebon = hr.h;
      lastChar = hr.c;
      i += hr.c.length();
    }

    return hebon.toString();
  }

  private static final char minHira = 'ぁ';
  private static final char maxHira = 'ゖ';
  private static final char minKata= 'ァ';
  private static final char maxKata = 'ヶ';

  /**
   * 全角ひらがなを全角カタカナに変換します。
   */
  public static String toKatakana(String s) {
    StringBuilder res = new StringBuilder();
    for (int i = 0; i < s.length(); i += 1) {
      char c = s.charAt(i);
      res.append( (minHira <= c && c <= maxHira)?
          (char)(c - minHira + minKata) : s.charAt(i) );
    }
    return res.toString();
  }

  /**
   * 全角カタカナを全角ひらがなに変換します。
   */
  public static String toHiragana(String s) {
    StringBuilder res = new StringBuilder();
    for (int i = 0; i < s.length(); i += 1) {
      char c = s.charAt(i);
      res.append( (minKata <= c && c <= maxKata)?
          (char)(c - minKata + minHira) : s.charAt(i) );
    }
    return res.toString();
  }

  //---------------------------------------------------------
  // 全角-半角 マッピング (ASCII)
  //

  private static final ConversionMap asciiMap;

  //---------------------------------------------------------
  // 全角-半角 マッピング (カタカナ)
  //

  private static final ConversionMap kanaMap;

  static {

    String[] asciiData = {

      "\u0020", "\u3000",
      "!", "！",

      // 2重引用符
      //"\"", "＂",
      "\"", "”", // 一対多の変換の逆変換は先優先
      "\"", "“",

      "#", "＃",
      "$", "＄",
      "%", "％",
      "&", "＆",
      "\'", "’",
      "(", "（",
      ")", "）",
      "*", "＊",
      "+", "＋",
      ",", "，",
      "-", "－",
      ".", "．",
      "/", "／",
      "0", "０",
      "1", "１",
      "2", "２",
      "3", "３",
      "4", "４",
      "5", "５",
      "6", "６",
      "7", "７",
      "8", "８",
      "9", "９",
      ":", "：",
      ";", "；",
      "<", "＜",
      "=", "＝",
      ">", "＞",
      "?", "？",
      "@", "＠",
      "A", "Ａ",
      "B", "Ｂ",
      "C", "Ｃ",
      "D", "Ｄ",
      "E", "Ｅ",
      "F", "Ｆ",
      "G", "Ｇ",
      "H", "Ｈ",
      "I", "Ｉ",
      "J", "Ｊ",
      "K", "Ｋ",
      "L", "Ｌ",
      "M", "Ｍ",
      "N", "Ｎ",
      "O", "Ｏ",
      "P", "Ｐ",
      "Q", "Ｑ",
      "R", "Ｒ",
      "S", "Ｓ",
      "T", "Ｔ",
      "U", "Ｕ",
      "V", "Ｖ",
      "W", "Ｗ",
      "X", "Ｘ",
      "Y", "Ｙ",
      "Z", "Ｚ",
      "[", "［",

      // 円記号
      //"\\", "＼",
      "\\", "￥",

      "]", "］",
      "^", "＾",
      "_", "＿",
      "`", "‘",
      "a", "ａ",
      "b", "ｂ",
      "c", "ｃ",
      "d", "ｄ",
      "e", "ｅ",
      "f", "ｆ",
      "g", "ｇ",
      "h", "ｈ",
      "i", "ｉ",
      "j", "ｊ",
      "k", "ｋ",
      "l", "ｌ",
      "m", "ｍ",
      "n", "ｎ",
      "o", "ｏ",
      "p", "ｐ",
      "q", "ｑ",
      "r", "ｒ",
      "s", "ｓ",
      "t", "ｔ",
      "u", "ｕ",
      "v", "ｖ",
      "w", "ｗ",
      "x", "ｘ",
      "y", "ｙ",
      "z", "ｚ",
      "{", "｛",
      "|", "｜",
      "}", "｝",
      "~", "～"
    };

    String[] kanaData = {
      "。", "｡",
      "「", "｢",
      "」", "｣",
      "、", "､",
      "・", "･",
      "ヲ", "ｦ",

      "ァ", "ｧ",
      "ィ", "ｨ",
      "ゥ", "ｩ",
      "ェ", "ｪ",
      "ォ", "ｫ",

      "ャ", "ｬ",
      "ュ", "ｭ",
      "ョ", "ｮ",

      "ッ", "ｯ",

      "ー", "ｰ",

      "ア", "ｱ",
      "イ", "ｲ",
      "ウ", "ｳ",
      "エ", "ｴ",
      "オ", "ｵ",

      "カ", "ｶ",
      "キ", "ｷ",
      "ク", "ｸ",
      "ケ", "ｹ",
      "コ", "ｺ",

      "ガ", "ｶﾞ",
      "ギ", "ｷﾞ",
      "グ", "ｸﾞ",
      "ゲ", "ｹﾞ",
      "ゴ", "ｺﾞ",

      "サ", "ｻ",
      "シ", "ｼ",
      "ス", "ｽ",
      "セ", "ｾ",
      "ソ", "ｿ",

      "ザ", "ｻﾞ",
      "ジ", "ｼﾞ",
      "ズ", "ｽﾞ",
      "ゼ", "ｾﾞ",
      "ゾ", "ｿﾞ",

      "タ", "ﾀ",
      "チ", "ﾁ",
      "ツ", "ﾂ",
      "テ", "ﾃ",
      "ト", "ﾄ",

      "ダ", "ﾀﾞ",
      "ヂ", "ﾁﾞ",
      "ヅ", "ﾂﾞ",
      "デ", "ﾃﾞ",
      "ド", "ﾄﾞ",

      "ナ", "ﾅ",
      "ニ", "ﾆ",
      "ヌ", "ﾇ",
      "ネ", "ﾈ",
      "ノ", "ﾉ",

      "ハ", "ﾊ",
      "ヒ", "ﾋ",
      "フ", "ﾌ",
      "ヘ", "ﾍ",
      "ホ", "ﾎ",

      "バ", "ﾊﾞ",
      "ビ", "ﾋﾞ",
      "ブ", "ﾌﾞ",
      "ベ", "ﾍﾞ",
      "ボ", "ﾎﾞ",

      "パ", "ﾊﾟ",
      "ピ", "ﾋﾟ",
      "プ", "ﾌﾟ",
      "ペ", "ﾍﾟ",
      "ポ", "ﾎﾟ",

      "マ", "ﾏ",
      "ミ", "ﾐ",
      "ム", "ﾑ",
      "メ", "ﾒ",
      "モ", "ﾓ",

      "ヤ", "ﾔ",
      "ユ", "ﾕ",
      "ヨ", "ﾖ",

      "ラ", "ﾗ",
      "リ", "ﾘ",
      "ル", "ﾙ",
      "レ", "ﾚ",
      "ロ", "ﾛ",

      "ワ", "ﾜ",
      "ン", "ﾝ",

      "ヴ", "ｳﾞ",

      "゛", "ﾞ",
      "゜", "ﾟ",

      "ヰ", "ｲ",
      "ヱ", "ｴ",
      "ヮ", "ﾜ",
      "ヵ", "ｶ",
      "ヶ", "ｹ"
    };

    asciiMap = new ConversionMap(asciiData);
    kanaMap = new ConversionMap(kanaData);
  }

  /**
   * 全角英数記号を半角に変換します。
   */
  public static String toHanAscii(String s) {
    return asciiMap.convert(s, true);
  }

  /**
   * 半角英数記号を全角に変換します。
   */
  public static String toZenAscii(String s) {
    return asciiMap.convert(s, false);
  }

  /**
   * 全角カタカナを半角に変換します。
   */
  public static String toHanKana(String s) {
    return kanaMap.convert(s, false);
  }

  /**
   * 半角カタカナを全角に変換します。
   */
  public static String toZenKana(String s) {
    return kanaMap.convert(s, true);
  }

  /**
   * 全角英数記号、カタカナを半角に変換します。
   * (toHanAscii, toHanKana の組み合わせ)
   */
  public static String toHan(String s) {
    return toHanAscii(toHanKana(s) );
  }

  /**
   * 半角英数記号、カタカナを全角に変換します。
   * (toZenAscii, toZenKana の組み合わせ)
   */
  public static String toZen(String s) {
    return toZenAscii(toZenKana(s) );
  }

  /**
   * 全角英数記号を半角に、半角カタカナを全角に変換します。
   * (toHanAscii, toZenKana の組み合わせ)
   */
  public static String normalize(String s) {
    return toHanAscii(toZenKana(s) );
  }

  protected static class ConversionMap {

    private Map<String,String> map1 = new HashMap<String, String>();
    private Map<String,String> map2 = new HashMap<String, String>();

    public ConversionMap(String[] data) {
      if (data.length % 2 != 0) {
        throw new IllegalArgumentException("bad data length:" + data.length);
      }
      int len = data.length / 2;
      for (int i = 0; i < len; i += 1) {
        add(data[i * 2], data[i * 2 + 1]);
      }
    }

    protected void add(String s1, String s2) {
      if (!map1.containsKey(s1) ) {
        map1.put(s1, s2);
      }
      if (!map2.containsKey(s2) ) {
        map2.put(s2, s1);
      }
    }

    public String convert(String s, boolean reverse) {

      Map<String,String> map = !reverse? map1 : map2;

      StringBuilder converted = new StringBuilder();

      for (int i = 0; i < s.length(); i += 1) {

        if (i + 1 < s.length() ) {
          String c = map.get(s.substring(i, i + 2) );
          if (c != null) {
            converted.append(c);
            i += 1;
            continue;
          }
        }

        String c = map.get(s.substring(i, i + 1) );
        if (c != null) {
          converted.append(c);
          continue;
        }

        // 変換テーブルに該当無し
        converted.append(s.substring(i, i + 1) );
      }

      return converted.toString();
    }
  }
}
