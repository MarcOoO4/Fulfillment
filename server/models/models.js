const sequelize = require('../db')
const {DataTypes} = require ('sequelize')

const Users = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    FIO: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Orders = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE},
    order_status: {type: DataTypes.STRING, allowNull: false},
    product_location: {type: DataTypes.STRING, allowNull: false},
    volume: {type: DataTypes.FLOAT, allowNull: false},
    weight: {type: DataTypes.FLOAT, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    quantity_product: {type: DataTypes.INTEGER, allowNull: false},
    product_name: {type: DataTypes.STRING, allowNull: false},
    marketplace: {type: DataTypes.STRING, allowNull: false}
})

Users.hasMany(Orders)
Orders.belongsTo(Users)

module.exports = {
    Users,
    Orders
}