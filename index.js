const Joi = require("joi")
const express = require("express")
const app = express()
const helpers = require("./src/helpers")
const pokemons = require("./src/pokemons")

app.use(express.json())

app.get("/pokemons", (req, res) => {
  const count = helpers.totalCountPokemons(pokemons)
  if (req.query.limit && req.query.offset) {
    // req.query.limit -> how many pokemon are you requesting
    // req.query.offset -> where do you want to start counting
    // offset 0 limit 20 -> 20
    // offset 50 limit 10 -> 51 - 60
    const slicedPokemons = pokemons.slice(req.query.offset, req.query.limit)
    res.send({ count, slicedPokemons })
  }

  //   res.send({ count, pokemons })
})

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`Listening on port ${port}`))
