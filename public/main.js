//
$(document).ready(function(){

  var $greeting = $('#greeting');

  function changeText() {
    $greeting.text('Hello');
  }
  $greeting.on('click', changeText);
});

