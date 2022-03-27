// import { app } from './firebaseApp.js';

firebase.initializeApp(firebaseConfig);

let User = null;

const checkLogin = () => {
  const loginContainer = document.querySelector('.loginContainer');
  const loggedinContainer = document.querySelector('.loggedinContainer');
  loginContainer.classList.remove('fade');

  const loggedinContainerContent = document.querySelector('.content');

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      User = Object.assign({}, user);
      loginContainer.classList.add('fade');
      loggedinContainer.classList.remove('fade');
      loggedinContainerContent.textContent = `Welcome ${user.email}!`;
    } else {
      loginContainer.classList.remove('fade');
      loggedinContainer.classList.add('fade');
    }
  });
};

const setLoginForm = () => {
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

  const loggedinContainerButton = document.querySelector(
    '.loggedinContainer button'
  );
  loggedinContainerButton.addEventListener('click', (event) => {
    event.preventDefault();
    firebase.auth().signOut();
  });
};

const loginSubmitButton = document.querySelector('#submitButton');

loginSubmitButton.addEventListener('click', (event) => {
  event.preventDefault();

  let usernameInput = document.querySelector('#inputUsername');
  let emailInput = document.querySelector('#inputEmail1');
  let passwordInput = document.querySelector('#inputPassword1');

  firebase
    .auth()
    .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
});

const registrationFormButton = document.querySelector('#regSubmitButton');

registrationFormButton.addEventListener('click', (event) => {
  event.preventDefault();

  let usernameInput = document.querySelector('#inputUsername');
  let emailInput = document.querySelector('#inputEmail1');
  let passwordInput = document.querySelector('#inputPassword1');
  let repPasswordInput = document.querySelector('#repeatPassword1');

  if (passwordInput.value === repPasswordInput.value) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  } else {
    alert('Passwords do not match!');
  }
});

checkLogin();
setLoginForm();

// function handleLogin(e) {
//   e.preventDefault();
//   console.log(usernameInput.value, emailInput.value, passwordInput.value);

//   // app
//   //   .auth()
//   //   .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
//   //   .then((userCredential) => {
//   //     // Signed in
//   //     const user = app.auth().currentUser;
//   //     user
//   //       .updateProfile({
//   //         displayName: usernameInput.value,
//   //       })
//   //       .then(() => {
//   //         setUserSigned(userCredential.user);

//   //         console.log('Update is successful');
//   //       })
//   //       .catch(function (error) {
//   //         console.error(error.message);
//   //       });
//   //   })
//   //   .catch((error) => {
//   //     let errorCode = error.code;
//   //     let errorMessage = error.message;
//   //     console.log(errorCode, errorMessage);
//   //   });
// }
