var r1 = document.getElementById('rod1');
var r2 = document.getElementById('rod2');
var ball = document.getElementById('ball');
var play1_score = 0;
var play2_score = 0;
var moment;

var ballSpeedX = 2;
var ballSpeedY = 2;

let maxWidth = window.innerWidth;
var game = false;

(function start() {
    let rod = localStorage.getItem('ppname');
    let score = localStorage.getItem('ppscore');

    alert(`Press Enter to start new game            
Press A to move in left 
Press D to move in right`)
    // alert("Press A to move in left ");
    // alert("Press D to move in right ");

    if (rod == 'null' || score == 'null') {
        alert("This is the first game ");
    }
    else {
        alert(rod + " has the maxscore of " + score);
    }
})();

function scoreboard(player, points) {
    let max = localStorage.getItem('ppscore');
    if (points > max) {
        max = points;
        localStorage.setItem('ppscore', points);
        localStorage.setItem('ppname', player);
    }

    alert(player + " has win the game with the score of " + points + " : Max score is " + max);
};

function resetboard(height) {

    var r1rect = r1.getBoundingClientRect();
    r1.style.left = window.innerWidth / 2 - r1rect.width / 2 + 'px';
    r2.style.left = r1.style.left;

    ball.style.top = height + 'px';
    ball.style.left = window.innerWidth / 2 + 'px';

    clearTimeout(moment);
    game = false;

};

window.addEventListener('keypress', function (e) {


    let pos1 = r1.getBoundingClientRect();
    let rodSpeed = 20;
    if (event.code == 'KeyD' && ((pos1.x + pos1.width) < window.innerWidth)) {
        r1.style.left = (pos1.x) + rodSpeed + 'px';
        r2.style.left = r1.style.left;
        if (!game) {

            ball.style.left = (pos1.x) + rodSpeed + pos1.width / 2 + 'px';
        }
    }
    else if (event.code == 'KeyA' && (pos1.x > 0)) {
        r1.style.left = (pos1.x) - rodSpeed + 'px';
        r2.style.left = r1.style.left;
        if (!game) {

            ball.style.left = (pos1.x) - rodSpeed + pos1.width / 2 + 'px';
        }
    }

    let ballRect = ball.getBoundingClientRect();
    let ballX = ballRect.x;
    let ballY = ballRect.y;
    let balldia = ballRect.width;

    let rod1Height = rod1.offsetHeight;
    let rod2Height = rod2.offsetHeight;
    let rod1Width = rod1.offsetWidth;
    let rod2Width = rod2.offsetWidth;


    if (event.code == 'Enter') {

        if (!game) {

            game = true;
            moment = setInterval(function () {

                ballX += ballSpeedX;
                ballY += ballSpeedY;

                rod1X = rod1.getBoundingClientRect().x;
                rod2X = rod2.getBoundingClientRect().x;


                ball.style.left = ballX + 'px';
                ball.style.top = ballY + 'px';

                if ((ballX + balldia) > window.innerWidth || ballX < 0) {
                    ballSpeedX = - ballSpeedX;
                }

                let ballpos = ballX + balldia / 2;

                if (ballY <= rod1Height) {
                    ballSpeedY = -ballSpeedY;
                    play1_score += 100;


                    if (ballpos < rod1X || ballpos > (rod1X + rod1Width)) {
                        game = false;
                        resetboard(rod1Height);
                        scoreboard('player2', play1_score);
                    }
                }

                else if ((ballY + balldia) >= (window.innerHeight - rod2Height)) {
                    ballSpeedY = - ballSpeedY;
                    play2_score += 100;

                    if (ballpos < rod2X || (rod2X + rod2Width) < ballpos) {
                        game = false;
                        resetboard(window.innerHeight - rod2Height - balldia);
                        scoreboard('player1', play2_score);
                    }
                }

            }, 10)
        }
    }
});

