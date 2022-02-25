
showCards();
// Function to Show the current Time
function ShowTime() {
    let cdate = new Date();
    let cHours = cdate.getHours();
    let cTerm = "PM";
    if (cHours > 12) {
        cHours = cHours - 12;
        if (cHours == 0) {
            cHours = 12;
        }
    }
    else {
        cTerm = "AM";
    }
    let cMin = cdate.getMinutes();
    let cSec = cdate.getSeconds();
    if (cMin < 10) {
        cMin = "0" + cMin;
    }
    if (cSec < 10) {
        cSec = "0" + cSec;
    }
    let newHtml = " ";
    let clock = document.getElementById("currentTime");
    newHtml = `${cHours} : ${cMin} : ${cSec} ${cTerm}`;
    clock.innerHTML = newHtml;
}
setInterval(() => {
    ShowTime();
}, 1000);


// To get the value inside the input tag,data and time and store it into local storage 
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", () => {
    // To get the input text and dateTime
    let inputMsg = document.getElementById("inputMessage").value;
    let DateTime = document.getElementById("givenDateTime").value;


    // Setting the date
    let settingDate = new Date(DateTime);

    // Current Date
    let currentDate = new Date();


    if (inputMsg.length > 2) {
        if ((settingDate - currentDate) < 86400000 && currentDate < settingDate) {
            let inputTimeMS = settingDate.toLocaleTimeString(); //This will be stored in the local storage in the timeDateArray. Gives the time in ms.
            let myMsgs = localStorage.getItem("Messages");
            let setDateTime = localStorage.getItem("myDateAndTime"); // If already messages are present then we have to retrieve that messages first.
            if (myMsgs == null && setDateTime == null) {
                myMessageArray = []; //We are storing the messages into an array.
                timeDateArray = []; //We are storing the messages into an array named timeDataArray
            }
            else {
                myMessageArray = JSON.parse(myMsgs);// This will convert the messages which are of the type string into an array
                timeDateArray = JSON.parse(setDateTime); //This will convert the date and time which are of the type string into an array
            }
            myMessageArray.push(inputMsg); //Pusing the elements into the array
            timeDateArray.push(inputTimeMS); //Pusing the elements into the array
            localStorage.setItem("Messages", JSON.stringify(myMessageArray)); //This will store the messages as a string
            localStorage.setItem("myDateAndTime", JSON.stringify(timeDateArray)); //This will store the Data and time as a string

            inputmessages = document.getElementById("inputMessage");
            inputmessages.value = " ";
            DateTime = document.getElementById("givenDateTime");
            DateTime.value = " ";

            showCards(); //Calling the function which will show the cards
            setAlarm();
            swal("Alright!", "Your message is saved!", "success");
        }
        else {
            // Show alert of date
            swal("Failure!", "Please set Time less 24 hours!", "warning");
        }

    }
    else {
        // Show an alert of input message size
        swal("Failure!", "The length of your message is too short!", "warning");

    }
})

function showCards() {
    let myMsgs = localStorage.getItem("Messages");
    let setDateTime = localStorage.getItem("myDateAndTime"); // If already messages are present then we have to retrieve that messages first.
    if (myMsgs == null && setDateTime == null) {
        myMessageArray = []; //We are storing the messages into an array.
        timeDateArray = []; //We are storing the messages into an array named timeDataArray
    }
    else {
        myMessageArray = JSON.parse(myMsgs);// This will convert the messages which are of the type string into an array
        timeDateArray = JSON.parse(setDateTime); //This will convert the date and time which are of the type string into an array
    }
    DateTime = document.getElementById("givenDateTime").value;
    settingDate = new Date(DateTime);
    let cardHtml = " ";
    myMessageArray.forEach((element, index) => {
        cardHtml += `  <div 
                            class="border-2 border-white rounded-lg bg-white my-2 flex-col sm:flex sm:flex-row justify-between items-center">
                            <div class=" flex justify-center my-2">
                                <span class="px-2 text-center font-lato font-bold">${index + 1}</span>
                            </div>
                            <div class=" flex justify-center my-2 font-bold">
                                <p class="px-2 font-lato">${element}</p>
                            </div>                                                    
                            <div
                                class="w-1/4 flex justify-center md:justify-end md:mr-3 lg:justify-end lg:mr-3 xl:justify-end xl:mr-3 my-2 mx-auto">
                                <button id="${index}" onclick="deleteMsg(this.id)" ><img class="h-5 w-5" src="images/deleteLogo.png" alt=""></button>
                            </div>
                        </div>`;
    });

    let mySavedMessages = document.getElementById("mySavedMessages");
    if (myMsgs != null && setDateTime != null) {
        mySavedMessages.innerHTML = cardHtml;
    }
    else {
        mySavedMessages.innerHTML = `<h1 class="font-lato text-white text-xl font-extrabold">Nothing to show yet . . .</h1>`
    }
}


// Setting the Alarm
function setAlarm() {
    setInterval(() => {
        timeDateArray.forEach((v) => {
            currentDate = new Date();
            let currentTimeString = currentDate.toLocaleTimeString();
            if (timeDateArray.includes(currentTimeString)) {
                let audio = new Audio('/sounds/alarmSound.mp3');
                audio.play();
            }
        });
    }, 1000);
};

//Function to Deleting a Msg 
function deleteMsg(index) {
    let myMsgs = localStorage.getItem("Messages");
    let setDateTime = localStorage.getItem("myDateAndTime"); // If already messages are present then we have to retrieve that messages first.
    if (myMsgs == null && setDateTime == null) {
        myMessageArray = []; //We are storing the messages into an array.
        timeDateArray = []; //We are storing the messages into an array named timeDataArray
    }
    else {
        myMessageArray = JSON.parse(myMsgs);// This will convert the messages which are of the type string into an array
        timeDateArray = JSON.parse(setDateTime); //This will convert the date and time which are of the type string into an array
    }
    myMessageArray.splice(index, 1);
    timeDateArray.splice(index, 1);
    localStorage.setItem("Messages", JSON.stringify(myMessageArray)); //This will store the messages as a string
    localStorage.setItem("myDateAndTime", JSON.stringify(timeDateArray));
    showCards();
}