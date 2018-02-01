$(function() {
  
  var funcs = [
    { name: 'toHebon', desc: '全角ひらがなをヘボン式ローマ字で半角英文字に変換' },
    { name: 'toKatakana', desc: '全角ひらがなを全角カタカナに変換' },
    { name: 'toHiragana', desc: '全角カタカナを全角ひらがなに変換' },
    { name: 'toHanAscii', desc: '全角英数記号を半角に変換' },
    { name: 'toZenAscii', desc: '半角英数記号を全角に変換' },
    { name: 'toHanKana', desc: '全角カタカナを半角に変換' },
    { name: 'toZenKana', desc: '半角カタカナを全角に変換' },
    { name: 'toHan', desc: '全角英数記号、カタカナを半角に変換' },
    { name: 'toZen', desc: '半角英数記号、カタカナを全角に変換' },
    { name: 'normalize', desc: '全角英数記号を半角に、半角カタカナを全角に変換' }
  ];

  var $inTxt = $('<input type="text" />').addClass('txt').
    attr('placeholder', 'ここに文字を入力').
    on('keyup', function(event) {
      if (event.keyCode == 13) {
        // ENTER
        location.href = '#' + encodeURIComponent($inTxt.val() );
        return;
      }
      $.each(funcs, function(i, func) {
        $('#' + func.name).val(jaconv[func.name]($inTxt.val() ) );
      } );
    });
  
  var $body = $('#placeHolder').children('TBODY');
  var addRow = function($cell1, $cell2) {
    $body.append($('<tr></tr>').
        append($('<td></td>').addClass('lbl').append($cell1) ).
        append($('<td></td>').append($cell2) ) );
  };
  addRow($('<span></span>').text(''), $inTxt);
  $.each(funcs, function(i, func) {
    addRow($('<span></span>').text('jconv.' + func.name).
          attr('title', func.desc),
        $('<input type="text" />').
        addClass('txt').addClass('result').
        attr('id', func.name).
        attr('tabindex', '-1').
        prop('readonly', true) );
  });

  if (location.hash.match(/^#(.+)$/) ) {
    $inTxt.val(decodeURIComponent(location.hash.substring(1) ) ).
      trigger('keyup');
  }
  
  $inTxt.focus();
});
