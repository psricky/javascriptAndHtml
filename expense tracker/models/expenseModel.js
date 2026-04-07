const {Sequelize,DataTypes}=require('sequelize');
const sequelize=require('../config/db');

const Expense = sequelize.define('Expense', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    category: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});

module.exports = Expense;
