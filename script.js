// Makes it easier to toggle visibility
HTMLElement.prototype.hide = function(){
    this.classList.add("d-none");
}
HTMLElement.prototype.show = function(){
    this.classList.remove("d-none");
}

let numberOfPlayers = 4;

// Sets number of players based on user selection
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

// Transitions from start screen to rule screen
document.getElementById("show-rules-btn").addEventListener("click",function(){
    document.getElementById("start-screen").hide();
    document.getElementById("rules-screen").show();
});

//Transitions from rules screen to game screen
document.getElementById("start-game-btn").addEventListener("click",function(){
    document.getElementById("rules-screen").hide();
});
