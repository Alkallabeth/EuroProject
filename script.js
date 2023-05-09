// Makes it easier to toggle visibility state of <div>s
HTMLElement.prototype.hide = function(){
    this.style.display = "none";
}
HTMLElement.prototype.show = function(){
    this.style.display = "block";
}

// Initializes number of players to 4
let numberOfPlayers = 4;

// Lets user select number of players
document.getElementById("two-player-btn").addEventListener("click",function(){
    document.getElementById("six-player-btn").classList.remove("active");
    document.getElementById("four-player-btn").classList.remove("active");
    this.classList.add("active");
    numberOfPlayers = 2;
});

document.getElementById("four-player-btn").addEventListener("click",function(){
    document.getElementById("two-player-btn").classList.remove("active");
    document.getElementById("six-player-btn").classList.remove("active");
    this.classList.add("active");
    numberOfPlayers = 4;
});

document.getElementById("six-player-btn").addEventListener("click",function(){
    document.getElementById("four-player-btn").classList.remove("active");
    document.getElementById("two-player-btn").classList.remove("active");
    this.classList.add("active");
    numberOfPlayers = 6;
});

// Hides start screen when user clicks start button
document.getElementById("start-game-btn").addEventListener("click",function(){
    document.getElementById("start-screen").hide();
});
