"use strict";
const Sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  const ServicePart = sequelize.define(
    "serviceParts",
    {
        partId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        partName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    partCategory: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    unitCost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        stockQuantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0,    
    },
    minimumStock:{
            type: DataTypes.INTEGER,
            defaultValue: 5,
        },
    },
    {
      freezeTableName: true,
    }
  );

    // ASSOCIATIONS
    ServicePart.associate = (models) => {
        ServicePart.hasMany(models.bookingParts, { foreignKey: 'partId' });
    };


  
  ServicePart.sync({ alter: true })
    .then(() => console.log("servicePart table synced"))
    .catch((err) => console.error("sync failed for servicePart:", err));

  return ServicePart;
};