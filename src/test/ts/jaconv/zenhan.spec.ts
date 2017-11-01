declare var require: any, describe : any, it : any, expect : any;

describe('zenhan', function() {
  var jaconv = require('./jaconv');
  it('toHanAscii', function() {
    expect('あアｱAA11').toEqual(jaconv.toHanAscii('あアｱＡA１1') );
    expect('""').toEqual(jaconv.toHanAscii('“”') );
    expect( "'").toEqual(jaconv.toHanAscii('’') );
    expect('`').toEqual(jaconv.toHanAscii('‘') );
    expect('\\').toEqual(jaconv.toHanAscii('￥') );
  });
  it('toZenAscii', function() {
    expect('あアｱＡＡ１１').toEqual(jaconv.toZenAscii('あアｱＡA１1') );
    expect('”').toEqual(jaconv.toZenAscii('"') );
    expect( "’").toEqual(jaconv.toZenAscii("'") );
    expect( "‘").toEqual(jaconv.toZenAscii('`') );
    expect( "￥").toEqual(jaconv.toZenAscii('\\') );
  });
  it('toHanKana', function() {
    expect('あｱｱＡA１1').toEqual(jaconv.toHanKana('あアｱＡA１1') );
    expect('ｷﾞｬ').toEqual(jaconv.toHanKana('ギャ') );
    expect('ｷﾞｬ').toEqual(jaconv.toHanKana('キ゛ャ') );
    expect('ﾋﾟﾝ').toEqual(jaconv.toHanKana('ヒ゜ン') );
  });
  it('toZenKana', function() {
    expect('あアアＡA１1').toEqual(jaconv.toZenKana('あアｱＡA１1') );
    expect('ギャ').toEqual(jaconv.toZenKana('ｷﾞｬ') );
    expect('ピン').toEqual(jaconv.toZenKana('ﾋﾟﾝ') );
  });
  it('toHan', function() {
    expect('あｱｱAA11').toEqual(jaconv.toHan('あアｱＡA１1') );
  });
  it('toZen', function() {
    expect('あアアＡＡ１１').toEqual(jaconv.toZen('あアｱＡA１1') );
  });
  it('normalize', function() {
    expect('あアアAA11').toEqual(jaconv.normalize('あアアＡA１1') );
  });
});
