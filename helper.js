exports.success = (message, data) =>{
    return { message, data }
}
// méthode pour incrémenter l'id dans la base de données. 
//reduce compare les éléments 2 à 2 dans un tableau.
exports.getUniqueId = (pokemons) => {
    const pokemonsIds = pokemons.map(pokemon => pokemon.id)
    const maxId = pokemonsIds.reduce((a,b) => Math.max(a,b))
    const UniqueId = maxId + 1
    return UniqueId
}