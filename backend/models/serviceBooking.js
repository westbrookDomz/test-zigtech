"use strict";
const Sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  const ServiceBooking = sequelize.define(
    "serviceBookings",
    {
        boookingId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        serviceTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        technicianId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        bayId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        scheduleStart: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        estimatedEnd: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        actualStart: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        actualEnd: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        bookingStatus: {
            type: DataTypes.ENUM('Scheduled', 'In Progress', 'Completed', 'Cancelled', 'No Show'),
            defaultValue: 'Scheduled',
        },
        totalCost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        customerNotes: {
            type: DataTypes.TEXT,
            allowNull: true,
    },
    technicianIdNotes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        priorityLevel: {
            type: DataTypes.ENUM('Low', 'Medium', 'High', 'Urgent'),
            defaultValue: 'Medium',
        },
        rescheduleCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        lastModified: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
      freezeTableName: true,
    }
  );

    // ASSOCIATIONS
    ServiceBooking.associate = (models) => {
      ServiceBooking.belongsTo(models.customers, { foreignKey: 'customerId' });
      ServiceBooking.belongsTo(models.typeOfService, { foreignKey: 'serviceTypeId' });
      ServiceBooking.belongsTo(models.Technicians, { foreignKey: 'technicianId' });
    };


  
    ServiceBooking.sync()
        .then(() => console.log("service booking table synced"))
        .catch((err) => console.error("sync failed for service booking:", err));

  return ServiceBooking;
};