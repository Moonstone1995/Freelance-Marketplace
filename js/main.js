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
    if(!firstname||!lastname||!username||!email||!password||!details){
      alert("Fill up required fields");
      return;
    }; 
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/users?email=${email}`,
      data: {email,},    
      success: function(response){
        if (response.length){
          $('.signupMsg').html('User already exists');
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
              alert('Registration Successful');
              window.location.assign('profile.html')
            }
          })
        }
      }    
    });
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
          alert('You are logged in');            
          window.location.assign('profile.html');
        } else {
          $('.loginMsg').html('Username or password incorrect');
        }
      }
    })
  })
})
