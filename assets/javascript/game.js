const characters = [
    {
        name: 'Darth Sideous',
        hp: 100,
        attack: 40,
        counter: 30,
        defense: 15,
        attackIncrementer: 1,
        sith: true,
        image: "assets/images/characters/sideous.png",
        quote: "Release your anger",

    },

    {
        name: 'Jar Jar Binks Sith Lord',
        hp: 150,
        attack: 30,
        counter: 20,
        defense: 20,
        attackIncrementer: 3,
        sith: true,
        image: "assets/images/characters/jar.png",
        quote: "Meesa bring dawrkness to the galaxy",
    },

    {
        name: 'Darth Vader',
        hp: 200,
        attack: 35,
        counter: 25,
        defense: 25,
        attackIncrementer: 1,
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
        counter: 40,
        defense: 15,
        attackIncrementer: 4,
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
        attackIncrementer: 5,
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
                    choose. Your enemies cannot defend but they will counterattack.
                    your attack will go up each time you attack as well. Good Luck!</p>
                </div>`,
    `<div class="column instructions">
                    <h2>Instructions:</h2>
                    <p>You will have to defeat all three enemies to win!
                        Click to choose your next opponent.</p>
                </div>`,
    `<div class="column instructions">
                    <h2>Instructions</h2>
                    <p>Click attack to strike until their HP = 0. Your attack will go up each time you attack.
                    Your enemy will counterattack automatically.</p>
                </div>
`, `<div class="column instructions">
                    <h2>You Win!</h2>
                    <p>Your enemies have been vanquished and the force is back in balance.</p>
                </div>
`

];
let gameState = null;
let playerChoice = null;
let enemyChoice = null;
let enemiesDefeated = 0
let enemiesToDefeat = []

// look into switch statements
// look into truthy and falsey
//  Things left to do:
//     -Lose condition
//        - attack incrementer?
//     -balancing stats
//     -styling

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
                for (let i = 0; i < characters.length; i++) {
                    if (characters[i].sith === false && characters[i].hp > 0) {
                        enemiesToDefeat.push(characters[i]);
                    }
                }

            } else {
                lightSide.innerHTML = '';
                lightSide.appendChild(card);
                for (let i = 0; i < characters.length; i++) {
                    if (characters[i].sith === true && characters[i].hp > 0) {
                        enemiesToDefeat.push(characters[i]);
                    }
                }
            }

        } else if (gameState === "attack mode") {
            if (enemyChoice.sith === true) {
                let card = createCharacterCard(enemyChoice);
                let playerCard = createCharacterCard(playerChoice);
                darkSide.innerHTML = '';
                lightSide.innerHTML = '';
                darkSide.appendChild(card);
                lightSide.appendChild(playerCard);
            } else {
                let card = createCharacterCard(enemyChoice);
                let playerCard = createCharacterCard(playerChoice);
                lightSide.innerHTML = '';
                darkSide.innerHTML = '';
                lightSide.appendChild(card);
                darkSide.appendChild(playerCard);
            }

        }

    }

    function attack() {
        enemyChoice.hp -= playerChoice.attack;
        if (enemyChoice.hp > 0) {
            playerChoice.hp -= (enemyChoice.counter - playerChoice.defense);
            if (playerChoice.hp <= 0) {
                alert("You lose! The force is out of balance.");
            } else {
                playerChoice.attack += playerChoice.attackIncrementer;
                characterRender();
                toolbarRender();
            }
        } else {
            enemiesDefeated += 1;
            if (enemiesDefeated === 3) {
                darkSide.innerHTML = '';
                lightSide.innerHTML = '';
                let resetButton = document.createElement('button');
                resetButton.className = "reset";
                resetButton.innerHTML = 'Play again?';
                let toolbarContent = document.createElement("div");
                toolbarContent.className = "toolbar-content";
                toolbarContent.innerHTML = toolbarText[3];
                toolbar.innerHTML = '';
                toolbar.appendChild(toolbarContent);
                toolbar.appendChild(resetButton);
                resetButton.addEventListener('click', function () {
                    location.reload();
                });
            } else {
                enemiesToDefeat.splice(enemiesToDefeat.indexOf(enemyChoice), 1);
                enemyChoice = null;
                gameState = "choose enemy";
                toolbarRender();
                if (playerChoice.sith === true) {
                    lightSide.innerHTML = '';
                    for (let i = 0; i < enemiesToDefeat.length; i++) {
                        let card = createCharacterCard(enemiesToDefeat[i]);
                        lightSide.appendChild(card);
                    }

                } else {
                    darkSide.innerHTML = '';
                    for (let i = 0; i < enemiesToDefeat.length; i++) {
                        let card = createCharacterCard(enemiesToDefeat[i]);
                        darkSide.appendChild(card);
                    }
                }
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
            attack();
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
                <p class="hp">HP: ${character.hp}</p>
                <p class="attack">Attack: ${character.attack}</p>
                <p class="counter">Counter: ${character.counter}</p>
                <p class="defense">Defense: ${character.defense}</p>
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





