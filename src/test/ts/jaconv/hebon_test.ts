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

exports.toHebon = function(test : any) {
  test.equal(jaconv.toHebon('へぼんしきローマじ'), 'HEBONSHIKIROMAJI');
  test.equal(jaconv.toHebon('にほんご'), 'NIHONGO');
  test.equal(jaconv.toHebon('にほんばし'), 'NIHOMBASHI');
  test.equal(jaconv.toHebon('いいだばし'), 'IIDABASHI');
  test.equal(jaconv.toHebon('おおいた'), 'OITA');
  test.equal(jaconv.toHebon('とうきょう'), 'TOKYO');
  test.equal(jaconv.toHebon('ろっぽんぎ'), 'ROPPONGI');
  test.equal(jaconv.toHebon('ぐんま'), 'GUMMA');
  test.equal(jaconv.toHebon('はんぷく'), 'HAMPUKU');
  test.equal(jaconv.toHebon('ピッチャー'), 'PITCHA');
  test.done();
};
