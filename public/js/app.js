// init firebase
firebase.initializeApp(config);

var appName = document.getElementById('app-name');
var dbRef = firebase.database().ref().child('appName');
dbRef.on('value', function(snap) {
    appName.innerText = snap.val()
});
