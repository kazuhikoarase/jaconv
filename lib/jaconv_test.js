var x_jaconv;
(function (x_jaconv) {
    !function () {
        if (typeof jaconv == 'undefined') {
            jaconv = require('./jaconv');
        }
    }();
})(x_jaconv || (x_jaconv = {}));
exports.toHebon = function (test) {
    test.equal(jaconv.toHebon('へぼんしきろーまじ'), 'HEBONSHIKIROMAJI');
    test.equal(jaconv.toHebon('にほんご'), 'NIHONGO');
    test.equal(jaconv.toHebon('にほんばし'), 'NIHOMBASHI');
    test.equal(jaconv.toHebon('いいだばし'), 'IIDABASHI');
    test.equal(jaconv.toHebon('おおいた'), 'OITA');
    test.equal(jaconv.toHebon('とうきょう'), 'TOKYO');
    test.equal(jaconv.toHebon('ろっぽんぎ'), 'ROPPONGI');
    test.equal(jaconv.toHebon('ぐんま'), 'GUMMA');
    test.equal(jaconv.toHebon('はんぷく'), 'HAMPUKU');
    test.equal(jaconv.toHebon('カタカナ'), 'カタカナ');
    test.done();
};

var x_jaconv;
(function (x_jaconv) {
    !function () {
        if (typeof jaconv == 'undefined') {
            jaconv = require('./jaconv');
        }
    }();
})(x_jaconv || (x_jaconv = {}));
exports.toKatakana = function (test) {
    test.equal(jaconv.toKatakana('あアｱＡA１1'), 'アアｱＡA１1');
    test.done();
};
exports.toHiragana = function (test) {
    test.equal(jaconv.toHiragana('あアｱＡA１1'), 'ああｱＡA１1');
    test.done();
};

var x_jaconv;
(function (x_jaconv) {
    !function () {
        if (typeof jaconv == 'undefined') {
            jaconv = require('./jaconv');
        }
    }();
})(x_jaconv || (x_jaconv = {}));
exports.toHanAscii = function (test) {
    test.equal(jaconv.toHanAscii('あアｱＡA１1'), 'あアｱAA11');
    test.equal(jaconv.toHanAscii('“”'), '""');
    test.equal(jaconv.toHanAscii('’'), "'");
    test.equal(jaconv.toHanAscii('‘'), '`');
    test.equal(jaconv.toHanAscii('￥'), '\\');
    test.done();
};
exports.toZenAscii = function (test) {
    test.equal(jaconv.toZenAscii('あアｱＡA１1'), 'あアｱＡＡ１１');
    test.equal(jaconv.toZenAscii('"'), '”');
    test.equal(jaconv.toZenAscii("'"), "’");
    test.equal(jaconv.toZenAscii('`'), "‘");
    test.equal(jaconv.toZenAscii('\\'), "￥");
    test.done();
};
exports.toHanKana = function (test) {
    test.equal(jaconv.toHanKana('あアｱＡA１1'), 'あｱｱＡA１1');
    test.equal(jaconv.toHanKana('ギャ'), 'ｷﾞｬ');
    test.equal(jaconv.toHanKana('キ゛ャ'), 'ｷﾞｬ');
    test.equal(jaconv.toHanKana('ヒ゜ン'), 'ﾋﾟﾝ');
    test.done();
};
exports.toZenKana = function (test) {
    test.equal(jaconv.toZenKana('あアｱＡA１1'), 'あアアＡA１1');
    test.equal(jaconv.toZenKana('ｷﾞｬ'), 'ギャ');
    test.equal(jaconv.toZenKana('ﾋﾟﾝ'), 'ピン');
    test.done();
};
exports.toHan = function (test) {
    test.equal(jaconv.toHan('あアｱＡA１1'), 'あｱｱAA11');
    test.done();
};
exports.toZen = function (test) {
    test.equal(jaconv.toZen('あアｱＡA１1'), 'あアアＡＡ１１');
    test.done();
};
exports.normalize = function (test) {
    test.equal(jaconv.normalize('あアアＡA１1'), 'あアアAA11');
    test.done();
};
