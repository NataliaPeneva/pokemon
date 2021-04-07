const yup = require("yup")
const express = require("express")
const app = express()
const helpers = require("./src/helpers")
let pokemons = require("./src/pokemons")

app.use(express.json())

const sortOptions = {
  name: helpers.sortedNamesAZ,
  id: helpers.sortedIds,
}

app.get("/pokemons", (req, res) => {
  let pokemonResponse = [...pokemons]
  const limit = req.query.limit || pokemons.length
  const offset = req.query.offset || 0

  if (req.query.type) {
    pokemonResponse = helpers.findByType(pokemonResponse, req.query.type)
  }
  if (req.query.sortBy) {
    const sortingFunc = sortOptions[req.query.sortBy] || helpers.sortedIds
    pokemonResponse = sortingFunc(pokemonResponse)
  }

  const countAll = helpers.totalCountPokemons(pokemonResponse)
  const indexOfFirstPokemon = parseInt(offset)
  const indexOfLastPokemon = indexOfFirstPokemon + parseInt(limit)
  const paginatedPokemons = pokemonResponse.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  )

  res.send({ count: countAll, pokemons: paginatedPokemons })
})

app.get("/pokemons/:id", (req, res) => {
  const pokemonWithId = helpers.findId(pokemons, parseInt(req.params.id))
  if (!pokemonWithId)
    return res.status(404).send("The pokemon with this ID can't be found")
  res.send(pokemonWithId)
})

let nextId = pokemons.length + 1
app.post("/pokemons", async (req, res) => {
  try {
    const validation = await validateNewPokemon(req.body)
    //   if (error) return res.status(400).send(error.details[0].message)
    const newPokemon = {
      id: nextId,
      ...req.body,
    }
    nextId++
    pokemons = [...pokemons, newPokemon]
    res.send(newPokemon)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Add data validation:
// - if id can't be found -> return error
// - img, spawn_chance & avg_spawns can't be empty strings
// - img should be a valid link like: "http://www.serebii.net/pokemongo/pokemon/040.png",
app.patch("/pokemons/:id", async (req, res) => {
  try {
    const validation = await validateExistingPokemon(req.body)
    //   if (error) return res.status(400).send(error.details[0].message)
    console.log("validation:", validation)
    const pokemonId = parseInt(req.params.id)
    const pokemonToPatch = helpers.findId(pokemons, pokemonId)
    const patchedPokemon = { ...pokemonToPatch, ...validation }
    const indexToPatch = pokemons.indexOf(pokemonToPatch)
    pokemons.splice(indexToPatch, 1, patchedPokemon)
    console.log("it worked????:", pokemons[indexToPatch])
    res.send({ patchedPokemon, indexToPatch })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.delete("/pokemons/:id", (req, res) => {
  const pokemonWithId = helpers.findId(pokemons, parseInt(req.params.id))
  if (!pokemonWithId)
    return res.status(404).send("The pokemon with this ID can't be found")
  index = pokemons.indexOf(pokemonWithId)
  pokemons.splice(index, 1)
  res.send(pokemonWithId)
})

const validateNewPokemon = (pokemon) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    type: yup
      .array()
      .of(yup.string().oneOf(helpers.pokemonTypes(pokemons)))
      .min(1)
      .max(2)
      .required(),
  })
  return schema.validate(pokemon)
}

const validateExistingPokemon = (pokemon) => {
  const schema = yup
    .object()
    .shape({
      img: yup.string(),
      // .test(
      //   "empty-check",
      //   "Img must be at least 8 characters",
      //   // does not catch an empty string
      //   (img) => img.length === 0)
      spawn_chance: yup.number().positive(),
      avg_spawns: yup.number().positive().integer(),
    })
    .noUnknown(true)
  return schema.validate(pokemon, { strict: true })
}

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`Listening on port ${port}`))
