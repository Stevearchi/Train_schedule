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
    var nextArrival = 0;
    var currentTime = moment();
    var firstTrainMoment = moment(childSnapshot.val().firstTrainTime, 'HH:mm');
    var frequency = parseInt(childSnapshot.val().frequency);
    console.log(childSnapshot.val().firstTrainTime)
    console.log(firstTrainMoment.format('MMMM DD YYYY, H:MM:ss'))
    var diffTime = currentTime.diff(firstTrainMoment, 'minutes');
    var tRemainder = diffTime % frequency;
    var minutesAway = frequency - tRemainder;
    var nextArrival = moment().add(minutesAway, "minutes");
    nextArrival = nextArrival.format('HH:mm');
    // add tr and tds to table
    newtd = '<td>' + childSnapshot.val().trainName + '</td>';
    $('#trainTable').append('<tr class="table-info">' + newtd + '<td>' + childSnapshot.val().destination +
        '<td>' + frequency + '<td>' + nextArrival + '<td>' + minutesAway + '</td></tr>');

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