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