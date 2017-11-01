describe('hebon', function () {
    var jaconv = require('./jaconv');
    it('toHebon', function () {
        expect('HEBONSHIKIROMAJI').toEqual(jaconv.toHebon('へぼんしきろーまじ'));
        expect('NIHONGO').toEqual(jaconv.toHebon('にほんご'));
        expect('NIHOMBASHI').toEqual(jaconv.toHebon('にほんばし'));
        expect('IIDABASHI').toEqual(jaconv.toHebon('いいだばし'));
        expect('OITA').toEqual(jaconv.toHebon('おおいた'));
        expect('TOKYO').toEqual(jaconv.toHebon('とうきょう'));
        expect('ROPPONGI').toEqual(jaconv.toHebon('ろっぽんぎ'));
        expect('GUMMA').toEqual(jaconv.toHebon('ぐんま'));
        expect('HAMPUKU').toEqual(jaconv.toHebon('はんぷく'));
        expect('カタカナ').toEqual(jaconv.toHebon('カタカナ'));
    });
});

describe('katahira', function () {
    var jaconv = require('./jaconv');
    it('toKatakana', function () {
        expect('アアｱＡA１1').toEqual(jaconv.toKatakana('あアｱＡA１1'));
    });
    it('toHiragana', function () {
        expect('ああｱＡA１1').toEqual(jaconv.toHiragana('あアｱＡA１1'));
    });
});

describe('zenhan', function () {
    var jaconv = require('./jaconv');
    it('toHanAscii', function () {
        expect('あアｱAA11').toEqual(jaconv.toHanAscii('あアｱＡA１1'));
        expect('""').toEqual(jaconv.toHanAscii('“”'));
        expect("'").toEqual(jaconv.toHanAscii('’'));
        expect('`').toEqual(jaconv.toHanAscii('‘'));
        expect('\\').toEqual(jaconv.toHanAscii('￥'));
    });
    it('toZenAscii', function () {
        expect('あアｱＡＡ１１').toEqual(jaconv.toZenAscii('あアｱＡA１1'));
        expect('”').toEqual(jaconv.toZenAscii('"'));
        expect("’").toEqual(jaconv.toZenAscii("'"));
        expect("‘").toEqual(jaconv.toZenAscii('`'));
        expect("￥").toEqual(jaconv.toZenAscii('\\'));
    });
    it('toHanKana', function () {
        expect('あｱｱＡA１1').toEqual(jaconv.toHanKana('あアｱＡA１1'));
        expect('ｷﾞｬ').toEqual(jaconv.toHanKana('ギャ'));
        expect('ｷﾞｬ').toEqual(jaconv.toHanKana('キ゛ャ'));
        expect('ﾋﾟﾝ').toEqual(jaconv.toHanKana('ヒ゜ン'));
    });
    it('toZenKana', function () {
        expect('あアアＡA１1').toEqual(jaconv.toZenKana('あアｱＡA１1'));
        expect('ギャ').toEqual(jaconv.toZenKana('ｷﾞｬ'));
        expect('ピン').toEqual(jaconv.toZenKana('ﾋﾟﾝ'));
    });
    it('toHan', function () {
        expect('あｱｱAA11').toEqual(jaconv.toHan('あアｱＡA１1'));
    });
    it('toZen', function () {
        expect('あアアＡＡ１１').toEqual(jaconv.toZen('あアｱＡA１1'));
    });
    it('normalize', function () {
        expect('あアアAA11').toEqual(jaconv.normalize('あアアＡA１1'));
    });
});
