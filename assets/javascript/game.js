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

function main() {
    let darkSide = document.getElementsByClassName("dark-side")[0];
    let lightSide = document.getElementsByClassName("light-side")[0];
    let playerChoice = null;

    for (let i = 0; i < characters.length; i++) {
        let card = createCharacterCard(characters[i]);
        if (characters[i].sith === true) {
            darkSide.appendChild(card);
        } else {
            lightSide.appendChild(card);
        }
    }
}

//look up truthy and falsey//

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
        playerChoice = character;
    });
    return card;
}

main();
