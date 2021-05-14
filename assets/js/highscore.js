console.log("Entering highscore.js");

var scoresEl = $("#scores");
var refreshEl = $("#refresh-btn");

//prints out the highscores
function printScores(){
    scoresEl.empty();
    //function that retrieves scores from local storage
    //display on page
    var text = JSON.parse(localStorage.getItem('scores'));
    if(text && text.length > 0){
        text.forEach(function(item){
            scoresEl.append($("<h3>").text(item.name + ": " + item.score));
        });
    }
}

refreshEl.on("click", printScores);