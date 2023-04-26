const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize') // importation opérateurs sequelize
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    // extraire la propriété name par requète avancée.
    if(req.query.name) {
      const name = req.query.name
      const limit = parseInt(req.query.limit) || 5

      if(name.length < 2) {
        const message = `Le terme de recherche doit contenir au moins deux caractères.`
        return res.status(400).json({ message })
      }
      //findAndCountAll requète sequelize  qui renvoie le nombre total total de résultats et les résultats demandés
      return Pokemon.findAndCountAll({
        where: {
          name: { // 'name' est la propriété du modèle pokémon
          [Op.like]: `%${name}%` // 'name' est le critère de la recherche
          // On recherche un pokémon qui commence par le terme de recherche : ${name}%
          // On recherche un pokémon qui se termine par le terme de recherche : %${name}
          // On recherhce un pokémon qui contient le terme de recherche (notre cas) : %${name}%
        }
      },
      order: ['name'],
      limit: limit // nombre de résultats maxi dans la réponse.
      })
      .then(({count, rows}) => {
        const message = `Il y a ${count} pokémons qui correspondent au terme de recherhce ${name}.`
        res.json({ message, data: rows })
      })
    } else {
      Pokemon.findAll({order: ['name']})
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
        const message = `La liste des pokémons n'a pas pu être récupérée. Réessayer dans quelques instants.`
      res.status(500).json({ message, data: error})
      })
    }
  })
}