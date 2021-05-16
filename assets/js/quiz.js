console.log("Entering quiz.js");
//Quiz state variable
var time;
var qIndex;
var right;
var myTimer;
var scores;
var quizEl = $("#quiz");
var timerEl = $("#timer");
var startBtn = $("#start-btn");
var questionEl = $("#question");
var choicesEl = $("#choices");
var scoreEl = $("#score");
var modalOkBtn = $("#modalOk");
var modalCancelBtn = $("#modalCancel");
var noNameEl = $("#noName");

function start() {
    //reset variables
    scoreEl.empty();
    time = 60;
    qIndex = 0;
    right = 0;
    //sets up quiz question page
    startBtn.hide();
    $('#qHead').remove();
    quizEl.prepend($('<h1>').attr('id','qHead').text("Questions"));
    timerEl.text(time);
    quizEl.show();
    scoreEl.hide();
    console.log("start");
    //timer Starts and get quiz items
    myTimer = setInterval(timer, 1000);
    renderQs();
}

function renderQs() {
    //get current questions object from array
    current = questionsArr[qIndex];
    qIndex++;
    //clear old question choices
    questionEl.empty();
    choicesEl.empty();
    //prints question on page
    var text = $('<h2>').text(current.title);
    questionEl.append(text);
    //loop over choices and create new button for new choices
    current.choices.forEach(create);
}

//function to create and append buttons
function create(item) {
    var button = $('<button>').text(item);
    //attach click event listener
    button.on('click', qClicked);
    //Display button
    choicesEl.append(button);
}

//function for questionClicked
function qClicked() {
    console.log("qClicked");
    //check if user answered wrong
    if ($(this).text() === current.answer) {
        console.log("right");
        right++;
    }
    //check to see if out of questions, if yes run end quiz function 
    //else get next questions
    if (qIndex === questionsArr.length) {
        quizEnd();
    }
    else {
        renderQs();
    }
}

//end quiz
function quizEnd() {
    console.log("quizEnd");
    quizEl.hide();
    //clear time interval
    clearInterval(myTimer);
    //calculate score
    var calcScore = ((questionsArr.length - (questionsArr.length - right)) / questionsArr.length) * 100;
    calcScore = calcScore.toFixed(2);
    //Display score on the modal
    $('#theirScore').text(calcScore);
    startBtn.show();
    //Shows the modal
    noNameEl.hide();
    $("#staticBackdrop").modal();
}

//Function to save scores to local storage
function saveScore(calcScore){
    //retrieves scores array from local storage
    if(localStorage.getItem("scores")){
        scores = JSON.parse(localStorage.getItem("scores"));
        console.log(scores);
    }
    //creates an array in local storage if one does not already exist
    else{
        scores = [];
    }
    //Gets userName and score values, then saves to an object
    var userName = $('#username').val();
    var score = $('#theirScore').text();
    if(userName){
        var thisScore = {
            name: userName,
            score: score
        };
        scores.push(thisScore);
        //sorts scores from largest to smallest
        scores.sort((x,y) => y.score - x.score);
        //saves scores to local storage
        localStorage.setItem("scores", JSON.stringify(scores));
        $("#staticBackdrop").modal('toggle');
        noNameEl.hide();
    }
    else{
        noNameEl.show();
    }
}

//time function
function timer() {
    time--;
    //display timer on page
    timerEl.text(time);
    //if time hits 0 run quizEnd()
    if (time == 0) {
        quizEnd();
    }
}

scoreEl.hide();
quizEl.hide();
startBtn.on("click", start);
modalOkBtn.on("click", saveScore);

//Cancels the score save
modalCancelBtn.on("click", function(){
    $("#staticBackdrop").modal('toggle');
});