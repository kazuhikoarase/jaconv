declare var require: any, describe : any, it : any, expect : any;

describe('hebon', function() {
  var jaconv = require('./jaconv');
  it('toHebon', function() {
    expect(jaconv.toHebon('へぼんしきろーまじ') ).toEqual('HEBONSHIKIROMAJI');
    expect(jaconv.toHebon('にほんご') ).toEqual('NIHONGO');
    expect(jaconv.toHebon('にほんばし') ).toEqual('NIHOMBASHI');
    expect(jaconv.toHebon('いいだばし') ).toEqual('IIDABASHI');
    expect(jaconv.toHebon('おおいた') ).toEqual('OITA');
    expect(jaconv.toHebon('とうきょう') ).toEqual('TOKYO');
    expect(jaconv.toHebon('ろっぽんぎ') ).toEqual('ROPPONGI');
    expect(jaconv.toHebon('ぐんま') ).toEqual('GUMMA');
    expect(jaconv.toHebon('はんぷく') ).toEqual('HAMPUKU');
    expect(jaconv.toHebon('カタカナ') ).toEqual('カタカナ');
  });
});
