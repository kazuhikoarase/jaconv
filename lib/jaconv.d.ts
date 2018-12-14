declare namespace jaconv {
    /**
     * 全角ひらがなをヘボン式ローマ字で半角英文字に変換します。
     */
    function toHebon(s: string): string;
}
declare namespace jaconv {
    /**
     * 全角ひらがなを全角カタカナに変換します。
     */
    function toKatakana(s: string): string;
    /**
     * 全角カタカナを全角ひらがなに変換します。
     */
    function toHiragana(s: string): string;
}
declare namespace jaconv {
}
declare namespace jaconv {
    /**
     * 全角英数記号を半角に変換します。
     */
    function toHanAscii(s: string): string;
    /**
     * 半角英数記号を全角に変換します。
     */
    function toZenAscii(s: string): string;
    /**
     * 全角カタカナを半角に変換します。
     */
    function toHanKana(s: string): string;
    /**
     * 半角カタカナを全角に変換します。
     */
    function toZenKana(s: string): string;
    /**
     * 全角英数記号、カタカナを半角に変換します。
     * (toHanAscii, toHanKana の組み合わせ)
     */
    function toHan(s: string): string;
    /**
     * 半角英数記号、カタカナを全角に変換します。
     * (toZenAscii, toZenKana の組み合わせ)
     */
    function toZen(s: string): string;
    /**
     * 全角英数記号を半角に、半角カタカナを全角に変換します。
     * (toHanAscii, toZenKana の組み合わせ)
     */
    function normalize(s: string): string;
}
