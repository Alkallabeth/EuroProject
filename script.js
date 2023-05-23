/* 

This file is the main brain behind player movement and handling.

*/



//  Makes it easier to toggle element visibility

HTMLElement.prototype.hide = function(){
    this.classList.add("d-none");
}
HTMLElement.prototype.show = function(){
    this.classList.remove("d-none");
}

// Hides Xbox controller icons in case no controllers are connected

let cs = document.querySelectorAll(".controller-controls");
for(let i=0;i<cs.length;i++){
    cs[i].hide();
}

// Plays audio files (used for character screen)

const audio = new Audio();
function playSound(url){
    audio.pause();
    const fullLink = "./assets/audio/" + url;
    audio.src = fullLink;
    audio.load();
    audio.play();
}

// Initializes variables

const shadowScreen = document.getElementById("shadow-screen");
let numberOfPlayers = 2;
let players = [];
let currentTurn = 0;
let currentQuestion = null;
let radical = false;

// Changes number of players based on user selection

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

// Changes screens when user clicks button

document.getElementById("show-rules-btn").addEventListener("click",function(){
    document.getElementById("start-screen").hide();
    document.getElementById("rules-screen").show();
    Controls.clear();
    Controls.a = function(){
        document.getElementById("start-game-btn").click();
    }
});
document.getElementById("start-game-btn").addEventListener("click",function(){
    document.getElementById("rules-screen").hide();
    document.getElementById("character-screen").show();
    Mouse.activate();
    Controls.a = function(){
        Mouse.click();
    }
    Controls.x = function(){
        document.getElementById("character-selection-confirm").click();
    }
});

// Controls character selection and creates pieces when all players have selected characters

let characterSelectionCompleted = 0;
function setCharacter(name,img){
    let lastPlayer = {name:"noCharacters"};
    if(players.length > 0){
        let lastPlayer = players[players.length - 1];
    }
    if(lastPlayer.name != name){
        locked = false;
        let rect = document.querySelector(`img[title="${name}"]`).getBoundingClientRect();
        let shade = document.createElement("div");
        shade.classList.add("shade");
        shade.style.width = rect.width + "px";
        shade.style.height = rect.height + "px";
        shade.style.left = rect.left + "px";
        shade.style.top = rect.top + "px";
        document.body.appendChild(shade);
        let t;
        if(characterSelectionCompleted%2 == 0){
            t = "m";
        } else {
            t = "g";
        }
        players.push(new Player(name,t,img));
        characterSelectionCompleted++;
        let addC = "&emsp;";
        if(gamepadConnected){
            addC += `<span class="a"></span>`;
        }
        if(characterSelectionCompleted < numberOfPlayers){
            document.getElementById("currentCharSelectionP").innerHTML = `Player ${characterSelectionCompleted + 1}, Select Your Character!${addC}`;
        } else {
            document.getElementById("character-screen").hide();
            document.getElementById("gameboard-screen").show();
            Mouse.deactivate();
            Controls.rt = function(){
                document.getElementById("dice").click();
            }
            players.forEach(function(p){
                p.div.show();
            });
            let shades = document.querySelectorAll(".shade");
            for(let i=0;i<shades.length;i++){
                shades[i].remove();
            }
            audio.pause();
        }
    }
}

// Displays/hides Xbox controller controls based on whether a controller is connected or not

if(gamepadConnected){
    document.getElementById("dice").innerHTML = "RT: 1";
} else {
    document.getElementById("dice").innerHTML = "1";
}

// Rolls dice

document.getElementById("dice").addEventListener("click",function(){
    let add = "";
    if(gamepadConnected){
        add = "RT: ";
    }
    this.disabled = true;
    const num = Math.ceil(Math.random() * 6);
    let die = this;
    this.classList.add("dice-spin");
    const changeNum = setInterval(function(){
        let newNum = Math.ceil(Math.random() * 6);
        die.innerHTML = add + newNum;
    },50)
    setTimeout(function(){
        clearInterval(changeNum);
        die.innerHTML = add + num;
        die.classList.remove("dice-spin");
        setTimeout(function(){
            players[currentTurn].moveForward(num);
        },750);
    },500);
});

// Controls everything to do with players

class Player{
    
    // Initializes character based on character selection
    
    constructor(name,team,imgSrc){
        this.imgSrc = imgSrc;
        this.name = name;
        this.team = team;
        this.space = -1;
        this.popularity = 0;
        this.div = document.createElement("div");
        this.div.classList.add("player","d-none");
        let center = document.createElement("center");
        this.div.appendChild(center);
        let img = document.createElement("img");
        img.src = this.imgSrc;
        img.classList.add("player-img");
        img.title = this.name;
        this.img = img;
        if(this.team == "m"){
            this.img.classList.add("player-mountain");
        } else {
            this.img.classList.add("player-girondin");
        }
        this.div.style.zIndex = "5";
        center.appendChild(img);
        document.body.appendChild(this.div);
        this.moveForward(1);
    }
    
    // Moves the player forward smoothly
    
    moveForward(n){
        this.div.style.zIndex = "7";
        if( (this.space + n) > 76){
            this.completeAction();
            return;
        }
        let obj = this;
        let canMove = n;
        for(let i=1;i<n;i++){
            const spaceElem = document.querySelector(`.${this.team}${this.space + i}`);
            if(spaceElem.classList.contains("space-event") && spaceElem.dataset.complete == "0"){
                canMove = i;
            }
        }
        for(let i=0;i<canMove;i++){
            setTimeout(function(){
                obj.space++;
                const spaceElement = document.querySelector(`.${obj.team}${obj.space}`);
                const newPosition = spaceElement.getBoundingClientRect();
                const newX = newPosition.left;
                const newY = newPosition.top;
                obj.div.style.left = `calc(${newX}px + 1vw)`;
                obj.div.style.top = `calc(${newY}px + 1vw)`;
                if(spaceElement.classList.contains("space-event")){
                    return;
                }
                if(spaceElement.classList.contains("space-finish")){
                    return;
                }
            },i * 500);
        }
        setTimeout(function(){
            obj.takeAction();
        }, canMove * 500);
    }
    
    // Moves player backward (used in radical phase events)
    
    moveBackward(n){
        for(let i=0;i<n;i++){
            this.space--;
            const spaceElement = document.querySelector(`.${this.team}${this.space}`);
            const newPosition = spaceElement.getBoundingClientRect();
            const newX = newPosition.left;
            const newY = newPosition.top;
            this.div.style.left = `calc(${newX}px + 1vw)`;
            this.div.style.top = `calc(${newY}px + 1vw)`;
        }
    }
    
    // When movement animation is done, completes action based on square
    
    takeAction(){
        
        const spaceElement = document.querySelector(`.${this.team}${this.space}`);
        
        // If a player has reached the radical phase and doesn't have 5 popularity, execute them
        
        if(this.space > 58){
            radical = true;
        }
        if(radical && (this.popularity < 5)){
            document.getElementById("guillotine-screen").show();
            document.getElementById("guillotine-message").innerHTML = `${this.name} was too unpopular and was executed!`;
            this.div.remove();
            this.completeAction = function(){
                document.getElementById("guillotine-screen").hide();
                players.splice(players.indexOf(this),1);
                currentTurn++;
                if(currentTurn >= players.length){
                    currentTurn = 0;
                }
                document.getElementById("dice").disabled = false;
            }
        } else if(spaceElement.classList.contains("space-popularity-gain")){
            
            // Gain popularity space (+1 P)
            
            this.changePopularity(1);
            
            popup("success",`${this.name} gained a Popularity Point! ${this.name} now has ${this.popularity} Popularity Points.`);
            this.completeAction();
            
        } else if(spaceElement.classList.contains("space-popularity-lose")){
            
            // Lose popularity space (-1 P)
            
            this.changePopularity(-1);
            if(this.popularity < 0){
                this.popularity = 0;
            }
            popup("danger",`${this.name} lost a Popularity Point 🤦. ${this.name} now has ${this.popularity} Popularity Points.`);
            this.completeAction();
            
        } else if(spaceElement.classList.contains("space-task")){
            
            // Randomly choose between a geography question or an achievement question and display the question
            
            shadowScreen.show();
            shadowScreen.style.zIndex = "10";
            let rand = Math.random();
            if(rand < 0.5){
                let q = new GeographyQuestion();
            } else {
                let q = new AchievementQuestion();
            }
            document.getElementById("card-task").show();
            
        } else if(spaceElement.classList.contains("space-event")){
            
            // Do a 3 question quiz for events, do nothing if event is already complete
            
            shadowScreen.show();
            shadowScreen.style.zIndex = "10";
            if(spaceElement.dataset.complete == "0"){
                document.getElementById("card-event").innerHTML = `<p class="display-3">Complete ${spaceElement.dataset.eventname}</p><hr>`;
                let quiz = new Quiz(spaceElement.dataset.eventname);
            } else {
                this.completeAction();
            }
            
        } else if(spaceElement.classList.contains("space-wheel")){
            
            // Awards 1 popularity to a random player
            
            let randomPlayer = players[Math.floor(Math.random() * players.length)];
            randomPlayer.changePopularity(1);
            popup("info",`${randomPlayer.name} gained a Popularity Point! ${randomPlayer.name} now has ${randomPlayer.popularity} Popularity Points.`);
            this.completeAction();
        } else if(spaceElement.classList.contains("space-split")){
            
            // Do nothing if the player lands on the split space (where the girondins and mountains go different ways)
            
            this.completeAction();
        } else if(spaceElement.classList.contains("space-finish")){
            
            // End the game and calculate the winner
            
            const winningTeam = this.team;
            document.getElementById("gameboard-screen").hide();
            let biggests = [players[0]];
            let biggestNum = 0;
            players.forEach(function(p){
                p.div.remove();
                if((p.team == winningTeam) && (p.space > 58)){
                    let score = p.popularity - (76 - p.space);
                    if(score > biggestNum){
                        biggestNum = score;
                        biggests = [p];
                    } else if(score == biggestNum){
                        biggests.push(p);
                    }
                }
            });
            let fm = document.getElementById("finish-message");
            if(biggests.length == 1){
                fm.innerHTML = `${biggests[0].name} won!`;
            } else {
                fm.innerHTML = "It's a tie between ";
                biggests.forEach(function(b){
                    fm.innerHTML += `${b.name} and `;
                });
                fm.innerHTML = fm.innerHTML.substring(0,fm.innerHTML.length - 4) + "!";
            }
            document.getElementById("finish-screen").show();
            const sP = document.getElementById("stats-p");
            players.forEach(function(p){
                let score = p.popularity - (76 - p.space);
                sP.innerHTML += `<br>${p.name}: ${p.popularity}, ${score}`;
            });
        }
    }
    answerTask(correct,actual=""){
        
        // Handle user's answer of tasks, take action based on correct/incorrect answer
        
        document.getElementById("card-task").hide();
        Controls.clear();
        Controls.a = function(){
            completeAction();
        }
        if(correct){
            this.changePopularity(2);
            document.getElementById("card-pass").childNodes[1].innerHTML = `${this.name} successfully completed the task!`;
            document.getElementById("card-pass").show();
            popup("success",`${this.name} gained 2 Popularity Points! ${this.name} now has ${this.popularity} Popularity Points.`);
        } else {
            this.changePopularity(-1);
            document.getElementById("card-fail").childNodes[1].innerHTML = `${this.name} failed the task 🤦.${actual}`;
            document.getElementById("card-fail").show();
            popup("danger",`${this.name} lost a Popularity Point 🤦. ${this.name} now has ${this.popularity} Popularity Points.`);
        }
    }
    
    // Changes popularity. Player can't have negative popularity
    
    changePopularity(n){
        this.popularity += n;
        if(this.popularity < 0){
            this.popularity = 0;
        }
    }
    
    // Finishes turn, next player
    
    completeAction(){
        currentTurn++;
        if(currentTurn >= players.length){
            currentTurn = 0;
        }
        document.getElementById("card-task").innerHTML = `<p class="display-3">Complete a task</p><hr>`;
        document.getElementById("card-task").hide();
        document.getElementById("card-event").hide();
        document.getElementById("card-pass").hide();
        document.getElementById("card-fail").hide();
        shadowScreen.hide();
        shadowScreen.style.zIndex = "0";
        this.div.style.zIndex = "5";
        document.getElementById("dice").disabled = false;
    }
    finishQuiz(pass){
        
        // Handles when the user has successfully completed the quiz or failed. If they passed and it's a radical phase event, whichever player on the other team is farthest moves back 3 spaces
        
        document.getElementById("card-event").hide();
        if(!pass){
            this.changePopularity(-2);
            document.getElementById("card-fail").childNodes[1].innerHTML = `${this.name} failed the quiz 🤦`;
            this.moveBackward(3);
            document.getElementById("card-fail").show();
            popup("danger",`${this.name} lost 2 Popularity Points 🤦. ${this.name} now has ${this.popularity} Popularity Points.`);
        } else {
            this.changePopularity(3);
            document.querySelector(`.${this.team}${this.space}`).dataset.complete = "1";
            document.getElementById("card-pass").childNodes[1].innerHTML = `${this.name} passed the quiz!`;
            document.getElementById("card-pass").show();
            popup("success",`${this.name} gained 3 Popularity Points! ${this.name} now has ${this.popularity} Popularity Points.`);
            if(radical){
                let team = this.team;
                let farthest;
                let farthestNum = 0;
                players.forEach(function(p){
                    if(team != p.team){
                        if((p.space > farthestNum) && (p.space > 2)){
                            farthestNum = p.space;
                            farthest = p;
                        }
                    }
                });
                if(farthest.space > 58){
                    farthest.moveBackward(3);
                }
            }
        }
        document.getElementById("card-event").hide();
    }
}

// Used to universally finish turn

function completeAction(){
    players[currentTurn].completeAction();
}

// Displays popup message in bottom left corner (used when popularity changes)

function popup(color,message){
    try{
        document.querySelector(".message").remove();
    } catch(error){
        // Delete existing popup, if any
    }
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("rounded","message",`bg-${color}`,"p-3","text-white");
    messageDiv.innerHTML = message;
    document.body.appendChild(messageDiv);
    setTimeout(function(){
        messageDiv.remove();
    },5000);
    let min = 76;
    players.forEach(function(p){
        if(p.space < min){
            min = p.space;
        }
    });
    if(min > 10){
        messageDiv.style.top = "20px";
        messageDiv.style.bottom = "";
    }
}
