import { expect } from "@open-wc/testing";
import jaconv from '../../../main/ts/jaconv.ts';

describe('katahira', function() {
  it('toKatakana', function() {
    expect(jaconv.toKatakana('あアｱＡA１1') ).to.equal('アアｱＡA１1');
  });
  it('toHiragana', function() {
    expect(jaconv.toHiragana('あアｱＡA１1') ).to.equal('ああｱＡA１1');
  });
});
