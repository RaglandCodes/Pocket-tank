var gunAngle = 6, gunAngleRad, gunEnd = [];
var bombX, bombY; //bomb coordinates
var dy, dy;     //change in bomb coordinates
var gravity = 0.01;
var points = 0, triesLeft =10;



function prepareBattleField(){
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();        // hill triangle
    ctx.moveTo(450, 450);
    ctx.lineTo(350, 150);
    ctx.lineTo(250, 450);
    
    ctx.fillRect(22,430, 55, 20);   // my tank body
    ctx.closePath();
    ctx.fill();

    ctx.fillRect(722,430, 55, 20);   // enemy tank body
    ctx.closePath();
    ctx.fill();

    ctx.moveTo(769, 430);           // enemy tank gun
    ctx.lineTo(720  , 420); 
    ctx.stroke();
    drawTankGun(gunAngle);
}

function drawTankGun(gunAngle){
    var ctx = canvas.getContext('2d');
    ctx.lineWidth = 4;
    
    gunAngleRad = -gunAngle * (Math.PI / 180);
    
    gunEnd[0] = 25 + 75 * Math.cos(gunAngleRad);
    gunEnd[1] = 430 + 75 * Math.sin(gunAngleRad);

    ctx.moveTo(25, 430);
    ctx.lineTo(gunEnd[0], gunEnd[1]); 
    ctx.stroke();
    

}

function checkCollisions(){
    if(bombX>250 && bombX <350)
    {
      //  alert(bombX + " " + bombY)   ;
        if(bombY > (-(3*bombX) + 1200))
        {
            $("#messages").text("That bomb got wasted :(. Try agin");
            window.cancelAnimationFrame(bombAnimaton);
            
        }
        
    }
    else if(bombY > canvas.height)
    {
        $("#messages").text("The bomb was grounded :(")
        window.cancelAnimationFrame(bombAnimaton);
    }
    else if(bombX > canvas.width)
        {
            $("#messages").text("That was overshot :( Try again")
            window.cancelAnimationFrame(bombAnimaton);
        }
        else if((bombX > 722 && bombX<772) && (bombY>430 && bombY<450))
        {
            points += 1;
            
            $("#points").text(points);
            $("#messages").text("You've scored ^_^")

            gunAngle = 7;
            window.cancelAnimationFrame(bombAnimaton);
        }
}
function drawBomb(){
    //alert("ii");
    var ctx = canvas.getContext('2d');
    
    prepareBattleField();

    ctx.beginPath();
    ctx.arc(bombX, bombY, 10, 0, Math.PI*2);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();

    bombX += dx;
    bombY += dy;
    checkCollisions();
    dy += gravity;

    
    
    var bombAnimaton = window.requestAnimationFrame(drawBomb);
    
}
function fire(){
    var ctx = canvas.getContext('2d');
    
    dx = (Math.cos(gunAngleRad))*3;
    dy = (Math.sin(gunAngleRad))*3;
    
    /*ctx.beginPath();
    ctx.arc(gunEnd[0], gunEnd[1], 10, 0, Math.PI*2);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();*/

    bombX = gunEnd[0];
    bombY = gunEnd[1];

    triesLeft -= 1;
    $("#tries-left").html(triesLeft);
    $("#messages").text("");
    
    if(triesLeft == 0)
    {
        $("#controls").text("The game is over.");
        $("#controls").append("<br> You scored " + points + " points <br>.");
        $("#controls").append("<button onClick='location.reload()'> Play again </button>")
    }
    window.requestAnimationFrame(drawBomb);
    //drawBomb();
}

function reload(){

}
function all(){
    
    prepareBattleField();

    $("#plus-angle").click(function(){
        if(gunAngle<90)
        {
            gunAngle += 2;
            prepareBattleField();
        }
        else{
            $("#messages").text("That's tooo far");
        }
        
        //drawTankGun(gunAngle);
    });
    
    $("#minus-angle").click(function(){
        
        if(gunAngle>2)
        {
            gunAngle -= 2;
            prepareBattleField();
        }
        else{
            $("#messages").text("That's too far");
        }
    });

    $(".angle-change-button").click(function(){
        window.cancelAnimationFrame(bombAnimaton);
    });
    $("#fire").click(fire);
} // end of all function

$(document).ready(all);
