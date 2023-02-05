const Sequelize = require('sequelize');
const { database, user, password } = require('./config.json');


const sequelize = new Sequelize(database, user, password, {
	host: '208.113.244.49',
	dialect: 'mysql',
	logging: false,
});

module.exports = {
    Channels: sequelize.define('channels', {
        name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        guild_id: {
            type: Sequelize.STRING,
            unique:true,
            allowNull: false,
        },
        channel_id: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
    }),
    Users: sequelize.define('users', {
        user_id: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        common_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }),
    Questions: sequelize.define('questions', {
        question: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        user_id: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }),
    Answers: sequelize.define('answers', {
        question: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        answer: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        user_id: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }),
};
