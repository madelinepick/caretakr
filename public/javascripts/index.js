
$(function(){
  $('.loginswitch').on('click', function(){
    console.log('working');
    $('.login').show();
    $('.signup').hide();
  })

})

$(function(){
  $('.signupswitch').on('click', function(){
    $('.login').hide();
    $('.signup').show();
  })

})

$(function(){
  var activediv = $(location).attr('hash') 
    if (activediv){
      $('.login').show();
      $('.signup').hide();
      console.log(activediv)
    }

})
