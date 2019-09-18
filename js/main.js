$(document).ready(function() {
  // Registration function 
  $('#input').click(function(event) {
    event.preventDefault();
    let firstname = $('#firstname').val();
    let lastname = $('#lastname').val();
    let username = $('#username').val();
    let state = $('#state').val();
    let age = $('#age').val();
    const gender = $('#inlineRadio').val();
    const email = $('#inputEmail').val();
    const password = $('#inputPassword').val();
    let field = $('#fieldSelect').val();
    let price = $('#exampleRadios').val();
    let details = $('.form-control2').val();
    if(!firstname){
      alert("Fill up required fields")
    } else {
      $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/users',
        data: {
          firstname,
          lastname,
          username,
          state,
          age,
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
   };
  });
  // Sign-in function 
  $('.loginBtn').click(function(event){
    event.preventDefault();
    const emailLogin = $('#emailLogin').val();
    const passwordLogin = $('#passwordLogin').val();
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/users?email=${emailLogin}&password=${passwordLogin}`,
      data: {
        email: emailLogin,
        password: passwordLogin,
      },
      success: function(response){
        if (response.length){
          $('.loginMsg').html('Login successful');
          localStorage.setItem('email', emailLogin);
            $('.loginBtn').click(function () {
              $('.profile-form').fadeIn();
            });
        } else {
          $('.loginMsg').html('Username or password incorrect');
        }
      }
    })
  })
});