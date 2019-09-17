$(document).ready(function() {
  $('#input').click(function(event) {
    event.preventDefault();
    let firstname = $('#firstname').val();
    let lastname = $('#lastname').val();
    let username = $('#username').val();
    const gender = $('#inlineRadio').val();
    const email = $('#inputEmail').val();
    const password = $('#inputPassword').val();
    let field = $('#fieldSelect').val();
    let price = $('.form-check-input').val();
    let details = $('.form-control2').val();
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/users',
      data: {
        firstname,
        lastname,
        username,
        gender,
        email,
        password,
        field,
        price,
        details,
      },
      success: function(){
        alert('Registration Successful')
      }
   });
  });
});