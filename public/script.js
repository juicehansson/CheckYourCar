//Most of this code is taken from Clint Heyer's example "skeleton"
//My comments starts with a JH to make sure that it is easy to see
//which parts I constructed and which comments are Clint's original (CH)

var socket = null;
var ourId = getRandomName();


if (document.readyState != 'loading') ready();
else document.addEventListener('DOMContentLoaded', ready);

//JH Get a random profile-name from the array
function getRandomName() {
  var myArray = ["Daughter", "Dad", "Mom", "Son"];
  var rand = myArray[Math.floor(Math.random() * myArray.length)];
  return rand;
}

//JH Functions for counting number of clicks 
//JH Optimal would be to create one function that everyone can use, 
//but right now I just wanted to make the code work for user testing
var countClicksDad = 0;

function clicksDad() {
  countClicksDad++;
}

var countClicksMom = 0;

function clicksMom() {
  countClicksMom++;
}

var countClicksSon = 0;

function clicksSon() {
  countClicksSon++;
}

var countClicksDaughter = 0;

function clicksDaughter() {
  countClicksDaughter++;
}

function upCount() {
  document.getElementById("DadTimes").textContent = countClicksDad;
  document.getElementById("MomTimes").textContent = countClicksMom;
  document.getElementById("SonTimes").textContent = countClicksSon;
  document.getElementById("DaughterTimes").textContent = countClicksDaughter;
}

function ready() {
  //CH Note the resource URL should match the config in app.js
  const url = 'ws://' + location.host + '/ws'; //CH may need to add extra S on first ws if uploaded to glitch
  socket = new ReconnectingWebsocket(url);

  //CH Connection has been established
  socket.onopen = function (evt) {
    console.log('Web socket opened: ' + url);
    console.log("This user is: " + ourId);
    //JH Write out the "chosen" profile-name from getRandomName();
    document.getElementById("yourName").textContent = ourId;

    //JH Do different stuff depending on which user is "active"
    //JH You can only see your own profile 
    if (ourId == "Dad") {
      document.getElementById("dad").style.visibility = "visible";
      document.getElementById("profile").textContent = "Dad";
      console.log("show dad")
    }

    if (ourId == "Mom") {
      document.getElementById("mom").style.visibility = "visible";
      document.getElementById("profile").textContent = "Mom";
      console.log("show mom")
    }

    if (ourId == "Son") {
      document.getElementById("son").style.visibility = "visible";
      document.getElementById("profile").textContent = "Son";
      console.log("show son")
    }

    if (ourId == "Daughter") {
      document.getElementById("daughter").style.visibility = "visible";
      document.getElementById("profile").textContent = "Daughter";
      console.log("show daughter")
    }

  };

  //CH Received a message
  socket.onmessage = function (evt) {

    logRecievedData(evt.data);

    //CH To convert text back to an object (if it was sent with 'sendObject')
    var o = JSON.parse(evt.data);

    //JH Check who has written, and change outcome
    if (o.from === ourId) {
      console.log("This is from me!");
      document.getElementById("who").textContent = "I did.";
      document.body.style.backgroundColor = "lightyellow";
    } else {
      document.getElementById("who").textContent = o.from + " did.";
      document.body.style.backgroundColor = "lightblue";
      console.log("This is from someone else!");
    }

    //JH Check who sent the message and do something
    if (o.from === "Dad") {
      document.getElementById("DadTimes").textContent = o.numberDad;
      //JH The profiles are hidden by default.
      //JH These lines show every profile and their numbers (if they have sent their message)
      document.getElementById("dad").style.visibility = "visible";
      document.getElementById("mom").style.visibility = "visible";
      document.getElementById("son").style.visibility = "visible";
      document.getElementById("daughter").style.visibility = "visible";
      console.log("Dad did send this")
    } else {
      console.log("Dad did not send this")
    }

    if (o.from === "Mom") {
      document.getElementById("MomTimes").textContent = o.numberMom;
      document.getElementById("dad").style.visibility = "visible";
      document.getElementById("mom").style.visibility = "visible";
      document.getElementById("son").style.visibility = "visible";
      document.getElementById("daughter").style.visibility = "visible";
      console.log("Mom did send this")
    } else {
      console.log("Mom did not send this")
    }

    if (o.from === "Son") {
      document.getElementById("SonTimes").textContent = o.numberSon;
      document.getElementById("dad").style.visibility = "visible";
      document.getElementById("mom").style.visibility = "visible";
      document.getElementById("son").style.visibility = "visible";
      document.getElementById("daughter").style.visibility = "visible";
      console.log("Son did send this")
    } else {
      console.log("Son did not send this")
    }

    if (o.from === "Daughter") {
      document.getElementById("DaughterTimes").textContent = o.numberDaughter;
      document.getElementById("dad").style.visibility = "visible";
      document.getElementById("mom").style.visibility = "visible";
      document.getElementById("son").style.visibility = "visible";
      document.getElementById("daughter").style.visibility = "visible";
      console.log("Daughter did send this")
    } else {
      console.log("Daughter did not send this")
    }

    console.log(o);
  };

  const logRecievedData = (data) => {
    console.log(new Date().toLocaleTimeString() + '< ' + data); //CH Show raw messages as received
  }

  //JH Create message that we send on "submit" - the button saying "Send info"
  const createAndSendMessage = (evt) => {
    evt.preventDefault();
    //JH create variables with the amount of time you have clicked/connected
    var checkTimesDad = countClicksDad;
    var checkTimesMom = countClicksMom;
    var checkTimesSon = countClicksSon;
    var checkTimesDaughter = countClicksDaughter;

    //JH where we put all the information we want to send into a variable
    var w = {
      from: ourId,
      numberDad: checkTimesDad,
      numberMom: checkTimesMom,
      numberSon: checkTimesSon,
      numberDaughter: checkTimesDaughter
    };

    //CH This is where we actually send something
    sendObject(w);
  }

  //JH hook on event
  document.getElementById('sendForm').addEventListener('submit', createAndSendMessage);
}

function sendObject(o) {
  //CH Create a string version of the object
  send(JSON.stringify(o));
}

function send(str) {
  console.log(new Date().toLocaleTimeString() + '> ' + str);
  socket.send(str);
}