"use strict";
const Sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  const BookingParts = sequelize.define(
    "bookingParts",
    {
        bookingPartId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        bookingId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        partId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantityUsed: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        partCost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    },
    {
      freezeTableName: true,
    }
  );

    // ASSOCIATIONS
    BookingParts.associate = (models) => {
        BookingParts.belongsTo(models.serviceBookings, { foreignKey: 'bookingId' });
        BookingParts.belongsTo(models.serviceParts, { foreignKey: 'partId' });
    };


  
  BookingParts.sync({ alter: true })
    .then(() => console.log("Bookingparts table synced"))
    .catch((err) => console.error("sync failed for Bookingparts:", err));

  return BookingParts;
};