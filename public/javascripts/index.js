$(function(){
  $('.loginswitch').on('click', function(){
    console.log('working');
    $('.login').show();
    $('.signup').hide();
  })
  $('.signupswitch').on('click', function(){
    console.log('working');
    $('.signup').show();
    $('.login').hide();
  })
})
