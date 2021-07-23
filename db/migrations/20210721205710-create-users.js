const {DataTypes} = require('sequelize')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', 
            {
                id: {
                    type: DataTypes.INTEGER,
                        primaryKey: true,
                            allowNull: false,
                                autoIncrement: true
                },
                // Allows users to have the same username
                username: {
                    type: DataTypes.STRING,
                        allowNull: false
                },
                // Will be used as the login username
                // Since emails are unique, we use them for not verifying
                // unique usernames
                email: {
                    type: DataTypes.STRING,
                        allowNull: false,
                            unique: true
                },
                // Password is stored in CHAR(60) because it will be encrypted
                // the encryption method used for it is bcrypt, which has
                // encryption length = 60
                password: {
                    type: DataTypes.CHAR(60),
                        allowNull: false
                },
            })
            // Adds index to the database in order to improve performance when reading users
            // Read more about database indexes here: 
            // https://en.wikipedia.org/wiki/Database_index#:~:text=A%20database%20index%20is%20a,maintain%20the%20index%20data%20structure.
            await queryInterface.addIndex('users', ['email'])
    },

    down: async (queryInterface, Sequelize) => {
        await iqueryInterface.dropTable('users')
    }
}
