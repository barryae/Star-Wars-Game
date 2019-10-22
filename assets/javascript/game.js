const characters = [
    {
        name: 'Darth Sideous',
        hp: 100,
        attack: 40,
        counter: 15,
        defense: 20,
        attackIncrementer: 2,
        sith: true,
        image: "assets/images/characters/sideous.png",
        quote: "Release your anger",

    },

    {
        name: 'Jar Jar Binks Sith Lord',
        hp: 150,
        attack: 30,
        counter: 10,
        defense: 15,
        attackIncrementer: 3,
        sith: true,
        image: "assets/images/characters/jar.png",
        quote: "Meesa bring dawrkness to the galaxy",
    },

    {
        name: 'Darth Vader',
        hp: 200,
        attack: 30,
        counter: 20,
        defense: 20,
        attackIncrementer: 3,
        sith: true,
        image: "assets/images/characters/vader.png",
        quote: "Nooooooooooooo",
    },

    {
        name: 'Obi Wan Kenobi',
        hp: 150,
        attack: 25,
        counter: 20,
        defense: 30,
        attackIncrementer: 3,
        sith: false,
        image: "assets/images/characters/obi.png",
        quote: "Only a Sith deals in absolutes",
    },

    {
        name: 'Yoda',
        hp: 100,
        attack: 20,
        counter: 30,
        defense: 15,
        attackIncrementer: 5,
        sith: false,
        image: "assets/images/characters/yoda.png",
        quote: "Patience you must have padawan",
    },

    {
        name: 'Luke Skywalker',
        hp: 130,
        attack: 25,
        counter: 30,
        defense: 20,
        attackIncrementer: 4,
        sith: false,
        image: "assets/images/characters/luke.png",
        quote: "I will not fight you",
    },
]
const toolbarText = [`
                <div class="column instructions">
                    <h2>Instructions:</h2>
                    <p>Choose a player from the Jedi or Sith.</p>
                    <p>You will then
                    fight the three members from the other side in the order you
                    choose. Your enemies cannot defend but they can counterattack.
                    your attack will go up each time you attack as well. Good Luck!</p>
                </div>`,
    `<div class="column instructions">
                    <h2>Instructions:</h2>
                    <p>You will have to defeat all three enemies to win!
                        Choose your first opponent wisely.</p>
                </div>`,
    `<div class="column instructions">
                    <h2>Instructions</h2>
                    <p>Click attack to strike. Your attack will go up each time.
                    Your enemy will counterattack automatically.</p>
                </div>
`
];
let gameState = null;
let playerChoice = null;
let enemyChoice = null;

function main() {
    let darkSide = document.getElementsByClassName("dark-side")[0];
    let lightSide = document.getElementsByClassName("light-side")[0];
    let toolbar = document.getElementsByClassName("toolbar")[0];
    characterRender();
    toolbarRender();

    function characterRender() {
        if (gameState === null) {
            for (let i = 0; i < characters.length; i++) {
                let card = createCharacterCard(characters[i]);
                if (characters[i].sith === true) {
                    darkSide.appendChild(card);
                } else {
                    lightSide.appendChild(card);
                }
            }
        } else if (gameState === "choose enemy") {
            let card = createCharacterCard(playerChoice);
            if (playerChoice.sith === true) {
                darkSide.innerHTML = '';
                darkSide.appendChild(card);
            } else {
                lightSide.innerHTML = '';
                lightSide.appendChild(card);
            }

        } else if (gameState === "attack mode") {
            let card = createCharacterCard(enemyChoice);
            if (enemyChoice === null) {
                for (let i = 0; i < characters.length; i++) {
                    let attackCard = createCharacterCard(characters[i]);
                    if (playerChoice.sith === false && characters[i].hp > 0) {
                        darkSide.appendChild(attackCard);
                    } else if (playerChoice.sith === true && characters[i].hp > 0) {
                        lightSide.appendChild(attackCard);
                    } else {
                        alert("You Win!");
                    }
                }
            }
            else if (enemyChoice.sith === true) {
                darkSide.innerHTML = '';
                darkSide.appendChild(card);
            } else {
                lightSide.innerHTML = '';
                lightSide.appendChild(card);
            }

        }

    }

    function toolbarRender() {
        let resetButton = document.createElement('button');
        resetButton.className = "reset";
        resetButton.innerHTML = 'Reset';
        resetButton.addEventListener('click', function () {
            location.reload();
        });
        let attackButton = document.createElement('button');
        attackButton.className = 'attack';
        attackButton.innerHTML = 'Attack';
        attackButton.addEventListener('click', function () {
            enemyChoice.hp -= playerChoice.attack;
            if (enemyChoice.hp <= 0) {
                enemyChoice = null;
                characterRender();
            } else {
                characterRender();
            }
        })

        if (gameState === null) {
            let toolbarContent = document.createElement("div");
            toolbarContent.className = "toolbar-content";
            toolbarContent.innerHTML = toolbarText[0];
            toolbar.appendChild(toolbarContent);
            toolbarContent.appendChild(resetButton);
        } else if (gameState === "choose enemy") {
            let chooseEnemyToolbar = document.createElement("div");
            chooseEnemyToolbar.className = "toolbar-content";
            chooseEnemyToolbar.innerHTML = toolbarText[1];
            toolbar.innerHTML = '';
            toolbar.appendChild(chooseEnemyToolbar);
            chooseEnemyToolbar.appendChild(resetButton);
        } else {
            let attackToolbar = document.createElement("div");
            attackToolbar.className = "toolbar-content";
            attackToolbar.innerHTML = toolbarText[2];
            toolbar.innerHTML = '';
            toolbar.appendChild(attackToolbar);
            attackToolbar.appendChild(attackButton);
            attackToolbar.appendChild(resetButton);
        }

    }

    function createCharacterCard(character) {
        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <img class="card-img" src="${character.image}">
            <div class="card-descr">
                <p class="name">${character.name}</p>
                <p class="hp">HP:${character.hp}</p>
                <p class="attack">Attack:${character.attack}</p>
                <p class="counter">Counter:${character.counter}</p>
                <p class="defense">Defense:${character.defense}</p>
                <p class="flavor">${character.quote}</p>
            </div>`;
        card.addEventListener("click", function () {
            if (gameState === null) {
                playerChoice = character;
                gameState = "choose enemy";
                main();
            } else if (gameState === "choose enemy" && character !== playerChoice && character.hp > 0) {
                enemyChoice = character;
                gameState = "attack mode";
                main();
            }
        });
        return card;
    }
}

main();




//look up truthy and falsey//
//set up a conditonal sequence in main where it starts with all characters


//when attack button is pressed:
//substract (pl - enemyDef) from enemy HP
    //if enemyHp=0 
        //bring other two enemies on the screen
           //choose next enemy
            //on click get rid of other enemy and center new enemy
              //return to attack mode
// else if enemy counters, substract their from player hp
    //if player HP = 0, Game Over
        //Try again? (reset)
//add 5 to player attack stat.
