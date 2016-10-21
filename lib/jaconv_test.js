var x_jaconv;
(function (x_jaconv) {
    !function () {
        if (typeof jaconv == 'undefined') {
            jaconv = require('./jaconv');
        }
    }();
})(x_jaconv || (x_jaconv = {}));
exports.toHan = function (test) {
    test.equal(jaconv.toHan("あアｱＡA１1"), 'あｱｱAA11');
    test.done();
};
exports.toZen = function (test) {
    test.equal(jaconv.toZen("あアｱＡA１1"), 'あアアＡＡ１１');
    test.done();
};
exports.toHebon = function (test) {
    test.equal(jaconv.toHebon("にほんばし"), 'NIHOMBASHI');
    test.equal(jaconv.toHebon("いいだばし"), 'IIDABASHI');
    test.equal(jaconv.toHebon("おおいた"), 'OITA');
    test.equal(jaconv.toHebon("とうきょう"), 'TOKYO');
    test.done();
};
