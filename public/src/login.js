const checkLogin = (() => {
  const loginContainer = document.querySelector('.loginContainer');
  const loggedinContainer = document.querySelector('.loggedinContainer');
  const loggedinContentContainer = document.querySelector(
    '.loggedinContentContainer'
  );
  const emailVerificationMessage = document.querySelector(
    '#emailVerificationMessage'
  );

  loginContainer.classList.remove('displaynone');

  const loggedinContainerContent = document.querySelector('.content');

  firebase.auth().onAuthStateChanged((user) => {
    // if (user !== null && user.emailVerified === true) {
    if (user !== null) {
      let uid = user.uid;
      loginContainer.classList.add('displaynone');
      loggedinContainer.classList.remove('displaynone');
      loggedinContentContainer.classList.remove('displaynone');
      emailVerificationMessage.classList.add('displaynone');

      if (user.displayName !== null) {
        loggedinContainerContent.textContent = `Belépve: ${user.displayName}!`;
      }

      initializeSite();
      searchData('A');
      createABCLinkButtons();
      setSearchField();
    } else {
      if (user !== null) {
        emailVerificationMessage.classList.remove('displaynone');
      }

      loginContainer.classList.remove('displaynone');
      loggedinContainer.classList.add('displaynone');
      loggedinContentContainer.classList.add('displaynone');
    }
  });
})();

const setLoginForm = (() => {
  const switchLogin = document.querySelector('#switch-login');
  const switchRegister = document.querySelector('#switch-register');

  const loginForm = document.getElementById('loginForm');
  const registrationForm = document.getElementById('registrationForm');

  switchLogin.addEventListener('click', () => {
    loginForm.classList.remove('displaynone');
    registrationForm.classList.add('displaynone');
  });

  switchRegister.addEventListener('click', () => {
    loginForm.classList.add('displaynone');
    registrationForm.classList.remove('displaynone');
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
      const user = userCredential.user;
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
        const user = userCredential.user;
        user
          .updateProfile({
            displayName: regUsernameInput.value,
          })
          .then(() => {
            const loggedinContainerContent = document.querySelector('.content');
            loggedinContainerContent.textContent = `Belépve: ${user.displayName}!`;
            console.log('Update is successful');
          })
          .catch(function (error) {
            console.error(error.message);
          });

        // Email verification
        user.sendEmailVerification().then(() => {
          // Email verification sent!
          console.log('Email sent');
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

const emailVerificationButton = document.querySelector(
  '#emailVerificationMessage span'
);

emailVerificationButton.addEventListener('click', sendEmailVerification);

function sendEmailVerification() {
  firebase
    .auth()
    .currentUser.sendEmailVerification()
    .then(() => {
      alert('Visszaigazoló email elküldve');
    });
}
