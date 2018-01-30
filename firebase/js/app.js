
// firebase.database().ref('movies/something').push({
//   title: 'blah',
//   results: [1, 2, 3]
// })


const app = (() => {
  let is_login = true;
  let is_standard = true;
  
  const toggleSigninType = function() {
    const btn = $(this).find('.switch');
    const id = btn.attr('id');
  
    btn.toggleClass('toggle');

    if ( id == 'log-toggle' ) {

      is_login = !is_login;

      if ( is_login ) {
        $('#confirm').hide();
        $('#log-header').text('Log In');
      } else {
        $('#confirm').show();
        $('#log-header').text('Register');
      }
    } else {
      is_standard = !is_standard;

      if ( is_standard ) {
        $('.toggle-wrap.log').show();
        $('#email, #password').show();
        $('#submit').text('Submit');
        $('#log-header').text(is_login ? 'Log In' : 'Register');

        if ( !is_login ) $('#confirm').show();
      } else {
        $('.toggle-wrap.log').hide();
        $('#email, #password, #confirm').hide();
        $('#log-header').text('Google Sign In');
        $('#log-submit').text('Click Here to Log In with Google');
      }
    }

    return false;
  };

  const showDashboard = function(user) {
    $('#error').hide();
    $('#log-btn').text(user.email);
    $('#log-out').show();
    $('#login-form').hide();
    $('form input').val('');
    $('.dashboard').show();
  };

  const showAuthError = function({message}) {
    $('#error')
      .text(message)
      .show();
  };

  const authenticate = function(e) {
    e.preventDefault();

    if ( is_standard ) {
      let email = $('#email').val().trim();
      let password = $('#password').val().trim();
      let confirm = $('#confirm').val().trim();
      

      if ( is_login ) {
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(showDashboard)
          .catch(showAuthError);
      } else {
        if ( email && password && password == confirm ) {
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(showDashboard)
            .catch(showAuthError);
        } else {
          $('#error')
            .text('Passwords do not match')
            .show();
        }
      }
    }
    // Google Log in
    else {
      let provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider)
        .then(({user}) => user)
        .then(showDashboard)
        .catch(showAuthError)
    }
  };

  const showForm = function() {
    $('#log-btn').text('Login');
    $('#log-out').hide();
    $('#login-form').show();
    $('.dashboard').hide();
  };

  const logoutUser = function() {
    firebase.auth().signOut()
      .then(showForm)
      .catch(err => console.log(err));
  };

  const checkAuthStatus = function() {
    firebase.auth().onAuthStateChanged(user => {
      if ( user )
        showDashboard(user);
      else showForm();
    })
  };

  const init = function() {
    $('form .toggle-bar').on('click', toggleSigninType);
    $('#log-submit').on('click', authenticate);
    $('#log-out').on('click', logoutUser);

    checkAuthStatus();
  };

  return {init: init}
})();

app.init();






// db.ref().set({
//   name: 'JD',
//   age: 38
// });

// db.ref('movies').push({
//   title: 'Jurassic Park',
//   release: '1993'
// });