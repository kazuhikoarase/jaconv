declare var require: any, describe : any, it : any, expect : any;

describe('zenhan', function() {
  var jaconv = require('./jaconv');
  it('toHanAscii', function() {
    expect(jaconv.toHanAscii('あアｱＡA１1') ).toEqual('あアｱAA11');
    expect(jaconv.toHanAscii('“”') ).toEqual('""');
    expect(jaconv.toHanAscii('’') ).toEqual("'");
    expect(jaconv.toHanAscii('‘') ).toEqual('`');
    expect(jaconv.toHanAscii('￥') ).toEqual('\\');
  });
  it('toZenAscii', function() {
    expect(jaconv.toZenAscii('あアｱＡA１1') ).toEqual('あアｱＡＡ１１');
    expect(jaconv.toZenAscii('"') ).toEqual('”');
    expect(jaconv.toZenAscii("'") ).toEqual("’");
    expect(jaconv.toZenAscii('`') ).toEqual("‘");
    expect(jaconv.toZenAscii('\\') ).toEqual("￥");
  });
  it('toHanKana', function() {
    expect(jaconv.toHanKana('あアｱＡA１1') ).toEqual('あｱｱＡA１1');
    expect(jaconv.toHanKana('ギャ') ).toEqual('ｷﾞｬ');
    expect(jaconv.toHanKana('キ゛ャ') ).toEqual('ｷﾞｬ');
    expect(jaconv.toHanKana('ヒ゜ン') ).toEqual('ﾋﾟﾝ');
  });
  it('toZenKana', function() {
    expect(jaconv.toZenKana('あアｱＡA１1') ).toEqual('あアアＡA１1');
    expect(jaconv.toZenKana('ｷﾞｬ') ).toEqual('ギャ');
    expect(jaconv.toZenKana('ﾋﾟﾝ') ).toEqual('ピン');
  });
  it('toHan', function() {
    expect(jaconv.toHan('あアｱＡA１1') ).toEqual('あｱｱAA11');
  });
  it('toZen', function() {
    expect(jaconv.toZen('あアｱＡA１1') ).toEqual('あアアＡＡ１１');
  });
  it('normalize', function() {
    expect(jaconv.normalize('あアアＡA１1') ).toEqual('あアアAA11');
  });
});
