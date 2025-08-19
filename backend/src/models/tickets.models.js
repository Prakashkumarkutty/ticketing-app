const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')


const Ticket = sequelize.define('Ticket', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 255]
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    priority: {
        type: DataTypes.ENUM('Low', 'Medium', 'High'),
        allowNull: false,
        defaultValue: 'Low'
    },
    status: {
        type: DataTypes.ENUM('Open', 'In Progress', 'Closed'),
        allowNull: false,
        defaultValue: 'Open'
    },
}, {
    tableName: 'tickets',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
})

module.exports = Ticket