var level = 0;
var started = false;
var buttonColours = ["red","blue","green","yellow"];
var gamePattern =[];
var userClickPattern= [];
var last=0;
function startOver(){
    level=0;
    started=false;
    gamePattern=[];
    userClickPattern=[];
    last=0;
}
function animatePress(currentColour){
    $(".".concat(currentColour)).addClass("pressed");
    setTimeout(function(){ $(".".concat(currentColour)).removeClass("pressed");},500);
}
function playSound(name){
    var audio = new Audio(name);
    audio.play();
}
function nextSequence(){
    level++;
    userClickPattern=[];
    last=0;
    $("h1").text("level ".concat(level));
    var randomNumber=Math.floor(Math.random()*4);
    gamePattern.push(buttonColours[randomNumber]);
    $("#".concat(buttonColours[randomNumber])).fadeOut(100).fadeIn(100);
    var s = "sounds/".concat(buttonColours[randomNumber]).concat(".mp3");
    playSound(s);
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickPattern[currentLevel])
    console.log("success");
    else{
        playSound("sounds/wrong.mp3");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");},300)
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
$(".btn").click(function(){
    var userChosenColour = $(this).attr("class").split(" ")[1];
    var s="sounds/".concat(userChosenColour).concat(".mp3");
    playSound(s);
    animatePress(userChosenColour);
    userClickPattern.push(userChosenColour);
    checkAnswer(userClickPattern.length-1);
    last=last+1;
    if(last==gamePattern.length)
    setTimeout(function(){nextSequence();},1000);
});
$("body").keypress(function(){
    if(started!=true)
        nextSequence();
    started=true;
});