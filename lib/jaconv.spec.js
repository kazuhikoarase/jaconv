describe('hebon', function () {
    var jaconv = require('./jaconv');
    it('toHebon', function () {
        expect(jaconv.toHebon('へぼんしきろーまじ')).toEqual('HEBONSHIKIROMAJI');
        expect(jaconv.toHebon('にほんご')).toEqual('NIHONGO');
        expect(jaconv.toHebon('にほんばし')).toEqual('NIHOMBASHI');
        expect(jaconv.toHebon('いいだばし')).toEqual('IIDABASHI');
        expect(jaconv.toHebon('おおいた')).toEqual('OITA');
        expect(jaconv.toHebon('とうきょう')).toEqual('TOKYO');
        expect(jaconv.toHebon('ろっぽんぎ')).toEqual('ROPPONGI');
        expect(jaconv.toHebon('ぐんま')).toEqual('GUMMA');
        expect(jaconv.toHebon('はんぷく')).toEqual('HAMPUKU');
        expect(jaconv.toHebon('カタカナ')).toEqual('カタカナ');
    });
});
describe('katahira', function () {
    var jaconv = require('./jaconv');
    it('toKatakana', function () {
        expect(jaconv.toKatakana('あアｱＡA１1')).toEqual('アアｱＡA１1');
    });
    it('toHiragana', function () {
        expect(jaconv.toHiragana('あアｱＡA１1')).toEqual('ああｱＡA１1');
    });
});
describe('zenhan', function () {
    var jaconv = require('./jaconv');
    it('toHanAscii', function () {
        expect(jaconv.toHanAscii('あアｱＡA１1')).toEqual('あアｱAA11');
        expect(jaconv.toHanAscii('“”')).toEqual('""');
        expect(jaconv.toHanAscii('’')).toEqual("'");
        expect(jaconv.toHanAscii('‘')).toEqual('`');
        expect(jaconv.toHanAscii('￥')).toEqual('\\');
    });
    it('toZenAscii', function () {
        expect(jaconv.toZenAscii('あアｱＡA１1')).toEqual('あアｱＡＡ１１');
        expect(jaconv.toZenAscii('"')).toEqual('”');
        expect(jaconv.toZenAscii("'")).toEqual("’");
        expect(jaconv.toZenAscii('`')).toEqual("‘");
        expect(jaconv.toZenAscii('\\')).toEqual("￥");
    });
    it('toHanKana', function () {
        expect(jaconv.toHanKana('あアｱＡA１1')).toEqual('あｱｱＡA１1');
        expect(jaconv.toHanKana('ギャ')).toEqual('ｷﾞｬ');
        expect(jaconv.toHanKana('キ゛ャ')).toEqual('ｷﾞｬ');
        expect(jaconv.toHanKana('ヒ゜ン')).toEqual('ﾋﾟﾝ');
    });
    it('toZenKana', function () {
        expect(jaconv.toZenKana('あアｱＡA１1')).toEqual('あアアＡA１1');
        expect(jaconv.toZenKana('ｷﾞｬ')).toEqual('ギャ');
        expect(jaconv.toZenKana('ﾋﾟﾝ')).toEqual('ピン');
    });
    it('toHan', function () {
        expect(jaconv.toHan('あアｱＡA１1')).toEqual('あｱｱAA11');
    });
    it('toZen', function () {
        expect(jaconv.toZen('あアｱＡA１1')).toEqual('あアアＡＡ１１');
    });
    it('normalize', function () {
        expect(jaconv.normalize('あアアＡA１1')).toEqual('あアアAA11');
    });
});

//# sourceMappingURL=jaconv.spec.js.map
