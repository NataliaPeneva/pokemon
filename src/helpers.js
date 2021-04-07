const pokemons = require("./pokemons")

const totalCountPokemons = (pokemons) => pokemons.length

// console.log(totalCountPokemons(pokemons))

const pokemonNames = (pokemons) => {
  const pokemonNames = pokemons.map((pokemon) => pokemon.name)
  return pokemonNames
}

// console.log(pokemonNames(pokemons))

const pokemonImgUrls = (pokemons) => {
  const pokemonImgs = pokemons.map((pokemon) => pokemon.img)
  return pokemonImgs
}

// console.log(pokemonImgUrls(pokemons).length)

const rareSpawnChance = (pokemons) => {
  const rareSpawn = pokemons.filter((pokemon) => pokemon.spawn_chance < 0.01)
  return rareSpawn
}

// console.log("rareSpawnChance:", rareSpawnChance(pokemons))

const nextEvolutionPresent = (pokemons) => {
  return pokemons.filter((pokemon) => pokemon.next_evolution)
}

// console.log("nextEvolutionPresent ", nextEvolutionPresent(pokemons))

const findId = (pokemons, id) => {
  return pokemons.find((element) => element.id === id)
}

// console.log(findId(pokemons, 25))

const findName = (pokemons, name) => {
  return pokemons.find((element) => element.name === name)
}

// console.log(findName(pokemons, "Farfetch'd"))

const pokemonTypes = (pokemons) => {
  typesList = []
  for (const pokemon of pokemons) {
    for (const type of pokemon.type) {
      typesList.includes(type) ? true : typesList.push(type)
    }
  }
  return typesList
}
// console.log(pokemonTypes(pokemons))

const findByType = (pokemons, type) => {
  pokemonsIncludingType = []
  for (const pokemon of pokemons) {
    if (pokemon.type.includes(type)) {
      pokemonsIncludingType.push(pokemon)
    }
  }
  return pokemonsIncludingType
}

const normalizedData = (pokemons) => {
  const normalizedEggs = (egg) => {
    if (egg === "Not in Eggs") {
      return 0
    }
    return parseInt(egg, 10) * 1000
  }

  const normalizedPokemon = pokemons.map((pokemon) => {
    const normalizedPokemon = {
      ...pokemon,
      height: parseFloat(pokemon.height),
      weight: parseFloat(pokemon.weight),
      egg: normalizedEggs(pokemon.egg),
    }
    return normalizedPokemon
  })
  return normalizedPokemon
}

// console.log(normalizedData(pokemons))

const sortedNamesAZ = (pokemons) => {
  const sortedPokemons = [...pokemons].sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
  return sortedPokemons
}

// console.log(sortedNamesAZ(pokemons))

const sortedIds = (pokemons) => {
  const sortedPokemons = [...pokemons].sort((a, b) => a.id - b.id)
  return sortedPokemons
}

console.log(sortedIds(pokemons))

module.exports = {
  totalCountPokemons,
  pokemonNames,
  pokemonImgUrls,
  rareSpawnChance,
  nextEvolutionPresent,
  findId,
  findName,
  findByType,
  pokemonTypes,
  normalizedData,
  sortedNamesAZ,
  sortedIds,
}
