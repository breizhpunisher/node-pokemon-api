const express = require('express')
const { success } = require('./helper.js')
let pokemons = require('./mock-pokemon')

const app = express()
const port = 3000

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


app.listen(port, () => console.log(`Notre application Node est démarée sur : http://localhost:${port}`))