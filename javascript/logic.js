// declare variables
var trainName;
var destination;
var firstTrainTime;
var frequency;
// initialize firebase
var firebaseConfig = {
    apiKey: "AIzaSyCFU3_m3fKNFtIU6tLxadsRZr_xxGHwnDk",
    authDomain: "activities-on-6-11.firebaseapp.com",
    databaseURL: "https://activities-on-6-11.firebaseio.com",
    projectId: "activities-on-6-11",
    storageBucket: "activities-on-6-11.appspot.com",
    messagingSenderId: "50626317331",
    appId: "1:50626317331:web:fb796e87f58b07a5"
};
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// write functions()
database.ref('trainSchedule').on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val().trainName)
    nextArrival = 0;
    minutesAway = 0;
    // add tr and tds to table
    newtd = '<td>' + childSnapshot.val().trainName + '</td>';
    $('#trainTable').append('<tr class="table-info">' + newtd + '<td>' + childSnapshot.val().destination +
        '<td>' + childSnapshot.val().frequency + '<td>' + nextArrival + '<td>' + minutesAway + '</td></tr>')

    // $('#trainTable').append('</tr>')
})
//display table content to screen when page loads & the database is updated

// when user clicks on submit button
// data entered is pushed to the database.

$('#submit').on('click', function (event) {
    event.preventDefault();
    trainName = $('#trainName').val().trim() || "";
    destination = $('#destination').val().trim();
    firstTrainTime = $('#firstTrainTime').val().trim();
    frequency = $('#frequency').val().trim();

    database.ref('trainSchedule').push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    })
    // push to database
});