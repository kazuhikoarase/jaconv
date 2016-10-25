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

exports.toKatakana = function(test : any) {
  test.equal(jaconv.toKatakana('あアｱＡA１1'), 'アアｱＡA１1');
  test.done();
};

exports.toHiragana = function(test : any) {
  test.equal(jaconv.toHiragana('あアｱＡA１1'), 'ああｱＡA１1');
  test.done();
};
