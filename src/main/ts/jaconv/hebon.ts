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

namespace jaconv {

  // 'ん' は、別途ハンドリングするのでデータに含めない
  var hebonMap : { [ hiragana : string ] : string } = {
    'あ':'A','い':'I','う':'U','え':'E','お':'O',
    'か':'KA','き':'KI','く':'KU','け':'KE','こ':'KO',
    'さ':'SA','し':'SHI','す':'SU','せ':'SE','そ':'SO',
    'た':'TA','ち':'CHI','つ':'TSU','て':'TE','と':'TO',
    'な':'NA','に':'NI','ぬ':'NU','ね':'NE','の':'NO',
    'は':'HA','ひ':'HI','ふ':'FU','へ':'HE','ほ':'HO',
    'ま':'MA','み':'MI','む':'MU','め':'ME','も':'MO',
    'や':'YA','ゆ':'YU','よ':'YO',
    'ら':'RA','り':'RI','る':'RU','れ':'RE','ろ':'RO',
    'わ':'WA','ゐ':'I','ゑ':'E','を':'O',
    'ぁ':'A','ぃ':'I','ぅ':'U','ぇ':'E','ぉ':'O',
    'が':'GA','ぎ':'GI','ぐ':'GU','げ':'GE','ご':'GO',
    'ざ':'ZA','じ':'JI','ず':'ZU','ぜ':'ZE','ぞ':'ZO',
    'だ':'DA','ぢ':'JI','づ':'ZU','で':'DE','ど':'DO',
    'ば':'BA','び':'BI','ぶ':'BU','べ':'BE','ぼ':'BO',
    'ぱ':'PA','ぴ':'PI','ぷ':'PU','ぺ':'PE','ぽ':'PO',
    'きゃ':'KYA','きゅ':'KYU','きょ':'KYO',
    'しゃ':'SHA','しゅ':'SHU','しょ':'SHO',
    'ちゃ':'CHA','ちゅ':'CHU','ちょ':'CHO','ちぇ':'CHE',
    'にゃ':'NYA','にゅ':'NYU','にょ':'NYO',
    'ひゃ':'HYA','ひゅ':'HYU','ひょ':'HYO',
    'みゃ':'MYA','みゅ':'MYU','みょ':'MYO',
    'りゃ':'RYA','りゅ':'RYU','りょ':'RYO',
    'ぎゃ':'GYA','ぎゅ':'GYU','ぎょ':'GYO',
    'じゃ':'JA','じゅ':'JU','じょ':'JO',
    'びゃ':'BYA','びゅ':'BYU','びょ':'BYO',
    'ぴゃ':'PYA','ぴゅ':'PYU','ぴょ':'PYO'
  };

  var aaSet : { [ aa : string ] : boolean } = {
    'AA': true, 'EE': true, 'II': false, // I は連続しても省略しない
    'OO': true, 'OU': true, 'UU': true
  };

  var getHebon = function(s : string, index : number) {
    var h : string = null;
    var c : string = null;
    if (index + 1 < s.length) {
      c = s.substring(index, index + 2);
      h = hebonMap[c];
    }
    if (!h && index < s.length) {
      c = s.substring(index, index + 1);
      h = hebonMap[c];
    }
    return {c: c, h: h || null};
  };

  /**
   * 全角ひらがなをヘボン式ローマ字で半角英文字に変換します。
   */
  export function toHebon(s : string) {

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
          } else {
            hr.h = nextHr.h.substring(0, 1);
          }
        }

      } else if (hr.c == 'ん') {

        // B,M,P の前の 'ん' は 'M' とする。
        var nextHr = getHebon(s, i + 1);
        if (nextHr.h != null && 'BMP'.indexOf(nextHr.h.charAt(0) ) != -1) {
          hr.h = 'M';
        } else {
          hr.h = 'N';
        }

      } else if (hr.c == 'ー') {

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

      } else {

        // 変換できない文字の場合
        hebon += hr.c;
      }

      lastHebon = hr.h;
      lastChar = hr.c;
      i += hr.c.length;
    }

    return hebon;
  }
}
