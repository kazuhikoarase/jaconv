//---------------------------------------------------------------------
// 日本語文字変換ライブラリ (javascript)
//
// Copyright (c) 2025 Kazuhiko Arase
//
// URL: https://github.com/kazuhikoarase/jaconv
//
// Licensed under the MIT license:
//  http://www.opensource.org/licenses/mit-license.php
//
//---------------------------------------------------------------------


import * as hebon from './jaconv/hebon';
import * as katahira from './jaconv/katahira';
import * as zenhan from './jaconv/zenhan';

export default {

  toHebon: hebon.toHebon,

  toHiragana: katahira.toHiragana,
  toKatakana: katahira.toKatakana,

  normalize: zenhan.normalize,
  toHan: zenhan.toHan,
  toHanAscii: zenhan.toHanAscii,
  toHanKana: zenhan.toHanKana,
  toZen: zenhan.toZen,
  toZenAscii: zenhan.toZenAscii,
  toZenKana: zenhan.toZenKana,
};
