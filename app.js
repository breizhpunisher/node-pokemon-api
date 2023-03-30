const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const { success, getUniqueId } = require('./helper.js')
let pokemons = require('./mock-pokemon')

const app = express()
const port = 3000


app
.use(favicon(__dirname + '/favicon.ico'))
.use(morgan('dev'))// middleware message console.
.use(bodyParser.json())// parser en json.


app.get('/', (req, res) => res.send('hello, express2!'))

//point de terminaison renvoyant un pokémon par son id dans l'url.
app.get('/api/pokemons/:id',(req, res) =>{
    const id = parseInt(req.params.id)// parseInt changer une chaine de caractère en number.
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'Un pokémon a bien été trouvé.'
    res.json(success(message, pokemon)) // retourner un message de description.
})
// point de terminaison renvoyant la liste de pokémons.
app.get('/api/pokemons',(req, res) =>{
    const message = 'la liste de pokémons a bien été récupérée.'
    res.json(success(message, pokemons))
})
// point de terminaison pour créer un pokémon.
app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons) 
    const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `Le pokémon ${pokemonCreated.name} a bien été créé.`
    res.json(success(message, pokemonCreated))
})

// point de terminaison pour modifier un pokémon.
app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonUpdated = { ...req.body, id: id}
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon
})
    const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
    res.json(success(message, pokemonUpdated))
})

// point de terminaison pour supprimer un pokémon.
app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`
    res.json(success(message, pokemonDeleted))
})


app.listen(port, () => console.log(`Notre application Node est démarée sur : http://localhost:${port}`))