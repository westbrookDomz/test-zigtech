"use strict";
const Sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  const ServiceBay = sequelize.define(
    "serviceBays",
    {
        bayId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
       bayNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
      bayType: {
            type: DataTypes.ENUM('Standard', 'Heavy-Duty', 'Electric Vehicle', 'Quick Service'),
            allowNull: false,
        },
     isOperational: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
    },
    maintenanceSchedule: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        equipmentList: {
            type: DataTypes.TEXT, // Comma-separated list of equipment
            allowNull: true,
        },
    },
    {
      freezeTableName: true,
    }
  );

    // ASSOCIATIONS
    ServiceBay.associate = (models) => {
  ServiceBay.hasMany(models.serviceBookings, { foreignKey: 'bayId' });
    };


  
  ServiceBay.sync({ alter: true })
    .then(() => console.log("service bay table synced"))
    .catch((err) => console.error("sync failed for service bay:", err));

  return ServiceBay;
};