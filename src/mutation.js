const pokemons = [
  { id: 1, name: "bulbasaur", height: "0.79m" },
  { id: 2, name: "ivysaur", height: "0.92m" },
  { id: 3, name: "abra", height: "0.92m" },
]

const normalizedData = pokemons.map((pokemon) => {
  //   pokemon.height = parseFloat(pokemon.height) // mutating, changing the object
  //   const normalizedPokemon = {
  //     id: pokemon.id,
  //     name: pokemon.name,
  //     height: parseFloat(pokemon.height),
  //   }
  const normalizedPokemon = { ...pokemon, height: parseFloat(pokemon.height) }
  return normalizedPokemon
})

console.log("NORMALIZED", normalizedData)
console.log("ORIGINAL:", pokemons)

const sortedData = [...normalizedData].sort((a, b) => {
  //   // positive number, negative number or zero
  //   const nameA = a.name
  //   const nameB = b.name
  //   if (nameA < nameB) {
  //     return -1
  //   }
  //   if (nameA > nameB) {
  //     return 1
  //   }
  return a.name.localeCompare(b.name)
})

console.log("SORTED DATA:", sortedData)
console.log("NORMALIZED DATA:", normalizedData)
