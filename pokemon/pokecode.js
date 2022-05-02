import { removeChildren } from '../utils/index.js'

const getAPIData = async (url) => {
  try {
    const result = await fetch(url);
    return await result.json();
  } catch (error) {
    console.error(error);
  }
};

const loadedPokemon = [];

async function loadPokemon(offset = 0, limit = 25) {
  const pokeData = await getAPIData(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );
  for (const nameAndUrl of pokeData.results) {
    const pokemon = await getAPIData(nameAndUrl.url);
    const simplifiedPokemon = {
      id: pokemon.id,
      height: pokemon.height,
      weight: pokemon.weight,
      name: pokemon.name,
      types: pokemon.types,
      abilities: pokemon.abilities,
      moves: pokemon.moves.slice(0, 3),
      hp: pokemon.stats[0].base_stat
    };
    console.log(pokemon.stats[0].base_stat)
    loadedPokemon.push(simplifiedPokemon);
    populatePokeCard(simplifiedPokemon);
  }
}
class Pokemon {
  constructor(name, height, weight, abilities, types, moves, hp) {
    (this.id = 9001),
      (this.name = name),
      (this.height = height),
      (this.weight = weight),
      (this.abilities = abilities),
      (this.types = types),
      (this.moves = moves);
      (this.hp = hp)
  }
}

const header = document.querySelector('header')
const logo = document.createElement("img");
logo.src = "../images/pokemon-logo.png";
logo.className = "logo";
header.appendChild(logo);

const container = document.querySelector('container')
const newButton = document.createElement("button");
newButton.textContent = "New Pokemon";
newButton.className = "newBtn"
container.appendChild(newButton);

const loadButton = document.createElement('button')
loadButton.textContent = 'Load Pokemon'
loadButton.className = "loadBtn"
container.appendChild(loadButton)
loadButton.addEventListener('click', async () => {
  if (loadedPokemon.length === 0) {
    removeChildren(pokeGrid)
    await loadPokemon(0, 250)
  }
})

newButton.addEventListener("click", () => {
  const pokeName = prompt("What is the name of your new Pokemon?");
  const pokeHeight = prompt("What is the Pokemon's height?");
  const pokeWeight = prompt("What is the Pokemon's weight?");
  const pokeAbilities = prompt(
    "What are your Pokemon's abilities? (use a comman-separated list)"
  );
  const pokeTypes = prompt(
    "What are your Pokemon's types? (up to 2 types separated by a space)"
  );
  const pokeMoves = prompt(
    "What are your Pokemon's moves? (up to 3 types separated by a space)"
  );

  const newPokemon = new Pokemon(
    pokeName,
    pokeHeight,
    pokeWeight,
    makeAbilitiesArray(pokeAbilities),
    makeTypesArray(pokeTypes),
    makeMovesArray(pokeMoves)
  );
  populatePokeCard(newPokemon);
});

function makeAbilitiesArray(commaString) {
  return commaString.split(",").map((abilityName) => {
    return {
      ability: { name: abilityName },
    };
  });
}

function makeTypesArray(spacedString) {
  return spacedString.split(" ").map((typeName) => {
    return {
      type: { name: typeName },
    };
  });
}

function makeMovesArray(spacedString) {
  return spacedString.split(" ").map((moveName) => {
    return {
      move: { name: moveName },
    };
  });
}

const pokeGrid = document.querySelector(".pokeGrid");

function populatePokeCard(pokemon) {
  const pokeScene = document.createElement("div");
  pokeScene.className = "scene";
  const pokeCard = document.createElement("div");
  pokeCard.className = "card";
  pokeCard.addEventListener("click", () =>
    pokeCard.classList.toggle("is-flipped")
  );

  pokeCard.appendChild(populateCardFront(pokemon));
  pokeCard.appendChild(populateCardBack(pokemon));
  pokeScene.appendChild(pokeCard);
  pokeGrid.appendChild(pokeScene);
}

function populateCardFront(pokemon) {
  const pokeFront = document.createElement("figure");
  pokeFront.className = "cardFace front";
  const pokeType1 = pokemon.types[0].type.name;
  const pokeType2 = pokemon.types[1]?.type.name;
  console.log(pokeType1, pokeType2);
  console.log(getPokeTypeColor(pokeType1));
  pokeFront.style.setProperty("background", getPokeTypeColor(pokeType1));
  if (pokeType2) {
    pokeFront.style.setProperty("background", `linear-gradient(${getPokeTypeColor(pokeType1)}, ${getPokeTypeColor(pokeType2)})`
    );
  }

  const pokeImg = document.createElement("img");
  if (pokemon.id > 9000) {
    // load local image
    pokeImg.src = "../images/pokeball.png";
  } else {
    pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  }
  const pokeCaption = document.createElement("figcaption");
  pokeCaption.textContent = pokemon.name;


  pokeFront.appendChild(pokeImg);
  pokeFront.appendChild(pokeCaption);
  return pokeFront;
}

function populateCardBack(pokemon) {
  const pokeBack = document.createElement("div");
  pokeBack.className = "cardFace back";
  //show pokeId
  const pokeId = document.createElement("h4")
  pokeId.textContent = "No. " + pokemon.id;
  //show pokeName
  const showPokeName = document.createElement("h4");
  showPokeName.textContent = "Name : " + pokemon.name;
  //show pokeHP
  const showHP = document.createElement("h4");
  showHP.textContent = "HP : " + pokemon.hp;
  //show height and weight
  const showSize = document.createElement("h4");
  showSize.textContent = "Height : " + pokemon.height + " Weight : " + pokemon.weight;
  //shoe types
  const showTypes = document.createElement("h4");
  showTypes.textContent = "Types";

  pokeBack.appendChild(pokeId);
  pokeBack.appendChild(showPokeName);
  pokeBack.appendChild(showHP);
  pokeBack.appendChild(showSize);
  pokeBack.appendChild(showTypes);

  const typeList = document.createElement("ul");
  pokemon.types.forEach((typeItem) => {
    const listType = document.createElement("li");
    listType.textContent = typeItem.type.name;
    typeList.appendChild(listType);
  });
  pokeBack.appendChild(typeList);

  //show Abilities
  const showAbility = document.createElement("h4");
  showAbility.textContent = "Abilities";
  pokeBack.appendChild(showAbility);

  const abilityList = document.createElement("ul");
  pokemon.abilities.forEach((abilityItem) => {
    const listItem = document.createElement("li");
    listItem.textContent = abilityItem.ability.name;
    abilityList.appendChild(listItem);
  });
  pokeBack.appendChild(abilityList);

  // show moves
  const showMove = document.createElement("h4");
  showMove.textContent = "Moves";
  pokeBack.appendChild(showMove);

  const moveList = document.createElement("ul");
  pokemon.moves.forEach((moveItem) => {
    const listMove = document.createElement("li");
    listMove.textContent = moveItem.move.name;
    moveList.appendChild(listMove);
  });
  pokeBack.appendChild(moveList);

  return pokeBack;
}

function getPokeTypeColor(pokeType) {
  let color;
  //if(pokeType === "grass") color = '#00FF00'
  switch (pokeType) {
    case "grass":
      color = "#78C850";
      break;
    case "fire":
      color = "#F08030";
      break;
    case "water":
      color = "#6890F0";
      break;
    case "bug":
      color = "#A8B820";
      break;
    case "normal":
      color = "#A8A878";
      break;
    case "flying":
      color = "#A890F0";
      break;
    case "poison":
      color = "#A040A0";
      break;
    case "electric":
      color = "#F8D030";
      break;
    case "psychic":
      color = "#F85888";
      break;
    case "ground":
      color = "#e0c068";
      break;
    case "rock":
      color = "#B8A038";
      break;
    case "dark":
      color = "#705848";
      break;
    case "fairy":
      color = "#EE99AC";
      break;
    case "steel":
      color = "#B8B8D0";
      break;
    case "ghost":
      color = "#705898";
      break;
    case "fighting":
      color = "#C03028";
      break;
    case "dragon":
      color = "#7038F8";
      break;
    case "unkown":
      color = "#68A090";
      break;
    case "ice":
      color = "#98D8D8";
      break;
    default:
      color = "#888888";
  }
  return color;
}


function getPokemonByType(type) {
  return loadedPokemon.filter((pokemon) => pokemon.types[0].type.name === type);
}

// now figure out how to display this count in the UI
const typeSelector = document.querySelector('#type-select')
typeSelector.addEventListener('change', (event) => {
  removeChildren(pokeGrid) // cleared out the grid from all pokemon
  const usersTypeChoice = event.target.value.toLowerCase()
  if (event.target.value === 'Show All Pokemon') {
    loadedPokemon.forEach((singleLoadedPokemon) =>
      populatePokeCard(singleLoadedPokemon),
    )
  } else {
    const pokemonByType = getPokemonByType(usersTypeChoice)
    // now just loop through the filtered array and populate
    pokemonByType.forEach((eachSinglePokemon) =>
      populatePokeCard(eachSinglePokemon),
    )
  }
})

