$(document).ready(function(){
  $('#add_rule').on('click', function() {
    $('#add_rules_form').append('<div id="rule_container"><label for="section1name">Rule Name:</label><input type="text" name="title" value=""><br><label for="section1">Content</label><br><textarea name="body" rows="4" cols="40"></textarea><br></div>')
  })

  $('#subtract_rule').on('click', function() {
    $( "#add_rules_form > #rule_container" ).last().remove()
  })
})
