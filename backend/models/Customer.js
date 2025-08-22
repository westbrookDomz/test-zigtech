"use strict";
const Sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "customers",
    {
        customerId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        loyaltyTier: {
            type: DataTypes.ENUM('Bronze', 'Silver', 'Gold', 'Platinum'),
            defaultValue: 'Bronze',
        },
        totalSpent: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0.00,
        },
        registrationDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        lastServiceDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },

    },
    {
      freezeTableName: true,
    }
  );

    // ASSOCIATIONS
    Customer.associate = (models) => {
  Customer.hasMany(models.serviceBookings, { foreignKey: 'customerId' });
    };
  
  Customer.sync({ alter: true })
    .then(() => console.log("Customer table synced"))
    .catch((err) => console.error("sync failed for customers:", err));

  return Customer;
};