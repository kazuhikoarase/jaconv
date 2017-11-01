declare var require: any, describe : any, it : any, expect : any;

describe('hebon', function() {
  var jaconv = require('./jaconv');
  it('toHebon', function() {
    expect('HEBONSHIKIROMAJI').toEqual(jaconv.toHebon('へぼんしきろーまじ') );
    expect('NIHONGO').toEqual(jaconv.toHebon('にほんご') );
    expect('NIHOMBASHI').toEqual(jaconv.toHebon('にほんばし') );
    expect('IIDABASHI').toEqual(jaconv.toHebon('いいだばし') );
    expect('OITA').toEqual(jaconv.toHebon('おおいた') );
    expect('TOKYO').toEqual(jaconv.toHebon('とうきょう') );
    expect('ROPPONGI').toEqual(jaconv.toHebon('ろっぽんぎ') );
    expect('GUMMA').toEqual(jaconv.toHebon('ぐんま') );
    expect('HAMPUKU').toEqual(jaconv.toHebon('はんぷく') );
    expect('カタカナ').toEqual(jaconv.toHebon('カタカナ') );
  });
});
