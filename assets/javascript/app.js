console.log("hello world");

var currentQuestion;
var secondsRemaining = 30;
var countdownTimer;
var timer;
var buttonA = document.getElementById("buttonA");
var buttonB = document.getElementById("buttonB");
var buttonC = document.getElementById("buttonC");
var buttonD = document.getElementById("buttonD");
var questionContainer = document.getElementById("question-container");
var textConverter = document.createElement('textarea');
var correctAnswers = 0;
var incorrectAnswers = 0;
var globalIndex = 0;
var APIstring = "https://opentdb.com/api.php?amount=10&category=11"
var questions;

$("#play-button").on("click", function(){
    // .show ()
    $(".button-group-section");
    axios.get(APIstring)
    .then (function(response){
        questions = response.data;
        // when the game starts what needs to happen to our html document?
        // 1. get questions from the trivia api
        // 2. remove the play game button
        // 3. remove instructions
        // 4. when we receive the questions, display question and answer and start timer
        $("#play-button").hide();
        timer = document.getElementById("timer");
        // create an click listener for each button
        // the selected answer is the innerText
        // so we check to see if the innerText is the correct answer
        // with our checkAnswer function!
        $('#buttonA').on('click', function(){
            var selectedAnswer = this.innerText;
            checkAnswer(selectedAnswer);
        });
        
        $('#buttonB').on('click', function(){
            var selectedAnswer = this.innerText;
            checkAnswer(selectedAnswer);
        });
        
        $('#buttonC').on('click', function(){
            var selectedAnswer = this.innerText;
            checkAnswer(selectedAnswer);
        });
                    
        $('#buttonD').on('click', function(){
            var selectedAnswer = this.innerText;
            checkAnswer(selectedAnswer);
        });

        startTimer();

        setQuestion(questions.results[globalIndex]);
        setAnswers(questions.results[globalIndex]);
    });
});


function convertEncodedString(str){
    textConverter.innerHTML = str;
    return textConverter.value;
}

function turnOffAnswerButtons(){
    $("#buttonA").off()
    $("#buttonB").off()
    $("#buttonC").off()
    $("#buttonD").off()    
}

function gameOver(){
    stopTimer();
    showPlay();
    var showAnswersString = showAnswers();
    questionContainer.innerText = showAnswersString;
    secondsRemaining = 30;
    globalIndex = 0;
    turnOffAnswerButtons();
}

function startTimer(){
    countdownTimer = setInterval(countdown, 1000);
}

function checkAnswer(answer) {
    if (answer === currentQuestion.correct_answer){
        correctAnswers++;
        $("#answer").text ("CORRECT!")
    } else {
        incorrectAnswers++;
        $("#answer").text ("WRONG")
    }
    loadnextQuestion()
}

function setQuestion(question) {
    console.log (question)
    questionContainer.innerText = convertEncodedString(question.question);
    currentQuestion = question;
}

// a goes in
// gets shuffled in the for loop
// returns the shuffled array
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function setAnswers(question) {
    // correct_answer is a string
    // incorrect_answers is an array
    var answers = [];
    for (i = 0; i < question.incorrect_answers.length; i++){
        answers.push(question.incorrect_answers[i]);
    }
    answers.push(question.correct_answer);

    var shuffledanswers = shuffle(answers);

    $("#buttonA").text(shuffledanswers[0]);
    $("#buttonB").text(shuffledanswers[1]);
    if (question.type === "multiple"){
        // runs if the question is multiple
        $("#buttonC").show();
        $("#buttonD").show();
        $('#buttonC').text(shuffledanswers[2]);
        $('#buttonD').text(shuffledanswers[3]);
    } else {
        // runs if the question is a boolean
        $("#buttonC").hide();
        $("#buttonD").hide();
    }
   
}

function countdown(){ 
    secondsRemaining = secondsRemaining - 1;
    timer.innerText = secondsRemaining;
    if (secondsRemaining === 0){
        gameOver();
    }
}

function stopTimer(){
    clearInterval(countdownTimer);
}


function showPlay () {
    $("#play-button").show()
}



function showAnswers() {
    return "Correct Answers: "  + correctAnswers + ". Incorrect Answers: " + incorrectAnswers;
}

// 





/**
 * Uses our global index to set the next question in our questions.results array
 */
function loadnextQuestion () {
    globalIndex++
    if(questions.results[globalIndex] === undefined){
        gameOver();
        return;
    }
    setQuestion(questions.results[globalIndex]);
    setAnswers(questions.results[globalIndex]); 
}