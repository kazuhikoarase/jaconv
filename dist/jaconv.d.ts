declare const _default: {
    toHebon: typeof hebon.toHebon;
    toHiragana: typeof katahira.toHiragana;
    toKatakana: typeof katahira.toKatakana;
    normalize: typeof zenhan.normalize;
    toHan: typeof zenhan.toHan;
    toHanAscii: typeof zenhan.toHanAscii;
    toHanKana: typeof zenhan.toHanKana;
    toZen: typeof zenhan.toZen;
    toZenAscii: typeof zenhan.toZenAscii;
    toZenKana: typeof zenhan.toZenKana;
};
export default _default;

declare namespace hebon {
    export {
        toHebon
    }
}

declare namespace katahira {
    export {
        toKatakana,
        toHiragana
    }
}

/**
 * 全角英数記号を半角に、半角カタカナを全角に変換します。
 * (toHanAscii, toZenKana の組み合わせ)
 */
declare function normalize(s: string): string;

/**
 * 全角英数記号、カタカナを半角に変換します。
 * (toHanAscii, toHanKana の組み合わせ)
 */
declare function toHan(s: string): string;

/**
 * 全角英数記号を半角に変換します。
 */
declare function toHanAscii(s: string): string;

/**
 * 全角カタカナを半角に変換します。
 */
declare function toHanKana(s: string): string;

/**
 * 全角ひらがなをヘボン式ローマ字で半角英文字に変換します。
 */
declare function toHebon(s: string): string;

/**
 * 全角カタカナを全角ひらがなに変換します。
 */
declare function toHiragana(s: string): string;

/**
 * 全角ひらがなを全角カタカナに変換します。
 */
declare function toKatakana(s: string): string;

/**
 * 半角英数記号、カタカナを全角に変換します。
 * (toZenAscii, toZenKana の組み合わせ)
 */
declare function toZen(s: string): string;

/**
 * 半角英数記号を全角に変換します。
 */
declare function toZenAscii(s: string): string;

/**
 * 半角カタカナを全角に変換します。
 */
declare function toZenKana(s: string): string;

declare namespace zenhan {
    export {
        toHanAscii,
        toZenAscii,
        toHanKana,
        toZenKana,
        toHan,
        toZen,
        normalize
    }
}

export { }
