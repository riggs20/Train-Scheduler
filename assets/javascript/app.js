// Initialize Firebase 
var config = {
apiKey: "AIzaSyAhEkQhqurUHyj4EmY0iG5fEH-FuFrn7X8",
authDomain: "train-schedule-2938f.firebaseapp.com",
databaseURL: "https://train-schedule-2938f.firebaseio.com",
projectId: "train-schedule-2938f",
storageBucket: "",
messagingSenderId: "784093501116"
};
firebase.initializeApp(config);

var database = firebase.database();

//button to add train
$("#add-train-btn").on("click", function(event) {
	event.preventDefault();
	var trainName = $("#trainNameInput").val().trim();
	var destinationName = $("#destinationInput").val().trim();
	var firstTrainTime = moment($("#firstTrainTimeInput").val().trim(), "HH:mm").format("HHmm");
	var frequencyInfo = $("#frequencyInput").val().trim();

	var newTrain = {
		train: trainName,
		destination: destinationName,
		firstTrain: firstTrainTime,
		frequency: frequencyInfo
	};

	database.ref().push(newTrain);

	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTrainTimeInput").val("");
	$("#frequencyInput").val("");

});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
	console.log(childSnapshot.val());

	var trainName = childSnapshot.val().train;
	var destinationName = childSnapshot.val().destination;
	var firstTrainTime = childSnapshot.val().firstTrain;
	var frequencyInfo = childSnapshot.val().frequency;

	console.log(trainName);
	console.log(destinationName);
	console.log(firstTrainTime);
	console.log(frequencyInfo);

	var firstTrainConvert = moment(firstTrainTime, "hh:mm").subtract(1, "years");
	var now = moment();
	var timeDiff = moment().diff(moment(firstTrainConvert), "minutes");
	var remainder = timeDiff % frequencyInfo;
	var minsAway = frequencyInfo - remainder;
	var nextArrival = moment().add(minsAway, "minutes");
	var nextArrivalFormatted = moment(nextArrival).format("hh:mm");


	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destinationName + "</td><td>" + 
		frequencyInfo + "</td><td>" + nextArrivalFormatted + "</td><td>" + minsAway + "</td></tr>");

});