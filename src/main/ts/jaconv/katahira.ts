
namespace jaconv {

  var minHira = 'ぁ'.charCodeAt(0);
  var maxHira = 'ゖ'.charCodeAt(0);
  var minKata= 'ァ'.charCodeAt(0);
  var maxKata = 'ヶ'.charCodeAt(0);

  /**
   * 全角ひらがなを全角カタカナに変換します。
   */
  export function toKatakana(s : string) {
    var res = '';
    for (var i = 0; i < s.length; i += 1) {
      var c = s.charAt(i);
      var cd = c.charCodeAt(0);
      res += (minHira <= cd && cd <= maxHira)?
        String.fromCharCode(cd - minHira + minKata) : c;
    }
    return res;
  }

  /**
   * 全角カタカナを全角ひらがなに変換します。
   */
  export function toHiragana(s : string) : string {
    var res = '';
    for (var i = 0; i < s.length; i += 1) {
      var c = s.charAt(i);
      var cd = c.charCodeAt(0);
      res += (minKata <= cd && cd <= maxKata)?
        String.fromCharCode(cd - minKata + minHira) : c;
    }
    return res;
  }
}