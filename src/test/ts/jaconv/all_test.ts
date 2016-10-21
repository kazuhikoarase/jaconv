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

exports.toHan = function(test : any) {
  test.equal(jaconv.toHan("あアｱＡA１1"), 'あｱｱAA11');
  test.done();
};

exports.toZen = function(test : any) {
  test.equal(jaconv.toZen("あアｱＡA１1"), 'あアアＡＡ１１');
  test.done();
};

exports.toHebon = function(test : any) {
  test.equal(jaconv.toHebon("にほんばし"), 'NIHOMBASHI');
  test.equal(jaconv.toHebon("いいだばし"), 'IIDABASHI');
  test.equal(jaconv.toHebon("おおいた"), 'OITA');
  test.equal(jaconv.toHebon("とうきょう"), 'TOKYO');
  test.done();
};

