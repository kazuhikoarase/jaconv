declare var require: any;
declare var exports : any;

namespace x_jaconv {
  declare var jaconv : any;
  !function () {
    if (typeof jaconv == 'undefined') {
        jaconv = require('./jaconv');
    }
  }();
}

exports.toHanAscii = function(test : any) {
  test.equal(jaconv.toHanAscii("あアｱＡA１1"), 'あアｱAA11');
  test.done();
};

exports.toZenAscii = function(test : any) {
  test.equal(jaconv.toZenAscii("あアｱＡA１1"), 'あアｱＡＡ１１');
  test.done();
};

exports.toHanKana = function(test : any) {
  test.equal(jaconv.toHanKana("あアｱＡA１1"), 'あｱｱＡA１1');
  test.done();
};

exports.toZenKana = function(test : any) {
  test.equal(jaconv.toZenKana("あアｱＡA１1"), 'あアアＡA１1');
  test.done();
};

exports.toHan = function(test : any) {
  test.equal(jaconv.toHan("あアｱＡA１1"), 'あｱｱAA11');
  test.done();
};

exports.toZen = function(test : any) {
  test.equal(jaconv.toZen("あアｱＡA１1"), 'あアアＡＡ１１');
  test.done();
};

exports.normalize = function(test : any) {
  test.equal(jaconv.normalize("あアアＡA１1"), 'あアアAA11');
  test.done();
};

exports.toKatakana = function(test : any) {
  test.equal(jaconv.toKatakana("あアｱＡA１1"), 'アアｱＡA１1');
  test.done();
};

exports.toHiragana = function(test : any) {
  test.equal(jaconv.toHiragana("あアｱＡA１1"), 'ああｱＡA１1');
  test.done();
};

exports.toHebon = function(test : any) {
  test.equal(jaconv.toHebon("にほんご"), 'NIHONGO');
  test.equal(jaconv.toHebon("にほんばし"), 'NIHOMBASHI');
  test.equal(jaconv.toHebon("いいだばし"), 'IIDABASHI');
  test.equal(jaconv.toHebon("おおいた"), 'OITA');
  test.equal(jaconv.toHebon("とうきょう"), 'TOKYO');
  test.equal(jaconv.toHebon("ぐんま"), 'GUMMA');
  test.equal(jaconv.toHebon("はんぷく"), 'HAMPUKU');
  test.done();
};
