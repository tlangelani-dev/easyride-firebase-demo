// init firebase
firebase.initializeApp(config);

var appName = document.getElementById('app-name');
var dbRef = firebase.database().ref().child('appName');
dbRef.on('value', function(snap) {
    appName.innerText = snap.val()
});

/**
 * Upload Section
 */
var progressBar = document.getElementById('progress-bar');
var btnUpload = document.getElementById('btn-upload');
// listen to file selection
btnUpload.addEventListener('change', function(evt) {
    // get file
    var file = evt.target.files[0];

    // create a storage ref
    var storageRef = firebase.storage().ref('uploads/' + file.name);

    // upload file
    var task = storageRef.put(file);

    // update progress bar
    task.on('state_changed', function progress(snapshot) {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progressBar.value = percentage;
    }, function error(error) {

    }, function complete() {

    });
});

/**
 * Login Section
 */
var txtEmail = document.getElementById('txtEmail');
var txtPassword = document.getElementById('txtPassword');
var btnLogin = document.getElementById('btnLogin');
var btnSignUp = document.getElementById('btnSignUp');
var btnLogout = document.getElementById('btnLogout');

// add login event
btnLogin.addEventListener('click', function(evt) {
    var email = txtEmail.value;
    var password = txtPassword.value;
    var auth = firebase.auth();
    // sign in
    var promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(function(evt) {
        console.log(evt.message);
    });
});

// add logout event
btnLogout.addEventListener('click', function(evt) {
    firebase.auth().signOut();
});

// add signup event
btnSignUp.addEventListener('click', function(evt) {
    // TODO: validate email
    var email = txtEmail.value;
    var password = txtPassword.value;
    var auth = firebase.auth();
    // create user and sign in
    var promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(function(evt) {
        console.log(evt.message);
    });
});

// add realtime listener
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user);
        btnLogout.classList.remove('hide');
    } else {
        console.log('Not logged in!');
        btnLogout.classList.add('hide');
    }
});
