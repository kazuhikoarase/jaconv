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

exports.jaconv = function(test : any) {
  test.equal(jaconv.toHan("あアｱＡA１1"), 'あｱｱAA11');
  test.equal(jaconv.toZen("あアｱＡA１1"), 'あアアＡＡ１１');
  test.done();
};
