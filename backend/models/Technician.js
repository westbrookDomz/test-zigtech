"use strict";
const Sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  const Technician = sequelize.define(
    "Technicians",
    {
      technicianId: {
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
      skillLevel: {
        type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced'),
        defaultValue: 'Beginner',
      },
      hourlyRate: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      specialization: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hireDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      maxConcurrentJobs: {
        type: DataTypes.INTEGER,
        defaultValue: 3,
      },
    },
    {
      freezeTableName: true,
    }
  );

  // Import ServiceBooking model
  const ServiceBooking = require('./serviceBooking')(sequelize, DataTypes);

    // ASSOCIATIONS
Technician.hasMany(ServiceBooking, { foreignKey: 'technicianId' });
ServiceBooking.belongsTo(Technician, { foreignKey: 'technicianId' });
  

  
  Technician.sync({ alter: true })
    .then(() => console.log("Technician table synced"))
    .catch((err) => console.error("sync failed for Tecnhician:", err));

  return Technician;
};