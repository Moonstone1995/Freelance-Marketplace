$(document).ready(function() {
  // Registration function 
  $('#input').click(function(event) {
    event.preventDefault();
    let firstname = $('#firstname').val();
    let lastname = $('#lastname').val();
    let username = $('#username').val();
    let state = $('#state').val();
    let age = $('#age').val();
    const gender = $('input[name=RadioOptions]:checked').val();
    const email = $('#inputEmail').val();
    const password = $('#inputPassword').val();
    let field = $('#fieldSelect').val();
    let price = $('input[name=exampleRadios]:checked').val();
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
              window.location.assign('signin.html')
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
          localStorage.setItem('email', emailLogin);
          alert('Login successful');            
          window.location.assign('profile.html');
        } else {
          $('.loginMsg').html('Username or password incorrect');
        }
      }
    })
  });
  
  // Creating a profile card 
  function profileCard(){
    $.ajax({
      method:'GET',
      url: `http://localhost:3000/users`,
      success: function (response){
        let emailAddress = window.localStorage.getItem('email');
        $.each(response, function(index, value) {
          if(value.email == emailAddress) {
            profileCard = ''
            profileCard += `<p>Name: ${value.firstname} ${value.lastname}</p>
            <p>Username: ${value.username}</p>
            <p>Gender: ${value.gender}</p>
            <p>Email: ${value.email}</p>
            <p>Field: ${value.field}</p>
            <p>Price: ${value.price}</p>
            <p>Details: ${value.details}</p>`;
            $('.profile-card').append(profileCard);
          }
        })        
      }
    })
  }
  profileCard();  

  // Update function 
  // $('.updateBtn').click(function() {
  //   event.preventDefault();
  //   $.ajax({
  //     method: 'PATCH',
  //     url: `http://localhost:3000/users/10`, //The id has to be included 
  //     data: {firstname: "Michelle", lastname: "Joe"},
  //     success: function(response){
  //       console.log(response);
  //     }
  //   })
  // })


  //Delete function 
  // $('.deleteBtn').click(function(){
  //   event.preventDefault();
  //   $.ajax({
  //     type:'GET',
  //     url: `http://localhost:3000/users/`,
  //     data: {_method: 'DELETE'},
  //     success: function (response){
  //       console.log(response);
  //         delete response;
  //         alert('Delete Successful');
  //         // window.location.assign('index.html')          
  //     }
  //   })
  // })
  
  //Logout function
  $('.logoutBtn').click(function() {
    event.preventDefault();
    localStorage.clear(); //This clears the local storage
    alert('You are logged out');
    window.location.assign('signin.html');
  });

  //Creating a list table
  function profile(){
    $.ajax({
      method:'GET',
      url: `http://localhost:3000/users`,
      success: function (response){
        list = ''
        $.each(response, function(index, value) {
          list += `
            <tr>
              <td>${index + 1}</td> //td represents a data cell
              <td>${value.firstname} ${value.lastname}</td>
              <td>${value.gender}</td>
              <td>${value.field}</td>
              <td>${value.price}</td>
            </tr>`;           
            }) 
        $('.all-list').html(list)       
      },
    })
  }
  profile();
})