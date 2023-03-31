const ValidTypes = ['Plante', 'Poison', 'Feu','Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Le nom est déja utilisé.'
        },
        validate: {
          notEmpty: { msg: 'Le champs nom du pokémon ne peut pas être vide.'},
          notNull: { msg: 'le nom du pokémon est requis.'}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt: { msg: 'utilisez uniquement des nombres entiers pour les points de vie.'},  
          notNull: { msg: 'Les points de vie sont une propriété requise.'},
          min: {
            args: [0],
            msg: 'Les points de vie doivent être supérieur ou égal à 0.'
          },
          max: {
            args: [999],
            msg: 'Les points de vie doivent être inférieur ou égal à 999.'
          }
      }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt: { msg: 'utilisez uniquement des nombres entiers pour les points de dégât.'},  
          notNull: { msg: 'Les points de dégât sont une propriété requise.'},
          min: {
            args: [0],
            msg: 'Les points de dégât doivent être supérieur ou égal à 0.'
          },
          max: {
            args: [99],
            msg: 'Les points de dégât doivent être inférieur ou égal à 99.'
          }
      }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          isURL: { msg: `Utilisez uniquement une URL valide pour l'image.`},  
          notNull: { msg: `L'image est une propriété requise.`}
      }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('types').split(',')
        },
        set(types){
          this.setDataValue('types', types.join())
        },
        validate: {
          isTypeValid(value) {
            if(!value) {
              throw new Error('Un pokémon doit avoir au moins un type.')
            }
            if(value.split(',').length >3) {
              throw new Error('Un pokémon ne peut pas avoir plus de trois types.')
            }
            value.split(',').forEach(type => {
              if(!ValidTypes.includes(type)) {
                throw new Error(`Les types d'un pokémon doivent appartenir à la liste suivante : ${ValidTypes}`)
              }
            });
          }
        }
      }
    }, 
    {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }