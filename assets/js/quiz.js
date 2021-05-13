console.log("Entering quiz.js");

//Quiz state variable
var time = 1000;
var qIndex = 0;

var quiz = $("#quiz");
var timerEl = $("#timer");
var startBtn = $("#start-btn");
var questionEl = $("#question");
var choicesEl = $("#choices");

function start(){
    startBtn.hide();
    quiz.show();
    console.log("start");
    //timer Starts and get quiz items
    setInterval(timer, 1000);
    renderQs();
}

function renderQs(){
    //get current questions object from array
    current = questionsArr[qIndex];
    qIndex++;
    //update html with current question

    //clear old question choices
    questionEl.empty();
    choicesEl.empty();
   
    //loop over choices and create new button for new choices
        //.forEach()
    
    qChoices = current.choices;
    
    qChoices.forEach(create);
}

//function to create and append buttons
function create(item, index, arr){
    var button = $('<button>').text(item);
    //attach click event listener
    button.on('click', qClicked);
    //Display button
    choicesEl.append(button);
}

//function for questionClicked
function qClicked(){
    console.log("qClicked");
    //check if user answered wrong

    //create if to check if time has hit 0 or time is still remaining
    //if time < 0{time =0}

    //display time on page

    //check to see if the answer is correct, if correct move on 
    //move on to next questions

    //check to see if out of questions, if yes run end quiz function 
    //else get next questions
    //if(currentQIndex === questions.length())
    //  quizEnd();
    //else{
    // renderQs();}
}

//end quiz
function quizEnd(){
    //clear time interval
    //show final scores
        //.hide() and .show()
    //
}

//time function
function timer(){
    time--;
    //display timer on page
    timerEl.text(time);
    //if time hits 0 run quizEnd()
}

//create function for highscores

//write any functions to check how many questions user got right and display scores

//check to make sure user inputs a name into user prompt
//save scores to local storage
//retrieve high scores from local storage

//create object to store user scores

//redirect to highscores page
//window.location.href

quiz.hide();
startBtn.on("click", start);