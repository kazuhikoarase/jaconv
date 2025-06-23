//---------------------------------------------------------------------
// カタカナ・ひらがな変換
//
// 2025/6/23 Kazuhiko Arase
//

const minHira = 'ぁ'.charCodeAt(0);
const maxHira = 'ゖ'.charCodeAt(0);
const minKata= 'ァ'.charCodeAt(0);
const maxKata = 'ヶ'.charCodeAt(0);

/**
 * 全角ひらがなを全角カタカナに変換します。
 */
export function toKatakana(s : string) {
  let res = '';
  for (let i = 0; i < s.length; i += 1) {
    const cd = s.charCodeAt(i);
    res += (minHira <= cd && cd <= maxHira)?
      String.fromCharCode(cd - minHira + minKata) : s.charAt(i);
  }
  return res;
}

/**
 * 全角カタカナを全角ひらがなに変換します。
 */
export function toHiragana(s : string) {
  let res = '';
  for (let i = 0; i < s.length; i += 1) {
    const cd = s.charCodeAt(i);
    res += (minKata <= cd && cd <= maxKata)?
      String.fromCharCode(cd - minKata + minHira) : s.charAt(i);
  }
  return res;
}
