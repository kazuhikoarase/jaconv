declare var require: any, describe : any, it : any, expect : any;

describe('katahira', function() {
  var jaconv = require('./jaconv');
  it('toKatakana', function() {
    expect('アアｱＡA１1').toEqual(jaconv.toKatakana('あアｱＡA１1') );
  });
  it('toHiragana', function() {
    expect('ああｱＡA１1').toEqual(jaconv.toHiragana('あアｱＡA１1') );
  });
});
