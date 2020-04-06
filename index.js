var buttonColors=["red","blue","green","yellow"];

var gamePattern=[];
var userClickedPattern=[];

var isFirsTime=true;
var level=0;
var end=false;

$("h1").click(function(){
  if(isFirsTime)
  {
    isFirsTime=false;
    nextSequence();
  }

  if(end){
    end=false;
    setTimeout(nextSequence,1000);
  }
});

$(".btn").click(function (){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  animatePress(userChosenColor);
  playSound(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{
  if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
  {
    if(userClickedPattern.length==gamePattern.length)
      setTimeout(nextSequence,1000);
  }
  else
  {
    playSound("wrong");

    $("#level-title").text("Game over,Click here to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);

  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function startOver()
{
  gamePattern=[];
  level=0;
  end=true;
}

function playSound(name)
{
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor)
{
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}
