package com.d_project.jaconv;

import org.junit.Assert;
import org.junit.Test;

public class JaConvTest {

  @Test
  public void toHebon() {
    Assert.assertEquals("HEBONSHIKIROMAJI", JaConv.toHebon("へぼんしきろーまじ") );
    Assert.assertEquals("NIHONGO", JaConv.toHebon("にほんご") );
    Assert.assertEquals("NIHOMBASHI", JaConv.toHebon("にほんばし") );
    Assert.assertEquals("IIDABASHI", JaConv.toHebon("いいだばし") );
    Assert.assertEquals("OITA", JaConv.toHebon("おおいた") );
    Assert.assertEquals("TOKYO", JaConv.toHebon("とうきょう") );
    Assert.assertEquals("ROPPONGI", JaConv.toHebon("ろっぽんぎ") );
    Assert.assertEquals("GUMMA", JaConv.toHebon("ぐんま") );
    Assert.assertEquals("HAMPUKU", JaConv.toHebon("はんぷく") );
    Assert.assertEquals("カタカナ", JaConv.toHebon("カタカナ") );
  }

  @Test
  public void toKatakana() {
    Assert.assertEquals("アアｱＡA１1", JaConv.toKatakana("あアｱＡA１1") );
  }

  @Test
  public void toHiragana() {
    Assert.assertEquals("ああｱＡA１1", JaConv.toHiragana("あアｱＡA１1") );
  }

  @Test
  public void toHanAscii() {
    Assert.assertEquals("あアｱAA11", JaConv.toHanAscii("あアｱＡA１1") );
    Assert.assertEquals("\"\"", JaConv.toHanAscii("“”") );
    Assert.assertEquals("'", JaConv.toHanAscii("’") );
    Assert.assertEquals("`", JaConv.toHanAscii("‘") );
    Assert.assertEquals("\\", JaConv.toHanAscii("￥") );
  }

  @Test
  public void toZenAscii() {
    Assert.assertEquals("あアｱＡＡ１１", JaConv.toZenAscii("あアｱＡA１1") );
    Assert.assertEquals("”", JaConv.toZenAscii("\"") );
    Assert.assertEquals("’", JaConv.toZenAscii("'") );
    Assert.assertEquals("‘", JaConv.toZenAscii("`") );
    Assert.assertEquals("￥", JaConv.toZenAscii("\\") );
  }  

  @Test
  public void toHanKana() {
    Assert.assertEquals("あｱｱＡA１1", JaConv.toHanKana("あアｱＡA１1") );
    Assert.assertEquals("ｷﾞｬ", JaConv.toHanKana("ギャ") );
    Assert.assertEquals("ｷﾞｬ", JaConv.toHanKana("キ゛ャ") );
    Assert.assertEquals("ﾋﾟﾝ", JaConv.toHanKana("ヒ゜ン") );
  }

  @Test
  public void toZenKana() {
    Assert.assertEquals("あアアＡA１1", JaConv.toZenKana("あアｱＡA１1") );
    Assert.assertEquals("ギャ", JaConv.toZenKana("ｷﾞｬ") );
    Assert.assertEquals("ピン", JaConv.toZenKana("ﾋﾟﾝ") );
  }

  @Test
  public void toHan() {
    Assert.assertEquals("あｱｱAA11", JaConv.toHan("あアｱＡA１1") );
  }
}
