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
  test.equal(jaconv.toHanAscii('あアｱＡA１1'), 'あアｱAA11');
  test.equal(jaconv.toHanAscii('“”'), '""');
  test.equal(jaconv.toHanAscii('’'), "'");
  test.equal(jaconv.toHanAscii('‘'), '`');
  test.done();
};

exports.toZenAscii = function(test : any) {
  test.equal(jaconv.toZenAscii('あアｱＡA１1'), 'あアｱＡＡ１１');
  test.equal(jaconv.toZenAscii('"'), '”');
  test.equal(jaconv.toZenAscii("'"), "’");
  test.equal(jaconv.toZenAscii('`'), "‘");
  test.done();
};

exports.toHanKana = function(test : any) {
  test.equal(jaconv.toHanKana('あアｱＡA１1'), 'あｱｱＡA１1');
  test.equal(jaconv.toHanKana('ギャ'), 'ｷﾞｬ');
  test.done();
};

exports.toZenKana = function(test : any) {
  test.equal(jaconv.toZenKana('あアｱＡA１1'), 'あアアＡA１1');
  test.equal(jaconv.toZenKana('ｷﾞｬ'), 'ギャ');
  test.done();
};

exports.toHan = function(test : any) {
  test.equal(jaconv.toHan('あアｱＡA１1'), 'あｱｱAA11');
  test.done();
};

exports.toZen = function(test : any) {
  test.equal(jaconv.toZen('あアｱＡA１1'), 'あアアＡＡ１１');
  test.done();
};

exports.normalize = function(test : any) {
  test.equal(jaconv.normalize('あアアＡA１1'), 'あアアAA11');
  test.done();
};
