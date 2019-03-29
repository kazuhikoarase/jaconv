日本語文字変換ライブラリ (javascript)
===

[online demo](https://kazuhikoarase.github.io/jaconv/demo/#%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94)

* ヘボン式ローマ字変換
* ひらがな-カタカナ変換
* 全角-半角変換 (英数記号/カタカナ)

## API Documentation

| Param | Type                | Description          |
| ----- | ------------------- | -------------------- |
| s     | <code>string</code> | a string to convert  |

#### jaconv.toHebon(s) => <code>string</code>

全角ひらがなをヘボン式ローマ字で半角英文字に変換します。

#### jaconv.toKatakana(s) => <code>string</code>

全角ひらがなを全角カタカナに変換します。

#### jaconv.toHiragana(s) => <code>string</code>

全角カタカナを全角ひらがなに変換します。

#### jaconv.toHanAscii(s) => <code>string</code>

全角英数記号を半角に変換します。

#### jaconv.toZenAscii(s) => <code>string</code>

半角英数記号を全角に変換します。

#### jaconv.toHanKana(s) => <code>string</code>

全角カタカナを半角に変換します。

#### jaconv.toZenKana(s) => <code>string</code>

半角カタカナを全角に変換します。

#### jaconv.toHan(s) => <code>string</code>

全角英数記号、カタカナを半角に変換します。
(toHanAscii, toHanKana の組み合わせ)

#### jaconv.toZen(s) => <code>string</code>

半角英数記号、カタカナを全角に変換します。
(toZenAscii, toZenKana の組み合わせ)

#### jaconv.normalize(s) => <code>string</code>

全角英数記号を半角に、半角カタカナを全角に変換します。
(toHanAscii, toZenKana の組み合わせ)
