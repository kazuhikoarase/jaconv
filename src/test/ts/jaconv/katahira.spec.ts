declare var require: any, describe : any, it : any, expect : any;

describe('katahira', function() {
  var jaconv = require('./jaconv');
  it('toKatakana', function() {
    expect(jaconv.toKatakana('あアｱＡA１1') ).toEqual('アアｱＡA１1');
  });
  it('toHiragana', function() {
    expect(jaconv.toHiragana('あアｱＡA１1') ).toEqual('ああｱＡA１1');
  });
});
