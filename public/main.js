console.log('hola');

var $greeting = $('#greeting');

function changeTitle(evt) {
  $greeting.text('Hello');
  $greeting.off('click', changeTitle);
}

$greeting.on('click', changeTitle);


