let User = null;

const checkLogin = (() => {
  const loginContainer = document.querySelector('.loginContainer');
  const loggedinContainer = document.querySelector('.loggedinContainer');
  const loggedinContentContainer = document.querySelector(
    '.loggedinContentContainer'
  );
  loginContainer.classList.remove('fade');
  let userStatus = false;

  const loggedinContainerContent = document.querySelector('.content');

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      User = Object.assign({}, user);
      let uid = user.uid;
      loginContainer.classList.add('fade');
      loggedinContainer.classList.remove('fade');
      loggedinContentContainer.classList.remove('fade');
      loggedinContainerContent.textContent = `Welcome ${user.displayName}!`;

      initializeSite();
      getBooksByABC('A', 'B');
      createABCLinkButtons();
      setSearchField();
    } else {
      loginContainer.classList.remove('fade');
      loggedinContainer.classList.add('fade');
      loggedinContentContainer.classList.add('fade');
    }
  });
})();

const setLoginForm = (() => {
  const switchLogin = document.querySelector('#switch-login');
  const switchRegister = document.querySelector('#switch-register');

  const loginForm = document.getElementById('loginForm');
  const registrationForm = document.getElementById('registrationForm');

  switchLogin.addEventListener('click', () => {
    loginForm.classList.remove('fade');
    registrationForm.classList.add('fade');
  });

  switchRegister.addEventListener('click', () => {
    loginForm.classList.add('fade');
    registrationForm.classList.remove('fade');
  });

  const loggedinContainerButton = document.querySelector('#logoutButton');
  loggedinContainerButton.addEventListener('click', (event) => {
    event.preventDefault();
    firebase.auth().signOut();
  });
})();

const loginSubmitButton = document.querySelector('#submitButton');

loginSubmitButton.addEventListener('click', (event) => {
  event.preventDefault();

  let usernameInput = document.querySelector('#inputUsername');
  let emailInput = document.querySelector('#inputEmail1');
  let passwordInput = document.querySelector('#inputPassword1');

  firebase
    .auth()
    .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then((userCredential) => {
      // Signed in
      const user = firebase.auth().currentUser;
      user
        .updateProfile({
          displayName: usernameInput.value,
        })
        .then(() => {
          usernameInput.value = '';
          emailInput.value = '';
          passwordInput.value = '';

          console.log('Update is successful');
        })
        .catch(function (error) {
          console.error(error.message);
        });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
});

const registrationFormButton = document.querySelector('#regSubmitButton');

registrationFormButton.addEventListener('click', (event) => {
  event.preventDefault();

  let regUsernameInput = document.querySelector('#regUsername');
  let regEmailInput = document.querySelector('#regEmail1');
  let regPasswordInput = document.querySelector('#regPassword1');
  let repRegPasswordInput = document.querySelector('#repeatPassword1');

  if (regPasswordInput.value === repRegPasswordInput.value) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        regEmailInput.value,
        regPasswordInput.value
      )
      .then((userCredential) => {
        // Signed in
        const user = firebase.auth().currentUser;
        user
          .updateProfile({
            displayName: regUsernameInput.value,
          })
          .then(() => {
            // setUserSigned(userCredential.user);

            console.log('Update is successful');
          })
          .catch(function (error) {
            console.error(error.message);
          });
      })
      .then(() => {
        regUsernameInput.value = '';
        regEmailInput.value = '';
        regPasswordInput.value = '';
        repRegPasswordInput.value = '';
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  } else {
    alert('Passwords do not match!');
  }
});
