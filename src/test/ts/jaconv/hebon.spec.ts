import { expect } from "@open-wc/testing";
import jaconv from '../../../main/ts/jaconv.ts';

describe('hebon', function() {
  it('toHebon', function() {
    expect(jaconv.toHebon('へぼんしきろーまじ') ).to.equal('HEBONSHIKIROMAJI');
    expect(jaconv.toHebon('にほんご') ).to.equal('NIHONGO');
    expect(jaconv.toHebon('にほんばし') ).to.equal('NIHOMBASHI');
    expect(jaconv.toHebon('いいだばし') ).to.equal('IIDABASHI');
    expect(jaconv.toHebon('おおいた') ).to.equal('OITA');
    expect(jaconv.toHebon('とうきょう') ).to.equal('TOKYO');
    expect(jaconv.toHebon('ろっぽんぎ') ).to.equal('ROPPONGI');
    expect(jaconv.toHebon('ぐんま') ).to.equal('GUMMA');
    expect(jaconv.toHebon('はんぷく') ).to.equal('HAMPUKU');
    expect(jaconv.toHebon('カタカナ') ).to.equal('カタカナ');
  });
});
