console.log("Entering quiz.js");

//Quiz state variable
var time;
var qIndex;
var wrong;
var myTimer;

var quizEl = $("#quiz");
var timerEl = $("#timer");
var startBtn = $("#start-btn");
var questionEl = $("#question");
var choicesEl = $("#choices");
var scoreEl = $("#score");

function start() {
    scoreEl.empty();
    time = 100;
    qIndex = 0;
    wrong = 0;
    startBtn.hide();
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
    //update html with current question

    //clear old question choices
    questionEl.empty();
    choicesEl.empty();

    var text = $('<h2>').text(current.title);
    questionEl.append(text);
    //loop over choices and create new button for new choices
    current.choices.forEach(create);
}

//function to create and append buttons
function create(item, index, arr) {
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
    if ($(this).text() !== current.answer) {
        console.log("Wrong");
        wrong++;
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
    console.log("quizEnd")
    quizEl.hide();
    //clear time interval
    clearInterval(myTimer);
    //show final scores
    scoreEl.show();
    //calculate score
    var temp = ((questionsArr.length - wrong) / questionsArr.length) * 100;
    temp = temp.toFixed(2);
    //Display score on page
    var score = $('<h1>').text(temp + "% Correct");
    scoreEl.append(score);
    startBtn.show();
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

//create function for highscores

//write any functions to check how many questions user got right and display scores

//check to make sure user inputs a name into user prompt
//save scores to local storage
//retrieve high scores from local storage

//create object to store user scores

//redirect to highscores page
//window.location.href

scoreEl.hide();
quizEl.hide();
startBtn.on("click", start);