const pokemons = require("./pokemons")

const totalCountPokemons = (pokemons) => pokemons.length

// console.log(totalCountPokemons(pokemons))

// Challenges:

// 1. Transform pokemons into an array of pokemon names
// Input: pokemons [{}, {}, {}]
// Output: ["Bulbasaur", "Ivysaur", "Venusaur", "Charmander" ...]

const pokemonNames = (pokemons) => {
  const pokemonNames = pokemons.map((pokemon) => pokemon.name)
  return pokemonNames
}

// console.log(pokemonNames(pokemons))

// 2. Transform pokemons into an array of pokemon img urls
// Input: pokemons [{}, {}, {}]
// Output: ["http://www.serebii.net/pokemongo/pokemon/001.png", "http://www.serebii.net/pokemongo/pokemon/002.png", ...]

const pokemonImgUrls = (pokemons) => {
  const pokemonImgs = pokemons.map((pokemon) => pokemon.img)
  return pokemonImgs
}

// console.log(pokemonImgUrls(pokemons).length)

// 3. Transform pokemons into an array of rara pokemon that have a spawn_chance of less than 0.01
// Input: pokemons [{}, {}, {}, {}, {}] (all)
// Output: pokemons that have an evolution [{}, {}, {}] (fewer)

const rareSpawnChance = (pokemons) => {
  const rareSpawn = pokemons.filter((pokemon) => pokemon.spawn_chance < 0.01)
  return rareSpawn
}

// console.log("rareSpawnChance:", rareSpawnChance(pokemons))

// 4. Transform pokemons into an array of pokemon that have at least one next_evolution
// Input: pokemons [{}, {}, {}, {}, {}] (all)
// Output: pokemons that have an evolution [{}, {}, {}] (fewer)

const nextEvolutionPresent = (pokemons) => {
  return pokemons.filter((pokemon) => pokemon.next_evolution)
}

// console.log("nextEvolutionPresent ", nextEvolutionPresent(pokemons))

// 5. Inside the pokemon array find the pokemon with id 25
// Input: pokemons [{}, {}, {},]
// Output: {} (1 pokemon)

const findId = (pokemons, id) => {
  return pokemons.find((element) => element.id === id)
}

// console.log(findId(pokemons, 25))

// 6. Inside the pokemon array find the pokemon with name "Farfetch'd"
// Input: pokemons [{}, {}, {},]
// Output: {} (1 pokemon)

const findName = (pokemons, name) => {
  return pokemons.find((element) => element.name === name)
}

// console.log(findName(pokemons, "Farfetch'd"))

// 7. Transform pokemons into an array of pokemon types
// Input: pokemons [{}, {}, {},]
// Output: ["Grass", "Poison", "Fire" ...]

const pokemonTypes = (pokemons) => {
  typesList = []
  // How to do with reduce?
  for (const pokemon of pokemons) {
    for (const type of pokemon.type) {
      typesList.includes(type) ? true : typesList.push(type)
    }
  }
  return typesList
}

// console.log(pokemonTypes(pokemons))

// 8. Normalize the pokemon data by changing:
// "height": "0.71 m", -> "height": 0.71
// "weight": "6.9 kg", -> "weight": 6.9
// "egg": "2 km", -> "egg": 2000,
// "egg": "Not in Eggs", -> "egg": null
// Input: pokemons [{}, {}, {},]
// Output: normalized pokemons [{}, {}, {},]

const normalizedData = (pokemons) => {
  const normalData = pokemons.map((pokemon) => {
    pokemon.height = parseFloat(pokemon.height)
    pokemon.weight = parseFloat(pokemon.weight)
    pokemon.egg === "Not in Eggs"
      ? (pokemon.egg = 0)
      : (pokemon.egg = parseInt(pokemon.egg, 10) * 1000)
    return pokemon
  })
  return normalData
}

// console.log(normalizedData(pokemons))

// 9. Sort the pokemon array by the names of the pokemon
// Input: pokemons [{}, {}, {},]
// Output: sorted pokemons [{name: Abra}, {}, ... {name: Zubat}]

// Sorted the entire array by names
const sortedNamesAZ = (pokemons) => {
  pokemons.sort((a, b) => {
    const nameA = a.name
    const nameB = b.name
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
  })
  return pokemons
}

// console.log(sortedNamesAZ(pokemons))

module.exports = {
  totalCountPokemons,
  pokemonNames,
  pokemonImgUrls,
  rareSpawnChance,
  nextEvolutionPresent,
  findId,
  findName,
  pokemonTypes,
  normalizedData,
  sortedNamesAZ,
}
