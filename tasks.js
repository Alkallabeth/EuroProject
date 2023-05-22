/* 

This file handles everything to do with the tasks and quizzes

*/

class GeographyQuestion{
    constructor(){
        
        // All the modern European countries except the micronations, plus Prussia
        
        let countriesList = [
  "Albania",
  "Austria",
  "Belarus",
  "Belgium",
  "Bosnia",
  "Bulgaria",
  "Croatia",
  "Czechia",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hungary",
  "Iceland",
  "Ireland",
  "Italy",
  "Latvia",
  "Lithuania",
  "Luxembourg",
  "Macedonia",
  "Moldova",
  "Montenegro",
  "Norway",
  "Poland",
  "Portugal",
  "Prussia",
  "Romania",
  "Russia",
  "Serbia",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Sweden",
  "Switzerland",
  "Ukraine",
  "United Kingdom"
];
        
        // Chooses 4 random answers
        
        this.a = countriesList[Math.floor(Math.random() * countriesList.length)].split(".")[0];
        countriesList.splice(countriesList.indexOf(this.a),1);
        this.b = countriesList[Math.floor(Math.random() * countriesList.length)].split(".")[0];
        countriesList.splice(countriesList.indexOf(this.b),1);
        this.c = countriesList[Math.floor(Math.random() * countriesList.length)].split(".")[0];
        countriesList.splice(countriesList.indexOf(this.c),1);
        this.d = countriesList[Math.floor(Math.random() * countriesList.length)].split(".")[0];
        
        // Out of those 4 random answers, chooses one to be correct
        
        this.correct = Math.floor(Math.random() * 4);
        const letters = ["a","b","c","d"];
        this.correct = letters[this.correct];
        this.correctStr = this[this.correct];
        this.img = `./assets/images/maps/${this[this.correct]}.png`;
        let addClass = "";
        if(gamepadConnected){
            addClass = "d";
        }
        
        // Creates the visual task
        
        this.divString = `<div>
                            <center>
                                <img src="${this.img}" class="geography-image">
                                <br>
                                <br>
                                <div class="row">
                                    <button class="ans-a col btn btn-light" onclick="currentQuestion.answer('a')">${this.a}<br><center><div class="controller-controls ${addClass}pad-top"></div></center></button>
                                    <button class="ans-b col btn btn-light" onclick="currentQuestion.answer('b')">${this.b}<br><center><div class="controller-controls ${addClass}pad-right"></div></center></button>
                                    <button class="ans-c col btn btn-light" onclick="currentQuestion.answer('c')">${this.c}<br><center><div class="controller-controls ${addClass}pad-bottom"></div></center></button>
                                    <button class="ans-d col btn btn-light" onclick="currentQuestion.answer('d')">${this.d}<br><center><div class="controller-controls ${addClass}pad-left"></div></center></button>
                                </div>
                            </center>
                          </div>`;
        document.getElementById("card-task").innerHTML += this.divString;
        
        // Changes controller controls for task answering
        
        Controls.clear();
        Controls.top = function(){
            document.querySelector(".ans-a").click();
        }
        Controls.right = function(){
            document.querySelector(".ans-b").click();
        }
        Controls.down = function(){
            document.querySelector(".ans-c").click();
        }
        Controls.left = function(){
            document.querySelector(".ans-d").click();
        }
        currentQuestion = this;
    }
    answer(ans){
        
        // Handles when the player answers
        
        Controls.clear();
        Controls.rt = function(){
            document.getElementById("dice").click();
        }
        if(ans == this.correct){
            players[currentTurn].answerTask(true);
        } else {
            players[currentTurn].answerTask(false,` The correct answer was ${this.correctStr}.`);
        }
        document.getElementById("card-task").innerHTML = `<p class="display-3">Complete a task</p><hr>`;
    }
}

class AchievementQuestion{
    constructor(){
        
        // All the categories and achievemnts/people
        
        const paintings = {
            "Leonardo da Vinci": "The Last Supper",
            "Sandro Botticelli": "Birth of Venus",
            "Raphael": "School of Athens",
            "Donatello": "Penitent Magdalene",
            "Brunelleschi": "The Duomo",
            "Albrecht Dürer": "Self Portrait",
            "Jan van Eyck": "Portrait of a Man",
            "Peter Paul Rubens": "The Elevation of the Cross",
            "Michelangelo": "Creation of Adam",
            "El Greco": "Laocoon",
            "Rembrandt": "The Night Watch",
            "Jaques-Louid Davis": "Oath of the Horatii",
            "Claude Monet": "Impression, Sunrise",
            "Van Gogh": "Starry Night",
            "Pablo Picasso": "Guernica",
            "Salvador Dalí": "The Persistence of Memory"
        };
        const religion = {
            "Martin Luther": "95 Theses",
            "John Calvin": "Predestination",
            "Ulrich Zwingli": "Milleniarianism",
            "Menno Simons": "Mennonite Church",
            "John Wesley": "Methodism",
            "Pope Paul III": "Council of Trent",
            "Ignatius of Loyola": "Jesuits",
            "Pope Leo X": "Concordat of Bologna",
            "Pope Pius  IX": "First Vatican Council"
        };
        const thinkyThinkers = {
            "Petrarch": "Humanism",
            "Machiavelli": "Maintain power at all costs",
            "Erasmus": "Christian Humanism",
            "John Locke": "Popular Sovereignty and Natural Rights",
            "Thomas More": "Utopia",
            "Rene Descartes": "I think therefore I am",
            "David Hume": "Skepticism",
            "Friedrich Nietzsche": "Existentialism",
            "Voltaire": "Enlightenment ideals",
            "Emmanuel Kant": "Universal morals",
            "Jean-Paul Sarte": "Every existing thing is born without reason, prolongs itself out of weakness, and dies by chance",
            "Francis Bacon": "Inductive Reasoning",
            "Thomas Hobbes": "War is humankind's natural state",
            "Albert Camus": "Absurdism"
            
        };
        const artStyles = {
            "Sandro Botticelli": "Neoplatonic",
            "El Greco": "Mannerism",
            "Leonardo da Vinci": "Polymath",
            "Rembrandt": "Baroque",
            "Jacques-Louis David": "Neoclassicism",
            "Francisco Goya": "Rococo",
            "Claude Monet": "Impressionism",
            "Eugene Delacroix": "Romanticism",
            "Van Gogh": "Post-Impressionism",
            "Pablo Picasso": "Cubism",
            "Salvador Dalí": "Surrealism",
            "Jackson Pollock": "Abstract Expressionism"
        };
        const oldMonarchs = {
            "Ferdinand & Isabella": "United Spain",
            "Henry IV": "Implemented the Edict of Nantes",
            "Henry of Guise": "Started French religious wars",
            "Henry III": "King of France before the religious wars",
            "Charles I": "Defeated by Oliver Cromwell",
            "James I": "Gunpowder plot target",
            "Charles II": "Replaced Oliver Cromwell",
            "James II": "Deposed in Glorious Revolution",
            "Louis XIV": "Started many wars",
            "Louis XV": "Louis the beloved",
            "Louis XVI": "Deposed during the French Revolution"
        };
        const scientists = {
            "Galileo Galilei": "Inertia",
            "Francis Bacon": "Inductive Reasoning",
            "Newton": "Gravity",
            "Copernicus": "Heliocentric model",
            "Robert Hooke": "Coined the term \"cell\"",
            "William Harvey": "Blood Circulation",
            "Albert Einstein": "Theory of Relativity",
            "Max Planck": "Quanta",
            "Johannes Kepler": "Planets orbit in ellipses",
            "Tycho Brahe": "Developed instruments to accurately observe stars",
            "Robert Boyle": "The volume of a gas varies with the pressure exerted on it",
            "Antoine Lavoisier": "Invented naming system for chemical elements",
            "Marie-Anne Lavoiser": "Learned English to translate the work of British chemists for her husband",
            "Maria Merian": "Metamorphosis of the Insects of Surinam",
            "Margaret Cavendish": "Observations upon Experimental Philosophy",
            "Vesalius": "On the Fabric of the Human Body",
            "Paracelsus": "Modern Medicine"
            
        };
        
        // Chooses a random category
        
        const allLists = [paintings,religion,thinkyThinkers,artStyles,oldMonarchs,scientists];
        let chosenObject = allLists[Math.floor(Math.random() * allLists.length)];
        
        
        let chosenList = Object.keys(chosenObject);
        
        // Chooses 4 random answers from the category
        
        this.a = chosenList[Math.floor(Math.random() * chosenList.length)];
        chosenList.splice(chosenList.indexOf(this.a),1);
        this.b = chosenList[Math.floor(Math.random() * chosenList.length)];
        chosenList.splice(chosenList.indexOf(this.b),1);
        this.c = chosenList[Math.floor(Math.random() * chosenList.length)];
        chosenList.splice(chosenList.indexOf(this.c),1);
        this.d = chosenList[Math.floor(Math.random() * chosenList.length)];
        
        // Chooses 1 correct answer
        
        this.correct = Math.floor(Math.random() * 4);
        const letters = ["a","b","c","d"];
        this.correct = letters[this.correct];
        this.achievement = chosenObject[this[this.correct]];
        let addClass = "";
        if(gamepadConnected){
            addClass = "d";
        }
        
        // Creates visual task
        
        this.divString = `<div>
                            <center>
                                <p class="display-5">${this.achievement}</p>
                                <br>
                                <div class="row">
                                    <button class="ans-a col btn btn-light" onclick="currentQuestion.answer('a')">${this.a}<br><center><div class="controller-controls ${addClass}pad-top"></div></button>
                                    <button class="ans-b col btn btn-light" onclick="currentQuestion.answer('b')">${this.b}<br><center><div class="controller-controls ${addClass}pad-left"></div></button>
                                    <button class="ans-c col btn btn-light" onclick="currentQuestion.answer('c')">${this.c}<br><center><div class="controller-controls ${addClass}pad-bottom"></div></button>
                                    <button class="ans-d col btn btn-light" onclick="currentQuestion.answer('d')">${this.d}<br><center><div class="controller-controls ${addClass}pad-right"></div></button>
                                </div>
                            </center>
                          </div>`;
        document.getElementById("card-task").innerHTML += this.divString;
        
        // Sets controller controls
        
        Controls.clear();
        Controls.top = function(){
            document.querySelector(".ans-a").click();
        }
        Controls.left = function(){
            document.querySelector(".ans-b").click();
        }
        Controls.bottom = function(){
            document.querySelector(".ans-c").click();
        }
        Controls.right = function(){
            document.querySelector(".ans-d").click();
        }
        currentQuestion = this;
    }
    answer(ans){
        
        // Handles answering
        
        Controls.clear();
        Controls.rt = function(){
            document.getElementById("dice").click();
        }
        if(ans == this.correct){
            players[currentTurn].answerTask(true);
        } else {
            players[currentTurn].answerTask(false);
        }
        document.getElementById("card-task").innerHTML = `<p class="display-3">Complete a task</p><hr>`;
    }
}

class Quiz{
    constructor(eventName){
        
        // Handles random quiz creation. If player gets a question wrong, stop the quiz.
        
        this.eventName = eventName;
        document.getElementById("card-event").show();
        document.getElementById("card-event").childNodes[1].innerHTML = `Complete ${this.eventName}`;
        let rand = Math.random() * 2;
        let q1;
        if(rand < 0.6){
            q1 = new GeographyQuestion();
        } else {
            q1 = new AchievementQuestion();
        }
        document.getElementById("card-event").innerHTML += q1.divString;
        let quiz = this;
        q1.answer = function(ans){
            if(ans == q1.correct){
                quiz.completeQ1(true);
            } else {
                quiz.completeQ1(false);
            }
        }
    }
    completeQ1(right){
        document.getElementById("card-event").innerHTML = `<p class="display-3">Complete ${this.eventName}</p><hr>`;
        if(right){
            let rand = Math.random() * 2;
            let q2;
            if(rand < 0.6){
                q2 = new GeographyQuestion();
            } else {
                q2 = new AchievementQuestion();
            }
            document.getElementById("card-event").innerHTML += q2.divString;
            let quiz = this;
            q2.answer = function(ans){
                if(ans == q2.correct){
                    quiz.completeQ2(true);
                } else {
                    quiz.completeQ2(false);
                }
            }
        } else {
            players[currentTurn].finishQuiz(false);
        }
    }
    completeQ2(right){
        document.getElementById("card-event").innerHTML = `<p class="display-3">Complete ${this.eventName}</p><hr>`;
        if(right){
            let rand = Math.floor(Math.random() * 2);
            let q3;
            if(rand == 0){
                q3 = new GeographyQuestion();
            } else {
                q3 = new AchievementQuestion();
            }
            document.getElementById("card-event").innerHTML += q3.divString;
            let quiz = this;
            q3.answer = function(ans){
                if(ans == q3.correct){
                    quiz.completeQ3(true);
                } else {
                    quiz.completeQ3(false);
                }
            }
        } else {
            players[currentTurn].finishQuiz(false);
        }
    }
    completeQ3(right){
        Controls.clear();
        Controls.rt = function(){
            document.getElementById("dice").click();
        }
        document.getElementById("card-event").hide();
        players[currentTurn].finishQuiz(right);
    }
}
