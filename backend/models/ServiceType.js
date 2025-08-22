"use strict";
const Sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  const ServiceType = sequelize.define(
    "typeOfService",
    {
        serviceTypeId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        serviceName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        serviceCategory:{
            type: DataTypes.STRING,
            allowNull: false,   
        },
        estimatedDuration: {
            type: DataTypes.INTEGER, 
            allowNull: false,
        },
        skillLevelRequired: {
            type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced'),
            allowNull: false,
        },
        basePrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        seasonalMultiplier: {
            type: DataTypes.DECIMAL(3, 2),
            defaultValue: 1.00,
        },
        isAvailable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
      freezeTableName: true,
    }
  );

    // ASSOCIATIONS
    ServiceType.associalte = (models) => {
        ServiceType.hasMany(models.serviceBookings, { foreignKey: 'serviceTypeId' });
    };

  
  ServiceType.sync({ alter: true })
    .then(() => console.log("types of service table synced"))
    .catch((err) => console.error("sync failed for type of service:", err));

  return ServiceType;
};