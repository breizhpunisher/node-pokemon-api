module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        unique: {
            msg: 'Ce nom est déja pris par un autre utilisateur.'
        }
      },
      password: {
        type: DataTypes.STRING
      }
    })
  }