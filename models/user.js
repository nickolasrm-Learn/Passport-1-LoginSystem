const {Model, DataTypes} = require('sequelize')

/**
 * This is the model for a user
 */
class User extends Model
{
	static init(sequelize)
	{
		super.init({
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
			}, 
			{
				sequelize,
				tableName: 'users',
				timestamps: false
			})
	}
}

module.exports = User