class GeographyQuestion{
    constructor(){
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
        
        this.a = countriesList[Math.floor(Math.random() * countriesList.length)].split(".")[0];
        countriesList.splice(countriesList.indexOf(this.a),1);
        this.b = countriesList[Math.floor(Math.random() * countriesList.length)].split(".")[0];
        countriesList.splice(countriesList.indexOf(this.b),1);
        this.c = countriesList[Math.floor(Math.random() * countriesList.length)].split(".")[0];
        countriesList.splice(countriesList.indexOf(this.c),1);
        this.d = countriesList[Math.floor(Math.random() * countriesList.length)].split(".")[0];
        
        this.correct = Math.floor(Math.random() * 4);
        const letters = ["a","b","c","d"];
        this.correct = letters[this.correct];
        this.img = `./assets/images/maps/${this[this.correct]}.png`;
        
        this.divString = `<div>
                            <center>
                                <img src="${this.img}" class="geography-image">
                                <br>
                                <br>
                                <div class="row">
                                    <button class="col btn btn-light" onclick="currentQuestion.answer('a')">${this.a}</button>
                                    <button class="col btn btn-light" onclick="currentQuestion.answer('b')">${this.b}</button>
                                    <button class="col btn btn-light" onclick="currentQuestion.answer('c')">${this.c}</button>
                                    <button class="col btn btn-light" onclick="currentQuestion.answer('d')">${this.d}</button>
                                </div>
                            </center>
                          </div>`;
        document.getElementById("card-task").innerHTML += this.divString;
        currentQuestion = this;
    }
    answer(ans){
        if(ans == this.correct){
            players[currentTurn].answerTask(true);
        } else {
            players[currentTurn].answerTask(false);
        }
        document.getElementById("card-task").innerHTML = `<p class="display-3">Complete a task</p><hr>`;
    }
}

class AchievementQuestion{
    constructor(){
        const allAchievements = {
            "Maximillien Robespierre": "Committee of Public Safety",
            "Klemens von Metternich": "Principle of Intervention",
            "Karl Marx": "Socialism",
            "Bismarck": "Realpolitik",
            "Count Cavor": "United Northern Italy",
            "Giuseppe Garibaldi": "United Southern Italy",
            "Cecil Rhodes": "Colonized Africa",
            "Michelangelo": "Creation of Adam",
            "Leonardo da Vinci": "The Last Supper",
            "Raphael": "School of Athens",
            "Petrarch": "Humanism",
            "Niccolo Machiavelli": "Maintain Power at all Costs",
            "Johannes Gutenberg": "Printing Press",
            "Brunelleschi": "Basilica di San Lorenzo",
            "Donato Bramante": "St. Peter's Basilica",
            "Baldassare Castiglione": "Book of the Courtier",
            "John Calvin": "Presdestination",
            "Johannes Kepler": "Laws of planetary motion",
            "Galileo Galilei": "Inertia",
            "Francis Bacon": "Inductive Reasoning",
            "Rene Descartes": "I think therefore I am",
            "Newton": "Gravity",
            "Baron de Montesqieu": "Spirit of the Laws",
            "John Locke": "Natural rights",
            "Copernicus": "Heliocentric model",
            "Richard Arkwright": "Water frame",
            "James Hargreaves": "Spinning jenny",
            "Woodrow Wilson": "14 points",
            "Mussolini": "Fascism",
            "Neville Chamberlain": "Appeasement",
            "Joseph Stalin": "5 year plans",
            "Mikhail Gorbachev": "Glasnost",
            "Nikita Krushchev": "De-Stalinization"
        };
        
        let achievementsList = Object.keys(allAchievements);
        
        this.a = achievementsList[Math.floor(Math.random() * achievementsList.length)];
        achievementsList.splice(achievementsList.indexOf(this.a),1);
        this.b = achievementsList[Math.floor(Math.random() * achievementsList.length)];
        achievementsList.splice(achievementsList.indexOf(this.b),1);
        this.c = achievementsList[Math.floor(Math.random() * achievementsList.length)];
        achievementsList.splice(achievementsList.indexOf(this.c),1);
        this.d = achievementsList[Math.floor(Math.random() * achievementsList.length)];

        this.correct = Math.floor(Math.random() * 4);
        const letters = ["a","b","c","d"];
        this.correct = letters[this.correct];
        this.achievement = allAchievements[this[this.correct]];
        
        this.divString = `<div>
                            <center>
                                <p class="display-5">${this.achievement}</p>
                                <br>
                                <div class="row">
                                    <button class="col btn btn-light" onclick="currentQuestion.answer('a')">${this.a}</button>
                                    <button class="col btn btn-light" onclick="currentQuestion.answer('b')">${this.b}</button>
                                    <button class="col btn btn-light" onclick="currentQuestion.answer('c')">${this.c}</button>
                                    <button class="col btn btn-light" onclick="currentQuestion.answer('d')">${this.d}</button>
                                </div>
                            </center>
                          </div>`;
        document.getElementById("card-task").innerHTML += this.divString;
        currentQuestion = this;
    }
    answer(ans){
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
        this.eventName = eventName;
        document.getElementById("card-event").show();
        document.getElementById("card-event").childNodes[1].innerHTML = `Complete ${this.eventName}`;
        let rand = Math.floor(Math.random() * 2);
        let q1;
        if(rand == 0){
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
            let rand = Math.floor(Math.random() * 2);
            let q2;
            if(rand == 0){
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
        document.getElementById("card-event").hide();
        players[currentTurn].finishQuiz(right);
    }
}
