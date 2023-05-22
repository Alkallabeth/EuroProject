/*

This file handles everything to do with character selection

*/

// All the characters

const allCharactersList = [
  "Adolf Hitler.webp",
  "Albert Camus.jpg",
  "Albert Einstein.jpeg",
  "Albert Speer.jpg",
  "Alexander I.jpg",
  "Archduke Franz Ferdinand.jpg",
  "Axel Oxenstierna.jpg",
  "Baldassare Castiglione.jpg",
  "Bismarck.jpg",
  "Boris Yeltsin.jpg",
  "Bramante.jpg",
  "Brunelleschi.jpg",
  "Castlereagh.jpg",
  "Catherine The Great.jpg",
  "Cecil Rhodes.jpg",
  "Charles I.jpg",
  "Christopher Columbus.jpg",
  "Churchill.webp",
  "Claus von Stauffenberg.jpg",
  "Cold Putin.jpg",
  "Copernicus.jpg",
  "Count Cavour.jpg",
  "Danton.jpeg",
  "Elizabeth I.webp",
  "Erwin Rommel.jpeg",
  "Ferdinand Magellan.jpg",
  "Ferdinand.jpg",
  "Francis Bacon.jpeg",
  "Franz Joseph I.webp",
  "Galileo.jpg",
  "Garibaldi.jpg",
  "Gutenberg.jpeg",
  "Henry VIII.webp",
  "Henry the Navigator.jpg",
  "Hernán Cortés.jpg",
  "Isabella.jpeg",
  "Ivan The Terrible.jpeg",
  "James Hargreaves.jpeg",
  "James I.jpg",
  "James II.jpg",
  "Joan of Arc.jpeg",
  "John Calvin.jpeg",
  "John Locke.webp",
  "Karl Marx.jpg",
  "Kepler.jpeg",
  "Klemens von Metternich.jpg",
  "Konrad Adenauer.jpg",
  "Lech Walesa.jpg",
  "Leonardo da Vinci.jpg",
  "Louis XIV.jpg",
  "Louis XVI.jpg",
  "Machiavelli.jpeg",
  "Margaret Thatcher.jpg",
  "Marie Antoinette.jpg",
  "Marquis de Lafayette.webp",
  "Martin Luther.jpeg",
  "Michelangelo.jpg",
  "Mikhail Gorbachev.jpeg",
  "Milan Kundera.jpg",
  "Montesquieu.webp",
  "Mussolini.webp",
  "Napoleon III.jpg",
  "Napoleon.jpg",
  "Neville Chamberlain.jpg",
  "Newton.jpeg",
  "Nicholas II.jpg",
  "Nikita Khrushchev.jpg",
  "Oliver Cromwell.jpeg",
  "Paul von Hindenburg.jpg",
  "Peter The Great.jpg",
  "Petrarch.jpg",
  "Phillip II.webp",
  "Pope Francis.jpg",
  "Pope John Paul II.jpg",
  "Pope Leo X.webp",
  "Queen Victoria.jpg",
  "Raphael.jpg",
  "Rene Descartes.jpeg",
  "Richard Arkwright.jpeg",
  "Robespierre.jpg",
  "Rousseau.jpg",
  "Salvador Dali.jpg",
  "Samuel de Champlain.jpg",
  "Sigmund Freud.jpeg",
  "Silvio Berlusconi.jpg",
  "Simone de Beauvoir.jpeg",
  "Stalin.webp",
  "Vaclav Havel.jpeg",
  "Vasco Nuñez de Balboa.jpg",
  "Vasco de Gama.jpg",
  "Victor Emmanuel II.jpg",
  "Vlad The Impaler.jpeg",
  "Vladimir Putin.jpg",
  "Vladolf Putler.jpeg",
  "Voltaire.jpeg",
  "Wide Putin.jpg",
  "Wilhelm I.jpg",
  "William Shakespeare.jpg",
  "William of Orange.jpg",
  "Willy Brandt.jpg",
  "Woodrow Wilson.webp"
];

let locked = false;

// Creates a dictionary of all the characters and their image files

let allCharactersObject = {};
allCharactersList.forEach(function(path){
    allCharactersObject[path] = "./assets/images/characters/" + path;
});

// Creates all the character images for the character selection screen

function setupCharacters(){
    allCharactersList.forEach(function(char){
        let img = document.createElement("img");
        img.classList.add("character-img");
        img.src = allCharactersObject[char];
        img.title = char.split(".")[0].replaceAll("_"," ");
        document.getElementById("characters-div").appendChild(img);
        
        // Changes big image when user hovers over a character
        
        img.addEventListener("mouseover",function(){
            if(!locked){
                document.getElementById("character-selection-name").innerHTML = this.title;
                document.getElementById("character-selection-img").src = this.src;
            }
        });
        
        // Plays audio file and changes big image when user clicks on a character
        
        img.addEventListener("click",function(){
            playSound(this.title+".wav");
            document.getElementById("character-selection-name").innerHTML = this.title;
            document.getElementById("character-selection-img").src = this.src;
            locked = true;
        });
    });
}
setupCharacters();

// Handles character confirmation and creates a new player

document.getElementById("character-selection-confirm").addEventListener("click",function(){
    let name = document.getElementById("character-selection-name").innerHTML;
    let img = document.getElementById("character-selection-img").src;
    setCharacter(name,img);
});
