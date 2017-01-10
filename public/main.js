console.log('Hello');

var $greeting = $('#greeting').on('click', function(){
  $(this).text('Hello from main.js');
});

