var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
 
function nextSequence(){

  //Increment level
  level += 1;
  $("h1").text("Level " + level);
  
  //Generating random number between 0 and 3
  var randomNumber = Math.round(Math.random()*3);

  var randomChosenColour = buttonColours[randomNumber];

  //Add randomChosenColour to gamePattern
  gamePattern.push(randomChosenColour);

  animatePress(randomChosenColour);

}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  playSound(currentColour);
  setTimeout(function () {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    
    //Checking if user has finished the sequence by
    //comparing lengths
    if (gamePattern.length === userClickedPattern.length){
      setTimeout(function (){
      nextSequence();}, 1000);
      userClickedPattern = [];
    }
  }
  else {
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over")
    }, 200);
    startOver();
  }
  
}

function startOver(){
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

$(".btn").click(function (event){
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.lastIndexOf(userChosenColor));
});

$(document).keypress(function (event){
  nextSequence();
});
