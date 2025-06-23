import { expect } from "@open-wc/testing";
import jaconv from '../../../main/ts/jaconv.ts';

describe('zenhan', function() {
  it('toHanAscii', function() {
    expect(jaconv.toHanAscii('あアｱＡA１1') ).to.equal('あアｱAA11');
    expect(jaconv.toHanAscii('“”') ).to.equal('""');
    expect(jaconv.toHanAscii('’') ).to.equal("'");
    expect(jaconv.toHanAscii('‘') ).to.equal('`');
    expect(jaconv.toHanAscii('￥') ).to.equal('\\');
  });
  it('toZenAscii', function() {
    expect(jaconv.toZenAscii('あアｱＡA１1') ).to.equal('あアｱＡＡ１１');
    expect(jaconv.toZenAscii('"') ).to.equal('”');
    expect(jaconv.toZenAscii("'") ).to.equal("’");
    expect(jaconv.toZenAscii('`') ).to.equal("‘");
    expect(jaconv.toZenAscii('\\') ).to.equal("￥");
  });
  it('toHanKana', function() {
    expect(jaconv.toHanKana('あアｱＡA１1') ).to.equal('あｱｱＡA１1');
    expect(jaconv.toHanKana('ギャ') ).to.equal('ｷﾞｬ');
    expect(jaconv.toHanKana('キ゛ャ') ).to.equal('ｷﾞｬ');
    expect(jaconv.toHanKana('ヒ゜ン') ).to.equal('ﾋﾟﾝ');
  });
  it('toZenKana', function() {
    expect(jaconv.toZenKana('あアｱＡA１1') ).to.equal('あアアＡA１1');
    expect(jaconv.toZenKana('ｷﾞｬ') ).to.equal('ギャ');
    expect(jaconv.toZenKana('ﾋﾟﾝ') ).to.equal('ピン');
  });
  it('toHan', function() {
    expect(jaconv.toHan('あアｱＡA１1') ).to.equal('あｱｱAA11');
  });
  it('toZen', function() {
    expect(jaconv.toZen('あアｱＡA１1') ).to.equal('あアアＡＡ１１');
  });
  it('normalize', function() {
    expect(jaconv.normalize('あアアＡA１1') ).to.equal('あアアAA11');
  });
});
