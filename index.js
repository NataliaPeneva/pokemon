const Joi = require("joi")
const express = require("express")
const app = express()
const helpers = require("./src/helpers")
let pokemons = require("./src/pokemons")
const { splice } = require("./src/pokemons")

app.use(express.json())

// How to avoid so many ifs?
app.get("/pokemons", (req, res) => {
  const countAll = helpers.totalCountPokemons(pokemons)
  console.log(req.query)
  if (req.query.limit && req.query.offset) {
    // req.query.limit -> how many pokemon are you requesting - 3
    // req.query.offset -> where do you want to start counting - 1
    const indexOfFirstPokemon = parseInt(req.query.offset)
    const indexOfLastPokemon = indexOfFirstPokemon + parseInt(req.query.limit)

    const slicedPokemons = pokemons.slice(
      indexOfFirstPokemon,
      indexOfLastPokemon
    )
    return res.send({ countAll, slicedPokemons })
  }
  if (req.query.type) {
    const pokemonsHavingType = helpers.findByType(pokemons, req.query.type)
    const countByType = pokemonsHavingType.length
    return res.send({ countByType, pokemonsHavingType })
  }
  if (req.query.sortBy === "name") {
    const sortedByName = helpers.sortedNamesAZ(pokemons)
    return res.send({ countAll, sortedByName })
  }
  if (req.query.sortBy === "id") {
    const sortedByIds = helpers.sortedIds(pokemons)
    return res.send({ countAll, sortedByIds })
  }

  //   console.log("count:", count)
  res.send({ countAll, pokemons })
})

app.get("/pokemons/:id", (req, res) => {
  const pokemonWithId = helpers.findId(pokemons, parseInt(req.params.id))
  if (!pokemonWithId)
    return res.status(404).send("The pokemon with this ID can't be found")
  res.send(pokemonWithId)
})

// Validation for name&type to be added!!!
app.post("/pokemons", (req, res) => {
  //   const { error } = validatePokemon(req.body)

  //   if (error) return res.status(400).send(error.details[0].message)
  const newPokemon = {
    id: pokemons.length + 1,
    ...req.body,
  }

  pokemons = [...pokemons, newPokemon]
  res.send(newPokemon)
})

// app.patch("/pokemons/:id", (req, res) => {})

app.delete("/pokemons/:id", (req, res) => {
  const pokemonWithId = helpers.findId(pokemons, parseInt(req.params.id))
  if (!pokemonWithId)
    return res.status(404).send("The pokemon with this ID can't be found")
  index = pokemons.indexOf(pokemonWithId)
  pokemons.splice(index, 1)
  res.send(pokemonWithId)
})

const validatePokemon = (pokemon) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    type: Joi.array().min(1).required(),
  })
  return schema.validate(pokemon)
}

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`Listening on port ${port}`))
