
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0

function playGamePattern() {
    let i = 0;

    function animateLoop() {
        if (i < gamePattern.length) {
            setTimeout(function() {
                $("#" + gamePattern[i]).animate({opacity: 0.5}, 100, function() {
                    $(this).animate({opacity: 1}, 100);
                    playSound(gamePattern[i]);
                    i++; // Increment i after animation and sound play
                    animateLoop(); // Continue the loop
                });
            }, 200);
        }
    }

    animateLoop();
}



function nextSequence() {
    level ++
   var randomNumber = Math.floor(Math.random() * 4 );
   var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);
   


   
//    $("#" + randomChosenColour).animate({opacity: 0.5}, 100, function() {
//     $(this).animate({opacity: 1}, 100);
//    });


 
   console.log(randomChosenColour);
   console.log(level)
   $("h1").text("Level " + level)
   playGamePattern();
}

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});


function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.volume = 0.5;
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

let started = false;

$(document).keypress(function(){
     if(started === false) {
        started = true;
        nextSequence();
     }
});

function checkAnswer(currentLevel) {
    console.log("currentLevel is " + userClickedPattern);
    console.log("gamePattern is " + gamePattern);
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success.");
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
                userClickedPattern = []
            }, 1000);
        }
    } else {
        console.log("Wrong.");
        var wrong = new Audio("./sounds/wrong.mp3")
        wrong.volume = 0.1;
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text("Game Over!")
        setTimeout(function(){startOver()},1000);
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    $("h1").text("Press A Key to Start")
}